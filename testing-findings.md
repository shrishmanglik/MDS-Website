# MDS Website Testing Findings

**Test date:** April 2026
**Target:** https://milliondollarstudio.ai (production, Vercel)
**Method:** Static HTML fetches via curl with realistic browser User-Agent, HTML parsing for content/meta/links, source-code inspection for tool logic, direct POST to `/api/submit-form` for form testing. Browser preview MCP was attempted first but the Next.js dev server did not respond within usable time on this machine; pivoted to the deployed site per user direction.
**Routes covered:** All 38 (including dynamic `/products/[slug]`, `/blog/[slug]`, `/services/[tier]`, `/tools/[tool]`, and permanent redirects `/pricing`, `/build`, `/technology`)
**Latest deployed commit:** `fdce76d` (the "6 Products Built" metric fix is live — Vercel auto-deployed the push from earlier this session)

---

## Executive summary

**27 findings total: 4 P0 (broken/blocking), 12 P1 (high friction / hurts conversion), 11 P2 (polish / copy)**

### The three issues that matter most
These three compound into one catastrophic situation: **the site currently has zero functioning conversion paths.**

1. **F-001 [P0] — `WEB3FORMS_ACCESS_KEY` is not set in production.** Every form on the site (contact, intake, free-audit, free-assessment, newsletter, and all 6 product waitlists) returns HTTP 500 "Server configuration error." Confirmed by direct POST to `/api/submit-form/` with valid `form_name`. A 400 with missing `form_name` proves the endpoint is alive and the handler is reachable; a 500 with valid `form_name` proves line 41 of `src/app/api/submit-form/route.ts` is the failure point.
2. **F-002 [P0] — Calendly link on `/contact` is a 404.** `https://calendly.com/milliondollarstudio` returns Calendly's branded 404 page (`data-error="404"`, "Page not found"). This is the only non-form booking mechanism and it's dead. Exact markup is still on the page: `href="https://calendly.com/milliondollarstudio"`.
3. **F-003 [P0] — `tef.milliondollarstudio.ai` does not resolve.** Google Public DNS returns `NXDOMAIN` for the FrançaisIQ subdomain. The root domain `milliondollarstudio.ai` resolves fine, so the `tef.` subdomain was never created or was removed. Every "Try FrançaisIQ" / "Try Free" CTA across `/for-people`, `/products`, `/products/francaisiq`, and the homepage product preview points to this dead subdomain. FrançaisIQ is the **only** product with a live external URL per `products.ts`, so this removes the single path to a working product.

### What's actually strong (worth preserving)
- **Routing integrity** — All 38 routes return 200 after trailing-slash redirects. No broken internal routes.
- **Content honesty on metrics** — The deployed hero terminal reads "6 products built" (not the old "3 products live" bug), so today's push landed cleanly.
- **Free-tool math** — TEF Score Estimator's CLB ranges match IRCC's published table (verified lines 26-72 of `TEFContent.tsx`). CRS Calculator and Kundli Generator H1s render normally without SplitText issues.
- **Build-log content** — `/case-studies` now uses honest product build logs (FrançaisIQ, JyotishAI, ChemAI, ATLAS) with real numbers. The "zero fabricated data" overhaul is real.
- **Blog posts** — Five posts with clean titles, H1s, share buttons, and related-post cards. No SplitText issues.
- **Service tiers** — `/services/audit` displays 3 concrete pricing tiers ($500 Starter, $1000 Standard, $2000 Deep Dive) with clear deliverables. `/services/enterprise` breaks down architecture → development → launch. Good structure.

---

## Findings by severity

### P0 — Broken or blocking (4)

#### F-001 — Production Web3Forms env var missing — every form is dead
- **Severity:** P0
- **Personas:** ALL (A, B, C, D, E, F)
- **Pages:** `/contact`, `/intake`, `/free-audit`, `/free-assessment`, every `/products/[slug]` (waitlist), footer newsletter
- **Category:** Conversion mechanics
- **Observation:** Direct test against `https://milliondollarstudio.ai/api/submit-form/`:
  - POST with `{}` → `400 {"success":false,"message":"Missing form name."}` (proves endpoint is alive, handler reached)
  - POST with `{"form_name":"Contact Form","name":"[CLAUDE TEST]","email":"…","message":"…"}` → `500 {"success":false,"message":"Server configuration error."}`
  - Route code at `src/app/api/submit-form/route.ts:41-47` returns exactly that 500 message when `WEB3FORMS_ACCESS_KEY` env is falsy.
- **Impact:** 100% of form submissions fail. Users fill a form, click submit, see an error toast. Zero leads reach the inbox. This silently destroys every single lead generation path on the site.
- **Fix:** Set `WEB3FORMS_ACCESS_KEY` in Vercel project environment variables (Production + Preview), redeploy. Verify immediately with a live submission. Consider adding a production smoke test that POSTs a known-good payload on deploy.

#### F-002 — Calendly link on /contact is 404
- **Severity:** P0
- **Personas:** D, E (anyone trying to book a call for B2B services)
- **Pages:** `/contact`
- **Category:** Broken link
- **Observation:** The "Book a Call" link goes to `https://calendly.com/milliondollarstudio`. A direct GET to that URL returns Calendly's branded 404 page (`<div role="main" data-error="404">`, "Page not found"). The correct URL format is likely `https://calendly.com/milliondollaraistudio` or a different slug.
- **Impact:** The only non-form booking mechanism on the site is broken. Users who distrust the contact form (or can't use it because of F-001) have no fallback.
- **Fix:** Verify Shrish's actual Calendly URL. Update `src/app/contact/page.tsx:67` and anywhere else it's hardcoded. Consider storing it in `src/lib/constants.ts` to avoid this kind of drift in the future.

#### F-003 — tef.milliondollarstudio.ai does not resolve — FrançaisIQ "Try Free" is dead
- **Severity:** P0
- **Personas:** B (French-speaking Express Entry applicant)
- **Pages:** `/` (hero CTA path), `/for-people`, `/products`, `/products/francaisiq`
- **Category:** Broken link
- **Observation:** `nslookup tef.milliondollarstudio.ai 8.8.8.8` → `can't find tef.milliondollarstudio.ai: Non-existent domain`. The root `milliondollarstudio.ai` resolves fine. `products.ts` line 38 sets `externalUrl: 'https://tef.milliondollarstudio.ai'` and `buildTime: 'Live — deployed at tef.milliondollarstudio.ai'`. The claim is false; the subdomain doesn't exist.
- **Impact:** FrançaisIQ is the only product marked `status: 'live'` and the only product with `externalUrl`. This is the single path to a working product on the entire site. It's been severed. Persona B (Express Entry) hits DNS failure on the primary CTA.
- **Fix:** Either (a) create the `tef.milliondollarstudio.ai` CNAME/A record pointing to the deployed app, or (b) if the app is deployed elsewhere (Vercel preview URL, Railway, etc.), update `products.ts:39` to the real URL. Verify with `curl -I` after.

#### F-004 — Stale urgency widget on /free-audit
- **Severity:** P0
- **Personas:** D (SMB owner funnel)
- **Pages:** `/free-audit`
- **Category:** Content honesty / stale copy
- **Observation:** The page still reads:
  > "February 2026 Assessment Capacity"
  > "We limit free assessments to 10 per month to ensure depth and quality."
  > "7 of 10 slots claimed this month"
- **Impact:** Two months stale (current date is April 2026, widget says February). And the "X of Y slots" is the exact fabricated-urgency pattern that an honest builder should never ship. This is actively dishonest and contradicts the "zero fabricated data" commit message. A savvy prospect will notice and lose trust.
- **Fix:** Delete the capacity widget entirely. Replace with an honest availability signal like "Typical response within 24 hours" or omit altogether.

---

### P1 — High friction / hurts conversion (12)

#### F-005 — SplitText hero H1 renders as individual characters in SSR HTML
- **Severity:** P1
- **Personas:** ALL
- **Pages:** `/`, `/for-people`, `/for-businesses`, `/how-we-build`, `/tools`, `/tools/kundli-generator`, `/tools/tef-score-estimator`, `/services/audit`, `/services/launchpad`, `/services/growth`, `/services/enterprise`
- **Category:** SEO, accessibility, perceived quality
- **Observation:** The `SplitText` component emits each character as its own `<span>` with `data-char="A"` plus inline style `opacity:0;filter:blur(10px);y:10px`. Example on `/`:
  ```html
  <h1 ... aria-label="AI Systems That Cost">
    <span ... data-char="A" aria-hidden="true" style="opacity:0;filter:blur(10px);y:10px">A</span>
    <span ... data-char="I" ...>I</span>
    <span ... data-char=" " ...> </span>
    …
  </h1>
  ```
  Result when parsed as plain text: `A I S y s t e m s T h a t C o s t`. The `aria-label` saves accessibility (screen readers read the whole string), but: (a) the inline `opacity:0` means users with slow JS load OR with JS disabled see NO hero headline at all; (b) the `y:10px` property is invalid CSS (should be `translateY`); (c) social share previews and SEO crawlers that parse visible text see the character-split version, which looks broken.
- **Impact:** On every slow connection, the hero is blank until React hydrates. For the 5+ primary landing pages this affects, that's the first thing every prospect sees. Also produces visually broken previews in chat apps that don't fully render JS (Slack, LinkedIn, iMessage link previews).
- **Fix:** Two options. (a) Cheaper: remove `opacity:0` from the initial inline style and let the animation run from visible → animated state, OR start at `opacity: 1` with a CSS `@media (prefers-reduced-motion)` fallback. (b) Proper: use CSS `will-change` + a CSS-only animation that starts visible.

#### F-006 — Page titles have duplicate brand suffix
- **Severity:** P1
- **Personas:** ALL (SEO impact)
- **Pages:** `/for-people`, `/for-businesses`, `/how-we-build`, `/about`, `/services`, `/products`, `/tools`, `/tools/kundli-generator`, `/tools/tef-score-estimator`, `/tools/crs-calculator`, `/case-studies`, `/free-assessment`, `/pricing` (redirect target), `/build` (redirect target)
- **Category:** SEO
- **Observation:** Concrete titles observed:
  - `Products for People | Million Dollar AI Studio | Million Dollar AI Studio`
  - `AI Systems for Businesses | Million Dollar AI Studio | Million Dollar AI Studio`
  - `6 Products. One Architecture. Zero AI Costs. | Million Dollar AI Studio | Million Dollar AI Studio`
  - `Free Tools | Million Dollar AI Studio | Million Dollar AI Studio`
  - `Build Logs — How We Built Each Product | Million Dollar AI Studio | Million Dollar AI Studio`
  - `Deterministic-First Architecture | How We Build | MDS | Million Dollar AI Studio`
- **Cause:** `layout.tsx` defines `title.template: '%s | Million Dollar AI Studio'`, so pages that already end with "| Million Dollar AI Studio" in their own title get the suffix appended twice.
- **Impact:** Google truncates long titles in SERPs; the second brand suffix pushes the real keywords off the edge. Looks amateurish in browser tabs and bookmarks.
- **Fix:** Remove the `| Million Dollar AI Studio` suffix from the page-level titles in each `page.tsx`. Let the template handle it.

#### F-007 — Product-page meta descriptions are duplicated text
- **Severity:** P1
- **Personas:** B, C, F (product-seeking personas hitting SERPs)
- **Pages:** All 6 `/products/[slug]` pages
- **Category:** SEO
- **Observation:** `src/app/products/[slug]/page.tsx:26` sets `description: \`${product.tagline} ${product.description}\``. In `products.ts`, every product's `tagline` and `description` are the same string. Result (from deployed HTML):
  - FrançaisIQ: `French exam prep for TEF Canada / Express Entry. French exam prep for TEF Canada / Express Entry`
  - JyotishAI: `Vedic astrology for professional astrologers. Vedic astrology for professional astrologers`
  - ChemAI: `Chemistry education for Indian JEE/NEET students. Chemistry education for Indian JEE/NEET students`
  - ATLAS/NestIQ/JobFlow: same pattern
- **Impact:** Every product page shows the same sentence twice in the meta description — wasted character budget and looks broken in SERPs.
- **Fix:** Either (a) change the code to `description: product.longDescription.slice(0, 155)` so it uses actual body copy, or (b) add a dedicated `metaDescription` field to `Product` in `products.ts` and author proper 150-char descriptions for each.

#### F-008 — `/services` is orphaned from primary navigation
- **Severity:** P1
- **Personas:** D, E (anyone looking for services)
- **Pages:** `/services`
- **Category:** IA / discoverability
- **Observation:** Navbar links extracted from homepage HTML: `/about`, `/for-businesses`, `/for-people`, `/how-we-build` — four links, no `/services`. Footer `STUDIO_LINKS` (from `Footer.tsx`): For People, For Businesses, How We Build, About, Build Logs, Blog, Contact, Free Tools — no `/services` either. The only inbound links to `/services` come from its own children (`/services/audit` etc.) and three blog posts (inline links). Yet `/services` exists as a standalone page with FAQs, JSON-LD schema, metadata, breadcrumbs.
- **Impact:** A prospect coming from a blog post or Google search can land on `/services`. Everyone else funnels through `/for-businesses` → `/services/[tier]`, which skips the main `/services` page entirely. The content on `/services` is effectively invisible.
- **Fix:** Either (a) redirect `/services` → `/for-businesses` and delete the page (they overlap in purpose), or (b) add `/services` to the footer's Studio column. Probably (a), since `/for-businesses` is already the audience-split canonical.

#### F-009 — `/intake` is orphaned from every crawled page
- **Severity:** P1
- **Personas:** E (technical founder ready to scope a build)
- **Pages:** `/intake`
- **Category:** IA / discoverability
- **Observation:** Grepped all 38 HTML files for `href="/intake`. **Zero results.** The 4-step project intake form is not linked from navbar, footer, services pages, contact page, /for-businesses, /how-we-build, or any product page. It exists at `/intake/` with structured metadata, but no one can find it.
- **Impact:** The most serious B2B conversion form on the site is completely unreachable. Persona E — the founder ready to scope a build — has to either stumble on the URL manually or use `/contact` or `/free-audit` instead.
- **Fix:** Link `/intake` from `/for-businesses` and from every `/services/[tier]` page's bottom CTA, alongside (or instead of) the current CTAs. Add to footer Studio column.

#### F-010 — Three overlapping "free assessment" funnels
- **Severity:** P1
- **Personas:** D, E
- **Pages:** `/free-audit`, `/free-assessment`, `/intake`
- **Category:** Conversion IA
- **Observation:**
  - `/free-audit` — H1 "Get Your Free AI Assessment", has the stale urgency widget (F-004), linked from 5 blog posts and `/intake`
  - `/free-assessment` — H1 "Free AI Assessment", linked from `/for-businesses`, `/build`, `/pricing` (and `/build` + `/pricing` redirect to `/for-businesses`)
  - `/services/audit` FAQ Q3 literally asks "What is the difference between the free assessment and the paid AI Audit?" — the copy itself admits the confusion
- **Impact:** Identical purpose, fragmented inbound links, inconsistent naming. A prospect bouncing between internal links hits a different form each time and wonders if it's a different offer. Split the funnel, split the data.
- **Fix:** Pick one canonical. Recommendation: keep `/free-assessment`, delete `/free-audit` (redirect to `/free-assessment`), remove the stale urgency widget as part of this. Update all blog post links.

#### F-011 — `/roi-calculator` linked from ONE blog post
- **Severity:** P1
- **Personas:** D, E
- **Pages:** `/roi-calculator`
- **Category:** IA / discoverability
- **Observation:** Grep `href="/roi-calculator` → only one match, in `/blog/real-cost-of-ai-implementation`. The tool exists but is effectively a dead link — not in navbar, footer, or any landing page.
- **Impact:** This is a self-qualifying tool that does exactly what `/for-businesses` wants visitors to self-diagnose. And it sits unreachable.
- **Fix:** Add to footer Free Tools section (or `/tools/` hub) and link from `/for-businesses` next to the service tiers.

#### F-012 — /for-people has zero working "try it now" paths
- **Severity:** P1
- **Personas:** A, B, C, F
- **Pages:** `/for-people`
- **Category:** Conversion mechanics (compound with F-001 and F-003)
- **Observation:** /for-people shows 5 products with CTAs:
  - FrançaisIQ → "Try Free" → `https://tef.milliondollarstudio.ai` → DNS failure (F-003)
  - JyotishAI → Join Waitlist → Web3Forms → 500 (F-001)
  - ChemAI → Join Waitlist → Web3Forms → 500 (F-001)
  - ATLAS → Join Waitlist → Web3Forms → 500 (F-001)
  - NestIQ → Join Waitlist → Web3Forms → 500 (F-001)
- **Impact:** Every CTA on the consumer-facing page is currently broken. Persona A, B, C, F land here and cannot take any action. Not a distinct root cause — this entry is a severity amplifier for F-001 and F-003 together.
- **Fix:** Fix F-001 and F-003 first. This entry resolves itself once those are fixed.

#### F-013 — /products/jyotishai, /products/chemai, /products/atlas, /products/nestiq — waitlist is the only CTA and it's broken
- **Severity:** P1
- **Personas:** C, F (JyotishAI + ATLAS personas)
- **Pages:** `/products/jyotishai`, `/products/chemai`, `/products/atlas`, `/products/nestiq`, `/products/jobflow`
- **Category:** Conversion mechanics
- **Observation:** `products/[slug]/page.tsx:96-114` logic: if `externalUrl` exists, show "Try" button; else if `waitlistEnabled`, show WaitlistForm; else nothing. For the 5 non-FrançaisIQ products, the only CTA is the waitlist, which fails per F-001. JobFlow has neither `externalUrl` nor `waitlistEnabled`, so it shows **nothing** — the CTA block is empty (confirmed: JobFlow audit found no "Join Waitlist" button).
- **Impact:** 5 product pages have dead primary CTAs. One (JobFlow) has no CTA at all — just content with no call to action. Users who read the full page have no next step.
- **Fix:** After F-001 is fixed, this resolves for 5 pages. For JobFlow specifically, either hide it from the products listing (it's "internal-only" per the data), or give it an honest CTA like "Read how it works" linking to the build log.

#### F-014 — Inconsistent pricing on Full Stack Build: "$10K – $50K" vs "From $10K" vs "$10K – $20K"
- **Severity:** P1
- **Personas:** D, E
- **Pages:** `/for-businesses`, `/services/enterprise`
- **Category:** Copy / honesty
- **Observation:**
  - `/for-businesses` tier card: "Full Stack Build $10K – $50K"
  - `/services/enterprise` page title: "Full Stack AI Build — From $10K"
  - `/services/enterprise` pricing H3 visible in HTML: "$10K – $20K" (this appears to be one tier, there may be others below the fold)
- **Impact:** A prospect sees three different price bands for the same service on three pages. Can't tell what the real quote range is. Undermines the "fixed price, no surprises" positioning the site otherwise leans on.
- **Fix:** Reconcile to one canonical range. Check `services/enterprise/page.tsx` — if there are multiple tiers, the `/for-businesses` copy needs to say "starting at $10K" or link to the detail page. Also update `services.ts` constants if pricing lives there.

#### F-015 — /contact H1 + meta title mismatch
- **Severity:** P1
- **Personas:** D, E
- **Pages:** `/contact`
- **Category:** Copy / positioning
- **Observation:** Meta title: `Get Started | Free AI Audit | Million Dollar AI Studio`. H1 on the page: `Let's build something.` Meta description: `Start with a free AI audit. Discover where AI can reduce costs, accelerate operations, and create competitive advantage in your business.` But the page itself is a contact form, not an audit landing page. The page routes visitors to Calendly (broken — F-002), `mailto:`, or the contact form (broken — F-001).
- **Impact:** Visitors arriving from SERPs expecting a "Free AI Audit" see a generic contact form. Meta/H1/content tell three different stories. Makes the page feel like a dumping ground.
- **Fix:** Align the three. Either: (a) rename the H1 to match the meta ("Start with a free AI audit" — but then the page should actually *be* the audit intake), or (b) replace the meta with contact-oriented copy ("Contact — Get in touch with MDS"). Option (b) is probably right since `/free-audit` already exists as the audit landing page.

#### F-016 — Product pages have no "back to products" link and no related products
- **Severity:** P1
- **Personas:** A, B, C, F
- **Pages:** All `/products/[slug]`
- **Category:** IA / navigation
- **Observation:** Each product page has a single "Back to Products" link at the top and a single cross-sell "Want something like this built for you?" card at the bottom pointing to `/build` (which redirects to `/for-businesses`). There's no "Related products" or "Next product" navigation to help visitors explore the catalog. Users who want to compare products must return to `/products` and click in individually.
- **Impact:** Dead-end pages. Every product page has only two exits: up (back) or sideways (build-with-us CTA). There's no lateral navigation between the six products.
- **Fix:** Add a "Other products" section at the bottom with 2-3 cards linking to siblings. Trivial to implement — already have `products` array imported.

---

### P2 — Polish, copy, UX nitpicks (11)

#### F-017 — `99.8%` vs `99%+` gross margin inconsistency
- **Severity:** P2
- **Personas:** E
- **Pages:** `/`, `/how-we-build`, `/for-businesses`
- **Observation:** Homepage shows `99.8%` in BentoShowcase and `99%+` in Hero terminal. `/how-we-build` title uses `99.8%`. `/for-businesses` uses `99%+`. Technical readers will notice — and the exact number ("99.8%") is more credible than the hedged one ("99%+").
- **Fix:** Pick one. Recommend `99.8%` (more specific, already dominant).

#### F-018 — Homepage "Real users. Real economics." for all 3 featured products
- **Severity:** P2
- **Personas:** E
- **Pages:** `/` (ProductsPreview section)
- **Observation:** Copy: "Each product proves the architecture. Real code. Real users. Real economics." Featured products are FrançaisIQ (live), JyotishAI (in-development), ChemAI (built, not deployed). "Real users" is accurate only for FrançaisIQ.
- **Fix:** Change to "Real code. Real architecture. Real economics." OR honest product-specific labels ("1 live, 2 built, 3 in development").

#### F-019 — Product page tagline and description are identical strings
- **Severity:** P2
- **Pages:** `products.ts` — all 6 products
- **Observation:** Every product has `tagline === description`. E.g., FrançaisIQ tagline: "French exam prep for TEF Canada / Express Entry." Description: "French exam prep for TEF Canada / Express Entry". This is the root cause of F-007 but also shows up as duplication on the product page itself in places.
- **Fix:** Write a proper one-sentence `description` for each product in `products.ts`. Keep `tagline` as the short punch line.

#### F-020 — /services/audit "Most clients start here" overclaim
- **Severity:** P2
- **Pages:** `/services/audit`, `/services/growth`
- **Observation:** Copy reads "Most clients start with the audit. It pays for itself in the first recommendation alone." Also from F-003: the site has ~zero paying clients to date (no case studies of client work, just own-product build logs). "Most clients" is presumptuous.
- **Fix:** "We recommend starting with the audit — it's the fastest way to see where AI can cut your costs." Removes the unsupported client claim, keeps the intent.

#### F-021 — /services/enterprise "Dedicated communication channel with the engineering team"
- **Severity:** P2
- **Pages:** `/services/enterprise`
- **Observation:** MDS is a solo operation (Shrish). "The engineering team" is overclaiming. "Direct access to the engineer building your system" is honest and stronger.
- **Fix:** Rewrite this line to reflect the solo reality.

#### F-022 — /for-people shows products that users can't actually try
- **Severity:** P2 (moves to P1 only when compounded with F-001/F-003)
- **Pages:** `/for-people`
- **Observation:** Page shows 5 products but only FrançaisIQ has a "Try Free" CTA. Others have status badges ("In Development", "Built", "PRD Complete") and Join Waitlist buttons. Framing the page as "Products for People" when 4/5 are unavailable is a soft bait-and-switch.
- **Fix:** Either (a) re-title to "Products & What's Coming" and group by availability, or (b) only list products that users can actually try.

#### F-023 — Kundli Generator and TEF Score Estimator use SplitText but CRS Calculator does not
- **Severity:** P2
- **Pages:** `/tools/kundli-generator`, `/tools/tef-score-estimator` vs `/tools/crs-calculator`
- **Observation:** Inconsistent H1 treatment across tools. Two tools show `F r e e   K u n d l i   G e n e r a t o r` / `T E F   C a n a d a   S c o r e   E s t i m a t o r` (SplitText), while CRS Calculator renders clean `Free CRS Calculator`. This is a subset of F-005 but worth calling out the inconsistency.
- **Fix:** Apply the F-005 fix site-wide.

#### F-024 — Blog post category bar uses "From the studio." H1 instead of "Blog"
- **Severity:** P2
- **Pages:** `/blog`
- **Observation:** The blog index has H1 "From the studio." — cute but not indexable for "MDS blog" searches. Might hurt SEO for generic discovery terms.
- **Fix:** Minor. Change H1 to something like "Insights from the studio" or add an H2 with "Blog" context.

#### F-025 — /about "Ship, don't plan" value is harsh
- **Severity:** P2
- **Pages:** `/about`
- **Observation:** The three values are "Ship, don't plan", "Own the code", "Accuracy over speed." "Ship, don't plan" is provocative but reads as anti-planning rather than pro-shipping. Easy to soften.
- **Fix:** "Ship, then iterate" or "Ship first, refine in public." Preserves the intent without rejecting planning outright.

#### F-026 — MegaMenu.tsx contains stale content but is no longer imported
- **Severity:** P2
- **Pages:** N/A (dead code)
- **Observation:** `Navbar.tsx` no longer imports `MegaMenu`. But `MegaMenu.tsx` still exists and contains outdated descriptions ("Financial Analysis AI", "Chemistry Education", "Fashion Supply Chain", "Astrology Platform", "Free AI Audit 5-page report in 48 hours") that don't match the real products. Dead code but misleading if someone re-enables it later.
- **Fix:** Delete `src/components/layout/MegaMenu.tsx`. If the mega-menu is planned to come back, it needs fresh content anyway.

#### F-027 — /tools page H1 is SplitText'd; "Coming Soon" button is not labeled
- **Severity:** P2
- **Pages:** `/tools`
- **Observation:** H1 renders as `F r e e   T o o l s`. Also an unlabeled "Coming Soon" button appears in the CTA extraction with no context on what it refers to. Need to verify in browser which tool is placeholder.
- **Fix:** Label the Coming Soon card explicitly with the tool name and an estimated quarter.

---

## Findings grouped by persona

### Persona A — JEE/NEET student (wants ChemAI)
- Entry: `/` → `/for-people` → `/products/chemai`
- **Blocked at:** /products/chemai has only "Join Waitlist" which posts to broken /api/submit-form (F-001)
- Page content itself is good — real stats, honest "built but pending deployment" status label
- **Additional:** ChemAI is actually referenced in some blog posts but not linked from navigation
- **Status:** BLOCKED by F-001

### Persona B — French-speaking Express Entry applicant (wants FrançaisIQ)
- Entry: `/` → `/tools/tef-score-estimator` → `/products/francaisiq` → external link
- **Scores:** TEF tool works (verified IRCC math). Kundli/TEF tool H1s are SplitText'd (F-023).
- **Blocked at:** The "Try FrançaisIQ" CTA points to `tef.milliondollarstudio.ai` which is NXDOMAIN (F-003)
- This is the SINGLE path to a working product and it's broken at the DNS level
- **Status:** BLOCKED by F-003 — the only working conversion path on the site is severed

### Persona C — Vedic astrologer (wants JyotishAI)
- Entry: `/` → `/tools/kundli-generator` → `/products/jyotishai` → `/waitlist/jyotishai`
- **Free tool works:** Kundli Generator renders (SplitText H1 aside, F-023)
- **Blocked at:** JyotishAI is "In Development" (honest), only CTA is Join Waitlist → broken (F-001)
- **Status:** BLOCKED by F-001

### Persona D — SMB owner (wants AI audit / services)
- Entry: `/` → `/for-businesses` → `/services/audit` → `/free-audit` (or `/free-assessment` or `/intake` — F-010)
- **Content is strong:** /for-businesses has clear tier pricing, cost comparison table, process breakdown. /services/audit has 3 priced tiers with scoped deliverables. Good stuff.
- **Blocked at:** Every form along the way fails (F-001). /free-audit also shows the stale February 2026 capacity widget (F-004). /free-assessment vs /free-audit vs /intake fragmentation (F-010) means the user may get different forms from different links.
- **Status:** Content is the strongest on the site; conversion infrastructure is 100% broken

### Persona E — Technical founder (evaluating consulting)
- Entry: `/` → `/how-we-build` → `/case-studies` → `/services/enterprise` → `/intake`
- **Scores:** `/how-we-build` is excellent — real three-tier breakdown with deterministic math. `/case-studies` (labeled "Build Logs") is honest. `/services/enterprise` has real scope breakdowns.
- **Blocked at:**
  - `/intake` is completely unlinked from the site (F-009)
  - If they find `/intake`, the form submission fails (F-001)
  - If they use `/contact` as alternative, Calendly 404 (F-002) and contact form fails (F-001)
  - Pricing inconsistency on /services/enterprise (F-014) creates doubt
  - "Dedicated engineering team" overclaim (F-021) — technical founders will spot this
- **Status:** BLOCKED by F-009 (can't find intake) and F-001 (forms dead)

### Persona F — NRI tax planner (wants ATLAS)
- Entry: `/` → `/for-people` → `/products/atlas` → `/waitlist/atlas`
- **Content is strong:** ATLAS product page has real stats (44/44 tests, DTAA treaty analysis, etc.)
- **Blocked at:** Waitlist form fails (F-001)
- **Missing:** No free tool to demo capability (like Kundli Generator is for JyotishAI or TEF tool is for FrançaisIQ). Could add a simple provincial tax comparison tool.
- **Status:** BLOCKED by F-001; content gap (F-022 adjacent)

---

## Findings grouped by category

### Broken/dead endpoints (3)
F-001 (forms API env var), F-002 (Calendly 404), F-003 (tef subdomain NXDOMAIN)

### Content honesty (4)
F-004 (stale urgency), F-018 (Real users overclaim), F-020 (Most clients overclaim), F-021 (engineering team overclaim)

### Information architecture / discoverability (5)
F-008 (/services orphaned), F-009 (/intake orphaned), F-010 (3 overlapping assessment funnels), F-011 (/roi-calculator orphaned), F-016 (product pages dead-end)

### SEO (3)
F-005 (SplitText SSR invisible), F-006 (duplicate title suffix), F-007 (duplicated meta descriptions)

### Visual / rendering (2)
F-005 (SplitText — overlaps with SEO), F-023 (tool H1 inconsistency)

### Copy / consistency (6)
F-014 (pricing discrepancy), F-015 (contact meta/H1 mismatch), F-017 (99.8% vs 99%+), F-019 (tagline==description), F-025 (Ship don't plan), F-024 (blog H1)

### Conversion compound failures (2)
F-012 (/for-people has zero working paths — amplifier of F-001+F-003), F-013 (product waitlists dead — amplifier of F-001)

### Dead code / cleanup (2)
F-026 (MegaMenu.tsx orphaned), F-027 (/tools Coming Soon unlabeled)

---

## Methodology notes and limitations

1. **Browser-based interactive testing was blocked.** Next.js dev mode on the local Windows box takes 5+ minutes per page compile; production `next start` binds the port but never responds to HTTP. Chrome MCP extension wasn't reachable. WebFetch is blocked by production bot protection (403). Pivoted to curl with a realistic User-Agent against the deployed production site per user direction.

2. **Real forms were NOT submitted with test data as originally planned.** Once F-001 was confirmed (500 on any payload with `form_name`), there was no point submitting to individual form endpoints — they all use the same `/api/submit-form/` handler and would all 500 for the same reason. Marking that phase as "tested via root cause" rather than "tested per form".

3. **Responsive testing was static-only.** Could not actually resize a viewport. Looked at Tailwind class breakpoints during source reads. Mobile-specific bugs (e.g., hamburger menu issues, touch target sizes) are not captured in this report and would need a proper mobile device or emulator.

4. **Free tools were verified at the source-code / data level.** TEF Score Estimator's CLB ranges were read directly from `TEFContent.tsx` lines 26-72 and cross-checked against the IRCC published equivalency chart — they match. Kundli Generator and CRS Calculator were not deep-tested; the Kundli H1 is SplitText'd (F-023) but the form input structure rendered fine in static HTML. CRS Calculator has a multi-step wizard (buttons "Personal / Language / Additional / Back / Next / Notify Me") which couldn't be exercised without a browser.

5. **The homepage `99.8% gross margin` claim and "100K+ lines of content" claim were not independently verified.** They're architecturally defensible but not checkable from outside without access to internal cost data / content repository.

6. **External link checking was done with DNS lookups and curl, not full page loads.** Calendly was verified as a 404 via `data-error="404"` marker. `tef.milliondollarstudio.ai` was verified as NXDOMAIN via `nslookup … 8.8.8.8` (authoritative check on Google Public DNS).

---

## Recommended triage order (my opinion, not gospel)

1. **Today, in this order:** F-001 (Web3Forms env var) → F-002 (Calendly URL) → F-003 (tef DNS). These three in an hour or two restore every conversion path. Deploy and re-test with a real form submission and a real Calendly click.

2. **This week:** F-004 (delete stale urgency widget) → F-006 (strip duplicate title suffix) → F-007 (fix product meta descriptions) → F-005 (remove `opacity:0` from SplitText inline styles). All SEO/polish that improves every page.

3. **Next sprint:** F-008, F-009, F-010, F-011 (IA cleanup — orphan routes, funnel consolidation). One coherent "connect the dots" sprint.

4. **When content has a quiet moment:** F-017 (pick one margin number), F-018 + F-020 + F-021 (honesty passes on copy), F-014 (reconcile enterprise pricing), F-019 (write real product descriptions).

5. **Drop or defer:** F-026 (dead MegaMenu code — delete during any routine cleanup).

End of findings.
