import { PRODUCT_URLS } from './constants'

export interface Product {
  slug: string
  name: string
  tagline: string
  status: 'coming-soon' | 'in-development' | 'beta' | 'live' | 'desktop' | 'built' | 'prd' | 'internal'
  description: string
  longDescription: string
  features: string[]
  techStack: string[]
  buildTime: string
  /**
   * Do NOT set this directly. It is derived from PRODUCT_URLS in constants.ts.
   * To make a product clickable, set its URL in PRODUCT_URLS.
   */
  externalUrl: string | null
  waitlistEnabled: boolean
  story: string
  featured: boolean
  highlight: string
}

const rawProducts: Array<Omit<Product, 'externalUrl'>> = [
  {
    slug: 'pathway',
    name: 'Pathway AI Studio',
    tagline: 'French exam prep & Canadian immigration intelligence.',
    status: 'built',
    description:
      'TEF Canada preparation with 10 deterministic scoring engines, 1,500+ practice items, and CRS intelligence. Built and verified, launching April 2026.',
    longDescription: `Pathway AI Studio (formerly FrançaisIQ) prepares candidates for the TEF Canada exam required for Express Entry immigration. The platform covers all four exam sections — Compréhension Orale, Compréhension Écrite, Expression Orale, and Expression Écrite — with deterministic scoring engines that evaluate responses without any AI API calls at runtime.

The original AI prototype relied on 25+ Gemini API calls per session with an exposed API key. We rebuilt the entire system with 10 deterministic scoring engines, pre-validated lookup tables, and the Web Speech API for pronunciation assessment. The result: 1,500+ practice items running at $0 per interaction.`,
    features: [
      '1,500+ practice items across all four TEF Canada sections',
      '10 deterministic scoring engines — zero AI at runtime',
      'CRS score calculation and Express Entry readiness',
      'Web Speech API integration for pronunciation assessment',
      'CLB level mapping aligned to IRCC requirements',
      'Progress tracking with section-by-section analytics',
    ],
    techStack: ['Vite', 'React 19', 'TypeScript', 'Tailwind CSS', 'Web Speech API', 'Supabase', 'Stripe', 'Vercel'],
    buildTime: 'Built and verified — launching April 2026',
    waitlistEnabled: true,
    story:
      'The original prototype used 25+ Gemini API calls and had an exposed key. We rebuilt with 10 deterministic scoring engines and lookup tables. 100% of scoring now runs at $0.',
    featured: true,
    highlight: '1,500+ practice items, 10 deterministic scoring engines, CRS intelligence',
  },
  {
    slug: 'astroai',
    name: 'Astro AI Studio',
    tagline: 'Vedic astrology for professional astrologers.',
    status: 'in-development',
    description:
      'Offline desktop app with Swiss Ephemeris precision. 16 divisional charts, 50+ yogas, Shadbala, Ashtakavarga, and Vimshottari dasha — all in a 75MB self-contained package.',
    longDescription: `Astro AI Studio is a desktop application for professional Vedic astrologers who need offline capability and astronomical-grade precision. Built with Tauri v2 and a Python FastAPI sidecar running Swiss Ephemeris, the engine performs complete kundali generation — including all 16 divisional charts, Shadbala planetary strength analysis, Ashtakavarga calculations, and Vimshottari dasha timelines — entirely offline in a 75MB self-contained package.

The architecture separates the deterministic calculation engine (pure Python, no AI dependencies) from the optional AI interpretation layer. Professional astrologers get precision tools without internet requirements or per-query costs.`,
    features: [
      '50+ yoga calculations with traditional rule-based detection',
      '16 divisional charts (Varga) with Swiss Ephemeris precision',
      'Shadbala (six-fold planetary strength) analysis',
      'Ashtakavarga point calculations for transit prediction',
      'Vimshottari dasha timeline with multi-level periods',
      'Ashtakoot compatibility matching (Kundli Milan)',
      'Complete offline operation — zero internet required',
    ],
    techStack: ['Tauri v2', 'React', 'Python', 'FastAPI', 'Swiss Ephemeris', 'SQLite'],
    buildTime: 'In development — desktop app',
    waitlistEnabled: true,
    story:
      'Professional astrologers need offline capability and precision. We built a 75MB self-contained engine with Swiss Ephemeris — the same library used by astronomical observatories — wrapped in a Tauri v2 desktop shell.',
    featured: false,
    highlight: '50+ yoga calculations, 16 divisional charts, Swiss Ephemeris, 75MB offline engine',
  },
  {
    slug: 'prepai',
    name: 'PrepAI Studio',
    tagline: 'AI-powered exam prep — starting with Chemistry.',
    status: 'built',
    description:
      'AI-powered exam prep platform starting with JEE/NEET Chemistry. Blueprint exam generator, FSRS spaced repetition, deterministic grading. 130/130 tests passing, zero AI at runtime.',
    longDescription: `PrepAI Studio is an exam prep platform targeting Indian students preparing for competitive exams. We're starting with JEE/NEET Chemistry — the first in a planned series that will extend to Physics, Math, and Biology on the same deterministic-first architecture.

The core innovation is the blueprint exam paper generation engine — it constructs complete, exam-accurate practice papers from a pre-validated question bank, matching the exact topic distribution, difficulty curve, and question-type mix of real exams. The platform uses FSRS (Free Spaced Repetition Scheduler) for optimized review scheduling and a deterministic scoring engine for instant grading. All 130 tests pass. No AI API calls at test time.`,
    features: [
      'Blueprint engine generates exam-accurate practice papers',
      'FSRS spaced repetition for optimized study scheduling',
      'Deterministic scoring — instant grading, zero AI cost',
      'Topic-wise and chapter-wise practice modes',
      'Performance analytics with weakness identification',
      'Complete JEE/NEET Chemistry syllabus coverage (Physics / Math / Biology on the roadmap)',
    ],
    techStack: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'FSRS', 'Razorpay', 'Tailwind CSS'],
    buildTime: 'Built — 130/130 tests passing, launching April 2026',
    waitlistEnabled: true,
    story:
      'Indian competitive exam prep is a $10B+ market running on outdated methods. We built a blueprint engine that generates exam-accurate papers deterministically — no AI needed at test time. Starting with Chemistry; the architecture extends to every other subject.',
    featured: false,
    highlight: 'Blueprint exam paper generation, FSRS spaced repetition, 130/130 tests passing',
  },
  {
    slug: 'atlas',
    name: 'ATLAS',
    tagline: 'Cross-border tax intelligence for Indian newcomers to Canada.',
    status: 'built',
    description:
      'DTAA treaty analysis and provincial tax comparison encoded as pure computation. 44/44 tests, zero LLM dependencies, zero hallucination risk.',
    longDescription: `ATLAS encodes the India-Canada Double Taxation Avoidance Agreement (DTAA) and provincial tax rules as pure computation. Cross-border tax rules are deterministic — there is no ambiguity in whether a treaty article applies or what a provincial tax rate is. Using AI for this adds hallucination risk to a domain where accuracy is non-negotiable.

The engine handles DTAA treaty analysis, provincial tax comparison across all Canadian provinces, residency status determination, and investment income tax optimization. 44/44 tests pass with zero LLM dependencies. Submitted to the Wealthsimple accelerator program.`,
    features: [
      'DTAA treaty analysis — India-Canada tax treaty encoded as rules',
      'Provincial tax comparison across all Canadian provinces',
      'Residency status determination engine',
      'Investment income tax optimization',
      'Zero LLM dependencies — pure deterministic computation',
      'NRI/OCI tax obligation analysis',
    ],
    techStack: ['Python', 'FastAPI', 'Pydantic', 'pytest'],
    buildTime: 'Built — 44/44 tests passing, submitted to Wealthsimple',
    waitlistEnabled: true,
    story:
      'Tax rules are deterministic. AI adds risk. We encoded DTAA treaties and provincial rules as pure computation — 44/44 tests, zero AI costs, zero hallucination risk.',
    featured: false,
    highlight: 'DTAA treaty analysis, provincial tax comparison, 44/44 tests, zero LLM dependencies',
  },
  {
    slug: 'nestiq',
    name: 'NestIQ',
    tagline: "Canada's rental intelligence platform.",
    status: 'prd',
    description:
      'Canadian rental regulations encoded as rule engines across all 13 provinces. Landlord-tenant rights, rent increase calculations, and compliance checking. Phase 1: ON/BC/AB.',
    longDescription: `NestIQ encodes Canadian rental regulations across provinces as deterministic rule engines. Phase 1 covers Ontario, British Columbia, and Alberta — the three provinces with the highest rental volumes and most complex regulatory frameworks.

The platform provides landlord-tenant rights analysis, rent increase calculations (tied to provincial CPI guidelines), investment property analysis, and regulatory compliance checking. All 13 provincial regulatory frameworks are being encoded as rule engines — no AI interpretation of laws that have definitive answers.`,
    features: [
      '13 provincial regulatory frameworks encoded as rule engines',
      'Rent increase calculations tied to provincial CPI guidelines',
      'Landlord-tenant rights analysis by province',
      'Investment property ROI analysis',
      'Regulatory compliance checking',
      'Phase 1: Ontario, British Columbia, Alberta',
    ],
    techStack: ['Next.js', 'TypeScript', 'Python', 'Supabase', 'Tailwind CSS'],
    buildTime: 'PRD complete — Phase 1: ON/BC/AB',
    waitlistEnabled: true,
    story:
      'Canadian rental laws vary by province and change annually. We are encoding all 13 regulatory frameworks as deterministic rule engines — no AI guessing at tenant rights.',
    featured: false,
    highlight: '13 provincial regulatory frameworks as rule engines, investment analysis',
  },
  {
    slug: 'scopestack',
    name: 'ScopeStack',
    tagline: 'AI audit scoping and proposal generation.',
    status: 'coming-soon',
    description:
      'Automated AI audit scoping tool for the MDS services practice. Generates structured opportunity reports and implementation roadmaps from intake questionnaires.',
    longDescription: `ScopeStack automates the scoping phase of MDS AI audits. It takes structured intake data — business type, current processes, team size, tech stack — and generates a scored opportunity matrix with ROI projections and implementation roadmaps.

The tool is being built to scale the services arm of MDS: every audit currently requires manual analysis, but 80% of the scoping process follows deterministic patterns that can be pre-computed.`,
    features: [
      'Structured intake questionnaire with branching logic',
      'Deterministic opportunity scoring matrix',
      'ROI projection engine based on industry benchmarks',
      'Implementation roadmap generator',
      'PDF report generation',
    ],
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'Stripe'],
    buildTime: 'Coming soon',
    waitlistEnabled: true,
    story:
      'Every AI audit starts with the same scoping process. ScopeStack automates the 80% that is deterministic, freeing the human auditor to focus on the 20% that requires domain judgment.',
    featured: false,
    highlight: 'Automated audit scoping, ROI projections, roadmap generation',
  },
  {
    slug: 'jobflow',
    name: 'JobFlow',
    tagline: 'Job application automation pipeline.',
    status: 'internal',
    description:
      'Personal productivity tool: resume tailoring, cover letter generation, and follow-up automation. Internal use only — documented here as a case study in the MDS methodology.',
    longDescription: `JobFlow is an internal tool that automates the job application pipeline. It handles resume tailoring, cover letter generation, application tracking, and follow-up scheduling. Built as a personal productivity tool — it works but is not productized for commercial distribution.

The tool demonstrates the MDS approach applied to personal workflow automation: deterministic pipeline orchestration with AI used only for content generation steps.`,
    features: [
      'Automated application pipeline orchestration',
      'Resume tailoring based on job description matching',
      'Application tracking and status management',
      'Follow-up scheduling automation',
    ],
    techStack: ['Python', 'Automation scripts'],
    buildTime: 'Internal tool — personal use',
    waitlistEnabled: false,
    story:
      'Built as an internal tool to automate the repetitive parts of job applications. Not productized — but it demonstrates the deterministic-first approach applied to personal workflows.',
    featured: false,
    highlight: 'Internal tooling, automated application pipeline',
  },
]

// Hydrate each product with its externalUrl from the central PRODUCT_URLS
// registry. This is the single source of truth — updating PRODUCT_URLS in
// constants.ts is the only place you need to touch to make a product clickable.
export const products: Product[] = rawProducts.map((p) => ({
  ...p,
  externalUrl: PRODUCT_URLS[p.slug] ?? null,
}))

/** Products that should appear in the public /products listing. */
export const publicProducts: Product[] = products.filter(
  (p) => p.status !== 'internal',
)

/** Products that are actually live (have a real URL) right now. */
export const liveProducts: Product[] = products.filter(
  (p) => p.externalUrl !== null,
)

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getFeaturedProduct(): Product | undefined {
  return products.find((p) => p.featured)
}
