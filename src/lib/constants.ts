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
  { value: '99%+', label: 'Gross Margin', sublabel: 'Deterministic architecture', proof: '/how-we-build' },
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
