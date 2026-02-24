export interface Product {
  slug: string
  name: string
  tagline: string
  status: 'coming-soon' | 'in-development' | 'beta' | 'live' | 'desktop'
  description: string
  longDescription: string
  features: string[]
  techStack: string[]
  buildTime: string
  externalUrl: string | null
  waitlistEnabled: boolean
  story: string
  featured: boolean
}

export const products: Product[] = [
  {
    slug: 'finsight-ai',
    name: 'FinSight AI',
    tagline: 'The AI that never hallucinates financial data.',
    status: 'coming-soon',
    description:
      'XBRL-native financial intelligence platform. We parse the machine-readable truth in SEC filings — not the HTML. Every number verified, every source cited.',
    longDescription: `Every AI tool today reads SEC filings like a human: scraping HTML, guessing at numbers, hallucinating financial data. XBRL International's own research shows these tools achieve only 0-17% accuracy on structured financial data extraction.

FinSight is different. We parse the machine-readable XBRL data embedded in every SEC filing since 2009. This means every number comes from structured, tagged financial data — not guesswork. We then layer AI reasoning on top of this verified foundation for interpretation, comparison, and analysis.

The result: zero-hallucination financial data with full source citations. Every figure links back to its exact SEC filing and XBRL concept tag.`,
    features: [
      'XBRL-native data extraction from all SEC EDGAR filings',
      'Natural language financial queries with verified, sourced answers',
      'Multi-company comparison tables with standardized metrics',
      'Every number links to its SEC XBRL source — click to verify',
      'AI-powered interpretation that never generates or guesses numbers',
      'Coverage: Every US public company since 2009',
    ],
    techStack: ['FastAPI', 'React', 'XBRL', 'SEC EDGAR', 'Claude AI', 'PostgreSQL'],
    buildTime: 'In development',
    externalUrl: null,
    waitlistEnabled: true,
    story:
      'We found that AI tools score 0-17% on financial data accuracy. We knew we could build something that scores 95%+. FinSight is our answer to the hallucination problem in financial AI.',
    featured: true,
  },
  {
    slug: 'thread-intelligence',
    name: 'Thread Intelligence',
    tagline: 'AI-powered fashion manufacturing platform.',
    status: 'in-development',
    description:
      'End-to-end platform for fashion brands and manufacturers. Design generation, costing, quoting, and supply chain management.',
    longDescription: `Thread Intelligence bridges the gap between fashion design intent and manufacturing execution. Brands describe what they want — the platform handles AI-powered design generation, material costing, manufacturer matching, and quote management.

Built for the fashion supply chain where communication gaps between brands and manufacturers cost millions in wasted samples, misunderstood specs, and delayed production. Thread Intelligence makes the design-to-production pipeline transparent, fast, and accurate.`,
    features: [
      'AI design generation from text descriptions and mood boards',
      'Automated material costing and quote calculation',
      'Manufacturer matching based on capability and capacity',
      'Order management and production tracking',
      'Client portal for brand-manufacturer collaboration',
      'Multi-currency support for global supply chains',
    ],
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'AI Design Engine', 'Vercel'],
    buildTime: '27 files, 8,199 lines — built in 1 day',
    externalUrl: null,
    waitlistEnabled: true,
    story:
      'Built in partnership with a manufacturing partner who supplies Zara, H&M, and other global brands. The fashion supply chain runs on WhatsApp and spreadsheets — we\'re fixing that.',
    featured: false,
  },
  {
    slug: 'astroai-studio',
    name: 'AstroAI Studio',
    tagline: 'Vedic astrology, calculated by the stars.',
    status: 'in-development',
    description:
      'Comprehensive Vedic astrology platform with Swiss Ephemeris accuracy. Kundli, divisional charts, Shadbala, compatibility, and AI interpretations.',
    longDescription: `AstroAI Studio brings astronomical-grade precision to Vedic astrology. Powered by the Swiss Ephemeris — the same engine used by NASA — every planetary calculation is accurate to arc-second precision.

Unlike most astrology apps that use simplified lookup tables, AstroAI Studio computes complete Vedic charts including all 16 divisional charts (Varga), Shadbala planetary strength calculations, Ashtakavarga analysis, dasha timelines, and transit overlays. The AI interpretation layer provides detailed, personalized readings without sacrificing computational accuracy.`,
    features: [
      'Swiss Ephemeris integration for NASA-grade planetary calculations',
      'Complete Kundli generation with all 16 divisional charts',
      'Shadbala (six-fold planetary strength) analysis',
      'Ashtakavarga point calculations for transit prediction',
      'AI-powered personalized interpretations',
      'Compatibility (Kundli matching) analysis',
      'Dasha timeline visualization with period predictions',
    ],
    techStack: ['FastAPI', 'React', 'Swiss Ephemeris', 'Docker', 'Claude AI'],
    buildTime: 'Multiple iterations',
    externalUrl: null,
    waitlistEnabled: true,
    story:
      'Most astrology software uses approximations. We wanted arc-second accuracy with Swiss Ephemeris — the same engine astronomers use. Then we layered AI to make the depth of Vedic astrology accessible to anyone.',
    featured: false,
  },
  {
    slug: 'chemai-studio',
    name: 'ChemAI Studio',
    tagline: 'AI chemistry tutor that actually teaches.',
    status: 'in-development',
    description:
      'Interactive chemistry education platform. AI tutoring, practice problems, molecule visualization, and exam prep.',
    longDescription: `ChemAI Studio is an AI-powered chemistry education platform designed for students and educators. Instead of generic AI chatbots that give vague answers, ChemAI understands chemistry deeply — molecular structures, reaction mechanisms, stoichiometry, and thermodynamics.

The platform combines interactive molecule visualization, step-by-step problem solving, adaptive practice questions, and an AI tutor trained specifically on chemistry curriculum. Students don't just get answers — they get explanations that build understanding.`,
    features: [
      'AI tutor trained on chemistry curriculum (Grade 9 through university)',
      'Interactive 3D molecule visualization',
      'Step-by-step reaction mechanism walkthroughs',
      'Adaptive practice problem generator',
      'Exam preparation mode with timed assessments',
      'Progress tracking and weakness identification',
    ],
    techStack: ['Electron', 'Next.js', 'SQLite', 'AI Tutor Engine', '3Dmol.js'],
    buildTime: 'Desktop application',
    externalUrl: null,
    waitlistEnabled: true,
    story:
      'Chemistry education hasn\'t changed in decades. Students memorize formulas instead of understanding concepts. ChemAI teaches the way a great private tutor would — adaptive, visual, and patient.',
    featured: false,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getFeaturedProduct(): Product | undefined {
  return products.find((p) => p.featured)
}
