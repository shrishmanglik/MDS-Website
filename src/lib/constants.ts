export const SITE = {
  name: 'Million Dollar AI Studio',
  shortName: 'MDS',
  domain: 'milliondollarstudio.ai',
  url: 'https://milliondollarstudio.ai',
  tagline: 'AI systems you actually own.',
  founder: 'Shrish Manglik',
  founderTitle: 'Founder, Million Dollar AI Studio',
  founderInitials: 'SM',
  email: 'shrishmanglik@milliondollarstudio.ai',
  formEmail: 'milliondollaraistudio@gmail.com',
  // TODO(F-002): replace with the real Calendly URL before re-enabling the
  // "Book a Call" button on /contact. The previous URL
  // (https://calendly.com/milliondollarstudio) returned a 404.
  calendlyUrl: null as string | null,
} as const

/**
 * Central registry for product production URLs.
 *
 * WHY THIS EXISTS: Each product lives in a separate repo under
 * F:\Million Dollar AI Studio\products\{slug}\ and deploys to its own domain.
 * The marketing site (milliondollarstudio.ai) is the navigation layer that
 * points visitors at the right product. This registry is the single source
 * of truth for those URLs.
 *
 * TO TAKE A PRODUCT LIVE:
 *   1. Deploy the product app (see GO-LIVE.md)
 *   2. Replace `null` with the production URL here
 *   3. `npm run build && git commit && git push`
 *
 * Setting a value to `null` causes:
 *   - Product cards fall back to a "Join Waitlist" CTA
 *   - /products/[slug] hides the "Try it" button
 *   - Listing copy reflects a waitlist state
 *
 * Acceptable values:
 *   - A real HTTPS URL, e.g. 'https://tef.milliondollarstudio.ai'
 *   - `null` if the product is not yet live
 */
export const PRODUCT_URLS: Record<string, string | null> = {
  // TODO(launch): set to 'https://tef.milliondollarstudio.ai' once DNS is live
  //   and the tef-maitre Vercel project has its Supabase + Stripe live env vars.
  francaisiq: null,

  // TODO(launch): set to the production ChemAI URL (e.g. 'https://chemaistudio.com'
  //   or 'https://chem.milliondollarstudio.ai') after the Vercel deploy + custom
  //   domain are configured. Backend must be live on Render first.
  chemai: null,

  // JyotishAI web shell is empty scaffolding; the real product is a Tauri
  // desktop app. No web URL until a web shell exists. Keep waitlist.
  jyotishai: null,

  // ATLAS web/engine directories are empty in the monorepo. Waitlist only.
  atlas: null,

  // NestIQ is a PRD (product requirements doc) only. Waitlist only.
  nestiq: null,

  // JobFlow is an internal personal productivity tool — not for public launch.
  jobflow: null,
} as const

// Web3Forms key moved to server-side .env.local (see /api/submit-form)

export const SOCIAL = {
  twitter: { url: 'https://x.com/MDAI_Studio', handle: '@MDAI_Studio' },
  linkedin: { url: 'https://www.linkedin.com/company/milliondollaraistudio/', handle: '/company/milliondollaraistudio' },
  instagram: { url: 'https://www.instagram.com/milliondollaraistudio/', handle: '@milliondollaraistudio' },
  github: { url: 'https://github.com/shrishmanglik', handle: 'shrishmanglik' },
} as const

export const NAV_LINKS = [
  { label: 'For People', href: '/for-people' },
  { label: 'For Businesses', href: '/for-businesses' },
  { label: 'How We Build', href: '/how-we-build' },
  { label: 'About', href: '/about' },
] as const

export const SERVICE_TIERS = [
  { label: 'AI Audit', href: '/services/audit', price: '$500 – $2K' },
  { label: 'AI Launchpad', href: '/services/launchpad', price: '$3K – $5K' },
  { label: 'Growth Engine', href: '/services/growth', price: '$3K – $8K/mo' },
  { label: 'Full Stack Build', href: '/services/enterprise', price: '$10K – $50K' },
] as const

export const METRICS = [
  { value: '99.8%', label: 'Gross Margin', sublabel: 'Deterministic architecture', proof: '/how-we-build' },
  { value: '$0.00', label: 'Per Interaction', sublabel: 'No API dependency at runtime', proof: '/how-we-build' },
  { value: '6', label: 'Products Built', sublabel: '1 live, 5 in development or built', proof: '/products' },
  { value: '100K+', label: 'Lines of Content', sublabel: 'Manufactured knowledge', proof: '/how-we-build' },
] as const

export const FEATURED_PRODUCT_SLUGS = ['francaisiq', 'jyotishai', 'chemai'] as const

export const TECH_CAPABILITIES = {
  frontend: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS'],
  desktop: ['Tauri v2', 'React', 'Python FastAPI sidecar'],
  backend: ['Python', 'FastAPI', 'Pydantic', 'SQLite'],
  infrastructure: ['Vercel ($0)', 'Railway ($5/mo)', 'Supabase'],
  payments: ['Stripe (CAD)', 'Razorpay (INR)'],
  ai: ['Claude (build only)', 'Web Speech API', 'FSRS'],
} as const
