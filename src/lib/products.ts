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
  externalUrl: string | null
  waitlistEnabled: boolean
  story: string
  featured: boolean
  highlight: string
}

export const products: Product[] = [
  {
    slug: 'francaisiq',
    name: 'FrançaisIQ',
    tagline: 'French exam prep for TEF Canada / Express Entry.',
    status: 'live',
    description:
      'French exam prep for TEF Canada / Express Entry',
    longDescription: `FrançaisIQ prepares candidates for the TEF Canada exam required for Express Entry immigration. The platform covers all four exam sections — Compréhension Orale, Compréhension Écrite, Expression Orale, and Expression Écrite — with deterministic scoring engines that evaluate responses without any AI API calls at runtime.

The original AI prototype relied on 25+ Gemini API calls per session with an exposed API key. We rebuilt the entire system with 9 deterministic scoring engines, pre-validated lookup tables, and the Web Speech API for pronunciation assessment. The result: 4,000+ practice items running at $0 per interaction.`,
    features: [
      '4,000+ practice items across all four TEF Canada sections',
      '9 deterministic scoring engines — zero AI at runtime',
      'Web Speech API integration for pronunciation assessment',
      'CLB level mapping aligned to IRCC requirements',
      'Progress tracking with section-by-section analytics',
      'Spaced repetition for vocabulary retention',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Web Speech API', 'Supabase', 'Vercel'],
    buildTime: 'Live — deployed at tef.milliondollarstudio.ai',
    externalUrl: 'https://tef.milliondollarstudio.ai',
    waitlistEnabled: false,
    story:
      'The original prototype used 25+ Gemini API calls and had an exposed key. We rebuilt with 9 deterministic scoring engines and lookup tables. 100% of scoring now runs at $0.',
    featured: true,
    highlight: '4,000+ practice items, 9 deterministic scoring engines, zero AI at runtime',
  },
  {
    slug: 'jyotishai',
    name: 'JyotishAI',
    tagline: 'Vedic astrology for professional astrologers.',
    status: 'in-development',
    description:
      'Vedic astrology for professional astrologers',
    longDescription: `JyotishAI is a desktop application for professional Vedic astrologers who need offline capability and astronomical-grade precision. Built with Tauri v2 and a Python FastAPI sidecar running Swiss Ephemeris, the engine performs complete kundali generation — including all 16 divisional charts, Shadbala planetary strength analysis, Ashtakavarga calculations, and Vimshottari dasha timelines — entirely offline in a 75MB self-contained package.

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
    externalUrl: null,
    waitlistEnabled: true,
    story:
      'Professional astrologers in India need offline capability and precision. We built a 75MB self-contained engine with Swiss Ephemeris — the same library used by astronomical observatories — wrapped in a Tauri v2 desktop shell.',
    featured: false,
    highlight: '50+ yoga calculations, 16 divisional charts, Swiss Ephemeris, 75MB offline engine',
  },
  {
    slug: 'chemai',
    name: 'ChemAI',
    tagline: 'Chemistry education for Indian JEE/NEET students.',
    status: 'built',
    description:
      'Chemistry education for Indian JEE/NEET students',
    longDescription: `ChemAI is a chemistry education platform targeting Indian students preparing for JEE and NEET competitive exams. The core innovation is the blueprint exam paper generation engine — it constructs complete, exam-accurate practice papers from a pre-validated question bank, matching the exact topic distribution, difficulty curve, and question-type mix of real exams.

The platform uses FSRS (Free Spaced Repetition Scheduler) for optimized review scheduling and a deterministic scoring engine for instant grading. All 130 tests pass. No AI API calls at test time.`,
    features: [
      'Blueprint engine generates exam-accurate practice papers',
      'FSRS spaced repetition for optimized study scheduling',
      'Deterministic scoring — instant grading, zero AI cost',
      'Topic-wise and chapter-wise practice modes',
      'Performance analytics with weakness identification',
      'Complete JEE/NEET chemistry syllabus coverage',
    ],
    techStack: ['Next.js', 'TypeScript', 'Python', 'SQLite', 'FSRS', 'Tailwind CSS'],
    buildTime: 'Built — 130/130 tests passing, pending deployment',
    externalUrl: null,
    waitlistEnabled: true,
    story:
      'Indian competitive exam prep is a $10B+ market running on outdated methods. We built a blueprint engine that generates exam-accurate papers deterministically — no AI needed at test time.',
    featured: false,
    highlight: 'Blueprint exam paper generation, FSRS spaced repetition, 130/130 tests passing',
  },
  {
    slug: 'atlas',
    name: 'ATLAS',
    tagline: 'Cross-border tax intelligence for Indian newcomers to Canada.',
    status: 'built',
    description:
      'Cross-border tax intelligence for Indian newcomers to Canada',
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
    externalUrl: null,
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
      "Canada's rental intelligence platform",
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
    externalUrl: null,
    waitlistEnabled: true,
    story:
      'Canadian rental laws vary by province and change annually. We are encoding all 13 regulatory frameworks as deterministic rule engines — no AI guessing at tenant rights.',
    featured: false,
    highlight: '13 provincial regulatory frameworks as rule engines, investment analysis',
  },
  {
    slug: 'jobflow',
    name: 'JobFlow',
    tagline: 'Job application automation pipeline.',
    status: 'internal',
    description:
      'Job application automation pipeline',
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
    externalUrl: null,
    waitlistEnabled: false,
    story:
      'Built as an internal tool to automate the repetitive parts of job applications. Not productized — but it demonstrates the deterministic-first approach applied to personal workflows.',
    featured: false,
    highlight: 'Internal tooling, automated application pipeline',
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getFeaturedProduct(): Product | undefined {
  return products.find((p) => p.featured)
}
