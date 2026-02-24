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
    slug: 'invoice-processing-automation',
    industry: 'Financial Services',
    label: 'CAPABILITY DEMO · DOCUMENT AI',
    title: 'AI Invoice Processing: From PDF to Structured Data',
    subtitle: 'How we built an AI extraction pipeline that processes invoices with 99%+ accuracy — entirely on-premise',
    heroStat: { value: '99%+', label: 'extraction accuracy on test invoices' },
    challenge:
      'Mid-size accounting firms process hundreds of invoices monthly by hand. Data entry staff spend 10+ hours per week copying line items from PDFs into accounting software. Error rates increase with volume, and the work is exactly the kind of repetitive, structured task that AI handles well. We built this system to demonstrate what document AI can do for financial services.',
    solution:
      'We designed and built a custom AI extraction pipeline that reads invoices (PDF, image, email attachment), identifies line items, validates totals, and outputs structured data ready for accounting system import. The architecture runs entirely on-premise — no document data leaves the client\'s network.',
    approach: [
      'Phase 1: Analyzed 200+ sample invoices across 15 vendor formats to map structural variations and edge cases',
      'Phase 2: Built extraction pipeline using Claude API + deterministic validation rules. Template matching handles known formats; AI handles novel layouts',
      'Phase 3: Integrated with QuickBooks API for direct data push. Deployed as Docker container for on-premise hosting',
    ],
    results: [
      { metric: '99%+ extraction accuracy', description: 'Tested across 15 vendor invoice formats with varying layouts' },
      { metric: '~10 hours/week recoverable', description: 'Estimated time savings based on typical 500-invoice monthly volume' },
      { metric: '100% on-premise', description: 'Zero invoice data leaves the client network — critical for financial compliance' },
      { metric: 'Automatic edge-case flagging', description: 'System flags low-confidence extractions for human review instead of guessing' },
    ],
    timeline: '2-week build cycle',
    techUsed: ['Claude API', 'Python', 'FastAPI', 'QuickBooks API', 'Docker', 'On-premise deployment'],
    insight: {
      quote: 'The key insight: 95% of invoices follow predictable formats. Deterministic template matching handles those perfectly. AI only kicks in for the remaining 5% — keeping costs near zero and accuracy near 100%.',
      attribution: 'Shrish Manglik, MDS',
    },
  },
  {
    slug: 'candidate-matching-system',
    industry: 'Healthcare',
    label: 'CAPABILITY DEMO · PRIVACY-FIRST AI',
    title: 'Privacy-First AI Recruitment for Healthcare',
    subtitle: 'An on-premise candidate matching system built for HIPAA-regulated environments',
    heroStat: { value: '100%', label: 'on-premise — zero cloud dependency' },
    challenge:
      'Healthcare staffing agencies review hundreds of resumes weekly for nursing and allied health positions. Placement cycles average 2-3 weeks — too slow when top candidates get hired in days. Cloud-based AI tools are often ruled out by HIPAA requirements. We built this system to prove that privacy-first AI can match or beat cloud solutions.',
    solution:
      'We designed an end-to-end AI recruitment system: resume parsing, skills extraction, candidate-to-role matching, and scheduling optimization. Every component runs on the client\'s own infrastructure — zero data leaves their network. The system surfaces the top candidates for each role in minutes instead of days.',
    approach: [
      'Phase 1: Mapped a typical staffing workflow (47 discrete steps) and identified the 12 highest-impact automation points',
      'Phase 2: Built AI resume parser + skills extraction engine. Created matching algorithm weighted by certifications, availability, location, and placement history',
      'Phase 3: Integrated with standard ATS systems via custom API bridge. Built scheduling optimizer for shift matching. Packaged for on-premise deployment with encrypted storage',
    ],
    results: [
      { metric: 'Minutes instead of days', description: 'Candidate shortlisting that previously took 2-3 days happens in under 5 minutes' },
      { metric: '100% on-premise', description: 'All candidate data stays on client infrastructure — full HIPAA compliance by design' },
      { metric: 'Handles 200+ resumes/week', description: 'Tested at typical staffing agency volumes without performance degradation' },
      { metric: 'Pluggable ATS integration', description: 'Custom API bridge connects to existing applicant tracking systems' },
    ],
    timeline: '6-week build cycle',
    techUsed: ['Python', 'LangChain', 'Claude API (self-hosted proxy)', 'PostgreSQL', 'On-premise deployment', 'Custom ATS integration'],
    insight: {
      quote: 'Privacy-first doesn\'t mean capability-second. Running AI on-premise actually simplifies the architecture — no network latency, no data transfer agreements, no cloud vendor lock-in.',
      attribution: 'Shrish Manglik, MDS',
    },
  },
  {
    slug: 'contract-analysis-platform',
    industry: 'Legal Tech',
    label: 'CAPABILITY DEMO · FULL PRODUCT BUILD',
    title: 'AI Contract Analysis: From Concept to Production',
    subtitle: 'A full-stack legal tech product with clause extraction, risk scoring, and contract comparison',
    heroStat: { value: '95%', label: 'clause detection accuracy across 4 contract types' },
    challenge:
      'Legal teams spend hours reviewing contracts clause-by-clause for risk, compliance issues, and missing terms. Junior associates do the initial review, senior partners do the final sign-off. The initial review is the bottleneck — it\'s time-intensive, repetitive, and error-prone at volume. We built this to demonstrate full product development capability.',
    solution:
      'We designed and built a complete contract analysis web application: upload a contract, get instant clause-by-clause analysis, risk scoring, and comparison against a benchmark library. The system handles NDAs, MSAs, employment agreements, and vendor contracts. Built with a scalable architecture ready for SaaS deployment.',
    approach: [
      'Month 1: Product discovery and architecture design. Defined 4 contract types as MVP scope. Designed the AI pipeline for clause extraction and risk scoring',
      'Month 2-3: Iterative build — web app (Next.js), AI pipeline (Python/FastAPI/Claude), clause library, risk scoring algorithm. Weekly iteration cycles',
      'Month 4: Production deployment on AWS with SOC 2-ready infrastructure. Load testing, security audit, and documentation',
    ],
    results: [
      { metric: '95% clause detection accuracy', description: 'Across 4 contract types (NDA, MSA, Employment, Vendor) on test datasets' },
      { metric: 'Full SaaS architecture', description: 'Multi-tenant, scalable, with Stripe billing and user management built in' },
      { metric: 'SOC 2-ready infrastructure', description: 'Deployed on AWS with encryption at rest and in transit, audit logging, access controls' },
      { metric: '4-month concept-to-production', description: 'Complete product from blank repo to production deployment' },
    ],
    timeline: '4 months (full product build)',
    techUsed: ['Next.js', 'Python', 'FastAPI', 'Claude API', 'AWS', 'PostgreSQL', 'Redis', 'Stripe'],
    insight: {
      quote: 'The hardest part of legal AI isn\'t the AI — it\'s the domain modeling. Contract structures vary wildly. We spent 40% of the project on understanding legal document patterns before writing a single line of AI code.',
      attribution: 'Shrish Manglik, MDS',
    },
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}
