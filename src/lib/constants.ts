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
 * F:\Million Dollar AI Studio\products\{slug}\ and deploys to its own
 * subdomain of milliondollarstudio.ai. The marketing site is the navigation
 * layer that points visitors at the right product. This registry is the
 * single source of truth for those URLs.
 *
 * TO TAKE A PRODUCT LIVE:
 *   1. Deploy the product app (see GO-LIVE.md)
 *   2. Confirm the subdomain resolves and the app serves 200 OK
 *   3. No code change needed — the URLs below are the canonical targets
 *   4. For a product that's not yet live: keep the key with `null`
 *
 * Setting a value to `null` causes:
 *   - Product cards fall back to a "Join Waitlist" CTA
 *   - /products/[slug] hides the "Try it" button
 *   - Listing copy reflects a waitlist state
 */
export const PRODUCT_URLS: Record<string, string | null> = {
  // LIVE SUBDOMAINS — the canonical URL for each public product
  // pathway was previously "FrançaisIQ" — rebranded as Pathway AI Studio
  // covering French exam prep + Canadian immigration intelligence.
  pathway: 'https://pathway.milliondollarstudio.ai',
  prepai: 'https://prepai.milliondollarstudio.ai',
  astroai: 'https://astro.milliondollarstudio.ai',

  // NOT YET LIVE — keep as null until the deploy + DNS are confirmed
  nestiq: null,
  atlas: null,
  scopestack: null,
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

export const FEATURED_PRODUCT_SLUGS = ['pathway', 'astroai', 'prepai'] as const

export const TECH_CAPABILITIES = {
  frontend: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS'],
  desktop: ['Tauri v2', 'React', 'Python FastAPI sidecar'],
  backend: ['Python', 'FastAPI', 'Pydantic', 'SQLite'],
  infrastructure: ['Vercel ($0)', 'Railway ($5/mo)', 'Supabase'],
  payments: ['Stripe (CAD)', 'Razorpay (INR)'],
  ai: ['Claude (build only)', 'Web Speech API', 'FSRS'],
} as const
