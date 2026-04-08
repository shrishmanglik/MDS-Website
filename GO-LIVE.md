# MDS Go-Live Runbook

**Goal:** get the marketing site fully functional AND two real products (FrançaisIQ, ChemAI) accepting paying users.

**Time estimate:** 4–8 hours of ops work, mostly sequential because of account activation delays.

**Scope clarification:** JyotishAI (desktop), ATLAS, NestIQ, and JobFlow are NOT going live today. Their `/products/[slug]` pages stay in waitlist mode. Only FrançaisIQ and ChemAI are flippable today.

---

## Architecture recap

```
milliondollarstudio.ai          (Next.js marketing site on Vercel)
    ├── /products/francaisiq    → https://tef.milliondollarstudio.ai
    │                             (Vite app · Supabase auth · Stripe billing)
    │
    └── /products/chemai        → https://chemaistudio.com (or subdomain)
                                  (Next.js frontend · FastAPI backend on Render
                                   · Postgres · Razorpay billing)
```

Each product runs in its own repo under `F:\Million Dollar AI Studio\products\{slug}\` and deploys to its own domain. The marketing site is the navigation layer — it links to the production URLs via the `PRODUCT_URLS` registry in `src/lib/constants.ts`.

**When you want to take a product live**, the only code change needed on the marketing site is updating `PRODUCT_URLS[slug]` from `null` to the real URL. Then `git commit && git push` and Vercel auto-deploys.

---

## Phase 0 — Marketing site unblocks (30 minutes)

These fix the findings from the testing audit. They are blocking the marketing site's conversion funnel right now.

### 0.1 — Unblock form submissions (5 min)

Every contact, intake, and assessment form currently returns 500 because `WEB3FORMS_ACCESS_KEY` is missing from the Vercel production env.

1. Get the key from `F:\Million Dollar AI Studio\MDS Website\.env.local` (look for `WEB3FORMS_ACCESS_KEY=...`)
2. Vercel Dashboard → MDS Website project → Settings → Environment Variables → Add New
3. Name: `WEB3FORMS_ACCESS_KEY` · Value: the key · Environment: **Production** (also Preview if you want form testing on branch deploys)
4. Save, then Deployments → latest → Redeploy
5. Verify with:
   ```bash
   curl -X POST https://milliondollarstudio.ai/api/submit-form/ \
     -H "Content-Type: application/json" \
     -d '{"form_name":"test","email":"you@example.com","message":"go-live test"}'
   ```
   Expect `{"success":true, ...}`. If you get `{"message":"Server configuration error."}`, the env var didn't land — check the scope.

### 0.2 — Replace the broken Calendly URL (5 min)

The current "Book a Call" button on `/contact` points at `https://calendly.com/milliondollarstudio` which returns a 404 (dead URL).

1. Log into Calendly, find the event you want prospects to book
2. Copy the full URL (e.g. `https://calendly.com/shrishmanglik/15min-intro`)
3. Open `F:\Million Dollar AI Studio\MDS Website\src\lib\constants.ts`
4. Find the line `calendlyUrl: null as string | null,`
5. Replace with `calendlyUrl: 'https://calendly.com/YOUR-REAL-URL',`
6. `git commit -am "fix: set real Calendly URL" && git push`
7. Verify by visiting `milliondollarstudio.ai/contact/` — the "Book a Call" button should now appear

### 0.3 — Create DNS for `tef.milliondollarstudio.ai` (5 min + propagation)

You'll do this anyway as part of FrançaisIQ deploy (Phase 1). Skip for now.

---

## Phase 1 — FrançaisIQ production deploy (1.5–3 hours)

FrançaisIQ is the most deploy-ready product. It's a Vite+React SPA with Supabase auth and Stripe subscriptions already wired. The Vercel project is already linked (`tef-maitre`, project ID `prj_HFD1COAEMtEjVsM3t81qXnB7PKoz`, team `team_FGwbqUkLf6KXZ8bfvfK9kHF8`).

### 1.1 — Supabase production project

**If you already have a production Supabase project**, skip to 1.2.

**Otherwise:**
1. supabase.com → New project → Region: closest to your users (us-east-1 or eu-west-1 recommended) → Strong database password → Create
2. While it provisions, open `F:\Million Dollar AI Studio\products\francaisiq\web\supabase\migrations\`. You'll need to run each `.sql` file in order.
3. Once the project is ready: SQL Editor → paste and run each migration, in filename order:
   - `001_initial_schema.sql` (creates `profiles`, `user_progress`, RLS policies)
   - Any `002_*`, `003_*`, etc.
4. Verify: Dashboard → Authentication → Users (should be empty). Dashboard → Table Editor → `profiles` should exist with the right columns.

### 1.2 — Deploy Supabase Edge Functions

The Stripe integration uses Supabase Edge Functions (`create-checkout`, `stripe-webhook`, `billing-portal`). These have to be deployed separately from the web app.

```bash
cd "F:\Million Dollar AI Studio\products\francaisiq\web"

# Install Supabase CLI if you don't have it: https://supabase.com/docs/guides/cli
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF

# Deploy functions
npx supabase functions deploy create-checkout
npx supabase functions deploy stripe-webhook
npx supabase functions deploy billing-portal
```

**Set function secrets** (these don't sync from .env.local — you have to set them explicitly):
```bash
npx supabase secrets set STRIPE_SECRET_KEY=sk_live_xxx
npx supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_xxx    # from 1.3 step 3
npx supabase secrets set STRIPE_PRO_PRICE_ID=price_xxx
npx supabase secrets set STRIPE_ULTIMATE_PRICE_ID=price_xxx
```

### 1.3 — Stripe LIVE mode setup

**Current state:** Price IDs are env vars. No hardcoded live keys. You need to create the live Price IDs.

1. Stripe Dashboard → toggle from Test mode to **Live mode** (top-right)
2. Products → Add product:
   - Name: `FrançaisIQ Pro`
   - Pricing: `$39.99 USD` · Recurring · Monthly
   - Save → copy the `price_...` ID
3. Add another product:
   - Name: `FrançaisIQ Ultimate`
   - Pricing: `$149.99 USD` · Recurring · Monthly
   - Save → copy the `price_...` ID
4. Developers → API keys → copy the **Publishable key** (`pk_live_...`) and **Secret key** (`sk_live_...`)
5. Developers → Webhooks → Add endpoint:
   - URL: `https://YOUR_SUPABASE_REF.supabase.co/functions/v1/stripe-webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
   - Save → click "Reveal" next to the signing secret → copy (`whsec_...`)

### 1.4 — Vercel env vars for `tef-maitre` project

Vercel Dashboard → `tef-maitre` project → Settings → Environment Variables. Add all of these, Production scope:

| Variable | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://YOUR_PROJECT_REF.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | From Supabase → Settings → API → Project API keys → `anon` `public` |
| `VITE_SUPABASE_FUNCTION_URL` | `https://YOUR_PROJECT_REF.supabase.co/functions/v1` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` from Stripe step 4 |
| `VITE_STRIPE_PRO_PRICE_ID` | Pro price ID from Stripe step 2 |
| `VITE_STRIPE_ULTIMATE_PRICE_ID` | Ultimate price ID from Stripe step 3 |
| `VITE_APP_URL` | `https://tef.milliondollarstudio.ai` |

### 1.5 — Deploy FrançaisIQ to Vercel

If this is the first deploy after setting env vars:
```bash
cd "F:\Million Dollar AI Studio\products\francaisiq\web"
npx vercel deploy --prod
```

Or: Vercel Dashboard → `tef-maitre` → Deployments → Redeploy latest.

Wait for the deploy to succeed. Note the Vercel URL (e.g. `tef-maitre-xxx.vercel.app`).

### 1.6 — DNS: point `tef.milliondollarstudio.ai` at Vercel

1. Vercel Dashboard → `tef-maitre` project → Settings → Domains → Add → `tef.milliondollarstudio.ai`
2. Vercel will show the required DNS record. It's usually:
   ```
   Type: CNAME
   Name: tef
   Value: cname.vercel-dns.com
   TTL: Auto or 300
   ```
3. Log into your DNS provider for `milliondollarstudio.ai` (Cloudflare, Namecheap, etc.)
4. Add that CNAME record
5. Back in Vercel, the domain should flip to "Valid Configuration" within a few minutes (sometimes up to an hour)

### 1.7 — Smoke test FrançaisIQ

1. Visit `https://tef.milliondollarstudio.ai` — landing page loads
2. Sign up with a test email → verify magic link lands → you can log in
3. Try to upgrade to Pro → Stripe Checkout opens → **use a REAL card in a test capacity** (or use Stripe's `4242 4242 4242 4242` but ONLY if your live dashboard supports test mode; otherwise skip until you've tested in Stripe test mode end-to-end)
4. After payment, check Supabase `profiles` table — your user's `subscription_tier` should be `pro` and `stripe_customer_id` should be populated
5. Check Stripe Dashboard → Payments → should see the successful payment

### 1.8 — Flip the marketing site

Once FrançaisIQ is confirmed working:
1. Open `F:\Million Dollar AI Studio\MDS Website\src\lib\constants.ts`
2. Find `francaisiq: null,` in `PRODUCT_URLS`
3. Change to `francaisiq: 'https://tef.milliondollarstudio.ai',`
4. `git commit -am "chore: flip FrançaisIQ to live" && git push`
5. The marketing site will redeploy; `/products/francaisiq` will now have a "Try FrançaisIQ" button.

---

## Phase 2 — ChemAI production deploy (2–4 hours)

ChemAI is more complex because it has THREE moving parts: FastAPI backend, Postgres DB, Next.js frontend. The full runbook is at `F:\Million Dollar AI Studio\products\chemai\GO_LIVE.md` — I'm summarizing here.

### 2.1 — Razorpay account setup

ChemAI uses Razorpay (not Stripe) because it targets Indian students who mostly pay via UPI.

1. razorpay.com → sign up → complete KYC (can take 24–48 hours if not already done — **do this yesterday**)
2. Once activated, Dashboard → Settings → API Keys → Generate:
   - **Test keys** first (for local smoke tests)
   - **Live keys** (`rzp_live_...`)
3. Settings → Payment Methods → enable UPI, Cards, Net Banking, Wallets
4. Settings → Webhooks → Create webhook (you'll set the URL in step 2.3):
   - Events: `payment.captured`, `order.paid`
   - Generate a strong random secret, save it

### 2.2 — Deploy backend to Render.com

The backend has a Render blueprint at `products/chemai/render.yaml` that provisions FastAPI + Postgres in one click.

1. Push the monorepo to GitHub (if it isn't already). ChemAI needs to be on GitHub for Render to pull it.
2. render.com → New → Blueprint → connect the repo → select the `render.yaml` at `products/chemai/render.yaml`
3. Render auto-detects:
   - Web service: `chemai-api` (FastAPI on `backend/`, Python runtime, Singapore region)
   - Database: `chemai-db` (Postgres)
4. You'll be asked to set the `sync: false` env vars manually. In Render's web service → Environment:
   - `CORS_ORIGINS` → your eventual frontend URL (e.g. `https://chemaistudio.com,https://www.chemaistudio.com`)
   - `PUBLIC_APP_URL` → same frontend URL
   - `RAZORPAY_KEY_ID` → live key from 2.1 step 2
   - `RAZORPAY_KEY_SECRET` → live secret from 2.1 step 2
   - `RAZORPAY_WEBHOOK_SECRET` → webhook secret from 2.1 step 4
5. Click **Deploy Blueprint**. Wait for the database to provision (5–10 min), then the web service to build and boot.
6. Check `https://chemai-api.onrender.com/` — should return a JSON health response.

### 2.3 — Seed the database

The database is empty on first deploy. You need to run the seed script:

1. Render Dashboard → `chemai-api` service → Shell (it's a tab at the top)
2. Run:
   ```bash
   cd backend && python -m app.seeds.run_seeds
   ```
3. Verify:
   ```bash
   curl https://chemai-api.onrender.com/api/v1/subscription/plans
   ```
   Should return JSON describing the free / pro plans.

### 2.4 — Update Razorpay webhook URL

1. Razorpay Dashboard → Webhooks → edit the one you created in 2.1
2. Set URL to: `https://chemai-api.onrender.com/api/v1/subscription/webhook`
3. Save

### 2.5 — Deploy frontend to Vercel

> **Note:** ChemAI frontend builds fine on Linux (Vercel) but `npm run build` on Windows may trip on a Next.js 14 + Windows path resolution quirk when generating `.next/types/...` declarations. This does NOT block production — Vercel builds in Linux and succeeds. Just skip the local build verification on Windows and deploy directly.

1. vercel.com → New Project → Import from GitHub → pick the monorepo
2. **Root directory**: `products/chemai/frontend` (critical)
3. Framework preset: Next.js (auto-detected)
4. Environment variables:
   - `NEXT_PUBLIC_API_URL` → `https://chemai-api.onrender.com` (or wherever the backend is)
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` → your **live** key id
   - `NEXT_PUBLIC_APP_NAME` → `ChemAI Studio`
5. Deploy. Wait for it to go green.
6. Settings → Domains → Add the custom domain (e.g. `chemaistudio.com` or `chem.milliondollarstudio.ai`)
7. Add the DNS record at your registrar

### 2.6 — Smoke test ChemAI

1. Visit the deployed frontend URL
2. Sign up → verify you can log in
3. Hit the practice question limit on the free tier
4. Upgrade to pro → Razorpay checkout → complete with a real (small) payment or their test UPI
5. Verify the upgrade lands in the user's profile

### 2.7 — Flip the marketing site

Same procedure as Phase 1.8:
1. Open `F:\Million Dollar AI Studio\MDS Website\src\lib\constants.ts`
2. Set `chemai: 'https://YOUR_CHEMAI_URL',`
3. Commit + push

---

## Phase 3 — Verification & monitoring (30 min)

### 3.1 — Run preflight checks

```bash
cd "F:\Million Dollar AI Studio\MDS Website"
bash scripts/preflight-check.sh
```

This tests:
- marketing site homepage returns 200
- `/api/submit-form/` returns a valid validation error (not 500)
- each live product URL returns 200
- Stripe/Razorpay webhook endpoints return 401 for unsigned requests (not 500)

### 3.2 — Set up error monitoring

**Must-have** before taking real payments:

1. **Sentry** (free tier is fine):
   - Add `@sentry/nextjs` to both the marketing site and ChemAI frontend
   - Add `sentry-sdk[fastapi]` to the ChemAI backend
   - Wire it up per the install wizard (~15 min per project)
2. **Stripe/Razorpay webhook retry logging**:
   - Verify webhooks in their respective dashboards are showing 2xx responses
   - Any `failed` webhooks = unresolved billing state. Investigate immediately.

### 3.3 — Billing safety checks

- ✅ Stripe is in LIVE mode (not test)
- ✅ Razorpay is in LIVE mode (not test)
- ✅ Webhook signing secrets are set in prod envs (not placeholder `whsec_placeholder`)
- ✅ No live keys checked into git (grep repo for `sk_live`, `rzp_live`, `supabase.*service`)
- ✅ Free tier rate limits are enforced server-side (client-side only = trivial to bypass)

---

## What's NOT in this runbook (honest scope limits)

- **JyotishAI** — the `web/` directory is empty scaffolding. The real app is the Tauri desktop build at `products/jyotishai-desktop/`. Desktop distribution (code-signed installers, auto-update) is a separate project. Today: stays in waitlist.
- **ATLAS, NestIQ** — `web/` directories are empty. Real code lives elsewhere (engine/ dirs are also empty for these). Today: stays in waitlist.
- **JobFlow** — internal tool, not productized. Not for public launch.
- **Unified cross-product account system** — each product currently has its own auth (Supabase for FrançaisIQ, JWT for ChemAI). A unified MDS account that spans all products is a 2–5 day project. Deferred.
- **Usage analytics dashboard at milliondollarstudio.ai/account** — same deferral as above; each product has its own dashboard.

---

## Rollback plan (if something breaks in production)

### FrançaisIQ is broken
1. Vercel `tef-maitre` → Deployments → find last known-good deploy → "Promote to Production"
2. If DB schema change caused the break: Supabase SQL Editor → run the down migration manually
3. If Stripe webhook is failing: Stripe Dashboard → Webhooks → check error rate → resend failed events once fixed

### ChemAI is broken
1. Render `chemai-api` service → Deploys → rollback to previous commit
2. Vercel ChemAI frontend → same process
3. If DB is corrupt: Render → chemai-db → backups → restore (you're on the free tier, so backups are limited — take a manual one RIGHT NOW before going live)

### Marketing site is broken
1. Vercel MDS Website → Deployments → rollback to `940469e` (last known-good commit — the "address 26 findings" commit)

---

## Owner responsibilities after go-live

- [ ] Monitor Sentry daily for first week
- [ ] Check Stripe/Razorpay dashboards daily for failed payments, disputes, or fraud alerts
- [ ] Review Supabase → Auth → Users weekly for suspicious signups
- [ ] Back up Postgres (ChemAI) manually every few days until you're on a paid plan with automatic backups
- [ ] Respond to contact form / waitlist submissions within 24h (that's what the marketing site promises)

---

**Written:** April 2026 during the "go live today" sprint.
**Maintainer:** Update PRODUCT_URLS in `src/lib/constants.ts` whenever a product's deployment state changes. That's the only source of truth the marketing site reads from.
