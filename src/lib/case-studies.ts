export interface CaseStudy {
  slug: string
  industry: string
  label: string
  title: string
  subtitle: string
  heroStat: { value: string; label: string }
  challenge: string
  solution: string
  approach: string[]
  results: { metric: string; description: string }[]
  timeline: string
  techUsed: string[]
  insight: { quote: string; attribution: string }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'francaisiq-scoring-engines',
    industry: 'Education',
    label: 'BUILD LOG · FRANCAISIQ',
    title: 'FrançaisIQ: Eliminating 22 AI API Calls',
    subtitle: 'AI prototype had 25+ Gemini API calls and an exposed key. We rebuilt with deterministic scoring engines, lookup tables, and Web Speech API. Result: 100% of scoring at $0.',
    heroStat: { value: '22', label: 'AI calls eliminated' },
    challenge:
      'The original FrançaisIQ prototype was built with 25+ Gemini API calls per session. Every scoring interaction — oral comprehension, reading comprehension, writing evaluation — hit an AI API. The API key was exposed in client-side code. At scale, this architecture would cost thousands per month and posed a security risk. We needed to rebuild scoring from scratch with zero AI dependencies at runtime.',
    solution:
      'We rebuilt the entire scoring pipeline with 9 deterministic scoring engines. Oral comprehension uses pre-validated answer keys with fuzzy matching. Reading comprehension maps responses to scored rubrics. Writing evaluation uses rule-based grammar checking and vocabulary analysis. Pronunciation assessment uses the Web Speech API — a browser-native capability that requires zero API calls. The result: 4,000+ practice items running at $0 per interaction.',
    approach: [
      'Audited the prototype: identified 25+ Gemini API calls, mapped each to its purpose, and classified which could be replaced with deterministic logic (all of them)',
      'Built 9 scoring engines: answer key matching, rubric mapping, grammar rule engine, vocabulary scorer, pronunciation via Web Speech API, CLB level calculator, progress tracker, section scorer, and composite score aggregator',
      'Migrated 4,000+ practice items into structured data format with pre-computed answer keys and scoring rubrics',
      'Deployed to Vercel with Supabase backend — total infrastructure cost: $0/month on free tiers',
    ],
    results: [
      { metric: '22 AI calls eliminated', description: 'Every scoring interaction now runs on deterministic engines — zero API calls at runtime' },
      { metric: '$0 runtime cost', description: 'All scoring, grading, and feedback generated without any AI API calls' },
      { metric: '4,000+ practice items', description: 'Complete TEF Canada coverage across all four exam sections' },
      { metric: 'Live and deployed', description: 'Running at tef.milliondollarstudio.ai — real users, real sessions, $0 AI cost' },
    ],
    timeline: 'Rebuild from AI prototype to deterministic system',
    techUsed: ['Next.js', 'TypeScript', 'Web Speech API', 'Supabase', 'Vercel', 'Tailwind CSS'],
    insight: {
      quote: 'The AI prototype was impressive in a demo. But 25 API calls per session with an exposed key is not a product. We replaced every call with deterministic logic and the scoring is more consistent, faster, and costs nothing to run.',
      attribution: 'Shrish Manglik, MDS',
    },
  },
  {
    slug: 'jyotishai-offline-engine',
    industry: 'Desktop Software',
    label: 'BUILD LOG · JYOTISHAI',
    title: 'JyotishAI: Building a 75MB Offline Astrology Engine',
    subtitle: 'Professional astrologers in India need offline capability. Built with Tauri v2 + Python sidecar + Swiss Ephemeris. Complete kundali generation with zero internet required.',
    heroStat: { value: '50+', label: 'yoga calculations' },
    challenge:
      'Professional Vedic astrologers in India often work in areas with unreliable internet. They need precise planetary calculations — arc-second accuracy from Swiss Ephemeris, not simplified lookup tables. Most astrology software is either cloud-dependent (unusable offline) or uses approximations (unacceptable for professionals). We needed a self-contained desktop application that runs complete kundali generation offline with observatory-grade precision.',
    solution:
      'We built a Tauri v2 desktop application with a Python FastAPI sidecar running Swiss Ephemeris. The sidecar handles all astronomical calculations — planetary positions, house cusps, divisional charts, yogas, dashas — as a local HTTP service on 127.0.0.1:8765. The entire application is 75MB self-contained. Zero internet required for any calculation. AI is available as an optional premium layer for interpretations, but the core engine is pure computation.',
    approach: [
      'Built the Python calculation engine first: Swiss Ephemeris integration, 50+ yoga detection algorithms, Shadbala computation, Ashtakavarga analysis, Vimshottari dasha calculation',
      'Wrapped the engine as a FastAPI sidecar with PyInstaller — runs as a local service that the Tauri frontend communicates with via HTTP',
      'Built the React frontend in Tauri v2 — chart visualization, dasha timelines, divisional chart navigation, compatibility analysis UI',
      'Achieved complete offline operation: ephemeris files bundled in the binary, all calculations local, no network calls for any core feature',
    ],
    results: [
      { metric: '50+ yoga calculations', description: 'Complete yoga detection including Pancha Mahapurusha, Dhana, Raja, and Arishta yogas' },
      { metric: 'Zero internet required', description: 'Swiss Ephemeris files bundled locally — all calculations run offline' },
      { metric: '75MB self-contained', description: 'Complete application with ephemeris data, Python engine, and React UI in one package' },
      { metric: '16 divisional charts', description: 'All Varga charts computed with arc-second precision from Swiss Ephemeris' },
    ],
    timeline: 'Multi-phase desktop application build',
    techUsed: ['Tauri v2', 'React', 'Python', 'FastAPI', 'Swiss Ephemeris', 'PyInstaller', 'SQLite'],
    insight: {
      quote: 'The key decision was separating the calculation engine from the AI layer. The engine is pure math — Swiss Ephemeris, trigonometry, calendar conversions. AI adds interpretation on top, but the calculations must be deterministic and offline-capable.',
      attribution: 'Shrish Manglik, MDS',
    },
  },
  {
    slug: 'chemai-blueprint-engine',
    industry: 'Education',
    label: 'BUILD LOG · CHEMAI',
    title: 'ChemAI: 130 Tests, Zero Failures, One Architecture',
    subtitle: 'JEE/NEET chemistry prep with exam-accurate paper generation. Blueprint engine + FSRS spaced repetition. Complete exam papers from pre-validated question bank.',
    heroStat: { value: '130', label: 'tests passing — zero failures' },
    challenge:
      'Indian JEE and NEET competitive exams have specific patterns: exact topic distributions, difficulty curves, and question-type mixes. Students need practice papers that match real exam structure — not random question sets. Most AI tutoring platforms generate questions dynamically, which means inconsistent difficulty, potential errors in chemistry content, and API costs per paper generated. We needed exam-accurate paper generation at zero marginal cost.',
    solution:
      'We built a blueprint engine that constructs complete practice papers from a pre-validated question bank. The blueprint encodes the exact structure of JEE/NEET chemistry papers — topic weights, difficulty distribution, question types per section. The engine selects questions that match the blueprint constraints, ensuring every generated paper mirrors real exam patterns. FSRS (Free Spaced Repetition Scheduler) handles review scheduling. All 130 tests pass.',
    approach: [
      'Analyzed JEE and NEET exam patterns: mapped topic distributions, difficulty curves, question-type ratios, and section structures across multiple years of past papers',
      'Built the blueprint engine: constraint-based paper generation that selects from pre-validated question bank to match exam structure exactly',
      'Integrated FSRS spaced repetition: tracks student performance and schedules reviews at optimal intervals for retention',
      'Achieved 130/130 test coverage: blueprint generation, scoring, FSRS scheduling, progress tracking — all verified with automated tests',
    ],
    results: [
      { metric: '130/130 tests passing', description: 'Complete test coverage across blueprint generation, scoring, scheduling, and analytics' },
      { metric: 'Blueprint paper generation', description: 'Every practice paper matches real JEE/NEET exam structure — topic weights, difficulty, question types' },
      { metric: '$0 AI cost at test time', description: 'All paper generation and scoring runs on deterministic engines — no API calls per exam' },
      { metric: 'FSRS spaced repetition', description: 'Evidence-based review scheduling optimized for long-term retention of chemistry concepts' },
    ],
    timeline: 'Complete build — pending deployment',
    techUsed: ['Next.js', 'TypeScript', 'Python', 'SQLite', 'FSRS', 'Tailwind CSS', 'pytest'],
    insight: {
      quote: 'AI-generated exam questions have a fundamental problem: you cannot guarantee they are correct without human review. Pre-validated question banks with deterministic selection give you exam-accurate papers every time, at zero marginal cost.',
      attribution: 'Shrish Manglik, MDS',
    },
  },
  {
    slug: 'atlas-tax-intelligence',
    industry: 'Finance',
    label: 'BUILD LOG · ATLAS',
    title: 'ATLAS: Zero LLM Dependencies for Tax Intelligence',
    subtitle: 'Cross-border tax rules are deterministic — AI adds risk. We encoded DTAA treaties and provincial rules as pure computation. 44/44 tests, zero AI costs.',
    heroStat: { value: '44/44', label: 'tests passing' },
    challenge:
      'Indian newcomers to Canada face complex cross-border tax obligations: DTAA treaty provisions, provincial tax variations, NRI/OCI status implications, and investment income treatment. Most AI tools attempt to "reason" about tax law — but tax rules are deterministic. A treaty article either applies or it does not. A provincial tax rate is a number, not an opinion. Using LLMs for tax calculations introduces hallucination risk in a domain where errors have legal consequences.',
    solution:
      'We encoded the India-Canada DTAA treaty and all provincial tax rules as pure computation. Every treaty article, every provincial rate, every residency determination rule is a function — input conditions, output determination. No ambiguity, no hallucination, no API costs. The engine handles DTAA analysis, provincial comparison, residency status, and investment optimization. 44/44 tests pass with zero LLM dependencies.',
    approach: [
      'Mapped the India-Canada DTAA treaty article by article: identified every conditional rule, exemption, and rate determination as a computable function',
      'Encoded all 13 Canadian provincial/territorial tax rates and brackets as lookup tables with annual update capability',
      'Built residency status determination engine: factored in days-of-presence tests, tie-breaker rules, and deemed residency provisions',
      'Achieved 44/44 test coverage: treaty analysis, provincial comparison, residency determination, investment optimization — all verified',
    ],
    results: [
      { metric: '44/44 tests passing', description: 'Complete test coverage across treaty analysis, provincial comparison, and residency determination' },
      { metric: 'Zero LLM dependencies', description: 'Every calculation runs on pure deterministic logic — no AI API calls, no hallucination risk' },
      { metric: 'Submitted to Wealthsimple', description: 'Application submitted to Wealthsimple accelerator program for distribution partnership' },
      { metric: 'DTAA treaty encoded', description: 'Complete India-Canada Double Taxation Avoidance Agreement as computable rules' },
    ],
    timeline: 'Complete build — submitted to Wealthsimple',
    techUsed: ['Python', 'FastAPI', 'Pydantic', 'pytest'],
    insight: {
      quote: 'Tax law is not a natural language problem. Article 10 of the DTAA says dividends are taxed at 15% or 25% depending on ownership percentage. That is an if-else statement, not a prompt. We built it as one.',
      attribution: 'Shrish Manglik, MDS',
    },
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}
