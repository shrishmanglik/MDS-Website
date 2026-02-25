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

export const WEB3FORMS_KEY = '0298abe0-42fb-4f6b-b2ae-21eee063fed2'

export const SOCIAL = {
  twitter: { url: 'https://x.com/MDAI_Studio', handle: '@MDAI_Studio' },
  linkedin: { url: 'https://www.linkedin.com/company/milliondollaraistudio/', handle: '/company/milliondollaraistudio' },
  instagram: { url: 'https://www.instagram.com/milliondollaraistudio/', handle: '@milliondollaraistudio' },
  github: { url: 'https://github.com/shrishmanglik', handle: 'shrishmanglik' },
} as const

export const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Technology', href: '/technology' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
] as const

export const METRICS = [
  { value: '4', label: 'AI Products in Development' },
  { value: '4', label: 'Industries Served' },
  { value: '100%', label: 'Code Ownership Transferred' },
  { value: '1', label: 'Founder Who Builds Everything' },
] as const

export const TECH_CAPABILITIES = {
  ai: ['Claude', 'GPT-4', 'Gemini', 'Open-source Models', 'Fine-tuning'],
  frontend: ['React', 'Next.js', 'Electron'],
  backend: ['FastAPI', 'Node.js', 'Python'],
  infrastructure: ['Docker', 'Vercel', 'Cloudflare', 'AWS'],
  specialized: ['Swiss Ephemeris', 'MCP Protocol', 'Multi-agent Systems'],
} as const
