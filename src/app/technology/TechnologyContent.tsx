'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 1500
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

const costTiers = [
  {
    label: 'Tier 1: Static & Pre-computed',
    cost: '$0.00/call',
    percentage: 45,
    color: 'bg-accent-blue',
    description: 'Lookup tables, pre-validated answer keys, cached results. Zero API cost.',
  },
  {
    label: 'Tier 2: Light Computation',
    cost: '~$0.001/call',
    percentage: 30,
    color: 'bg-accent-gold',
    description: 'Rule engines, scoring algorithms, deterministic transformations. Near-zero cost.',
  },
  {
    label: 'Tier 3: AI API',
    cost: '~$0.002/call',
    percentage: 25,
    color: 'bg-cta-primary',
    description: 'Only genuinely ambiguous or generative tasks touch an AI model. The minority of volume.',
  },
]

function CostVisualization() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className="space-y-6">
      {costTiers.map((tier, i) => (
        <div key={tier.label}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">{tier.label}</span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-accent-blue">{tier.cost}</span>
              <span className="text-sm font-mono text-text-tertiary">{tier.percentage}%</span>
            </div>
          </div>
          <div className="h-3 rounded-full bg-bg-tertiary overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${tier.color}`}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${tier.percentage}%` } : { width: 0 }}
              transition={{ duration: 1, delay: i * 0.2, ease: [0.25, 0.1, 0, 1] as const }}
            />
          </div>
          <p className="text-xs text-text-tertiary mt-1">{tier.description}</p>
        </div>
      ))}
    </div>
  )
}

const midasSteps = [
  {
    step: '01',
    title: 'Knowledge Manufacturing',
    description: 'AI generates and validates the knowledge corpus during development. Question banks, rule sets, scoring rubrics — built once, used forever.',
  },
  {
    step: '02',
    title: 'Deterministic Engine',
    description: 'Pure computation handles 95% of runtime work. Rule engines, lookup tables, formula evaluation — no AI needed.',
  },
  {
    step: '03',
    title: 'AI Premium Layer',
    description: 'Only genuinely generative or ambiguous tasks route to an AI model. Optional, not required for core functionality.',
  },
  {
    step: '04',
    title: 'Automated Validation',
    description: 'Every output is testable. pytest for engines, vitest for frontends. 90%+ coverage on all engine code.',
  },
  {
    step: '05',
    title: 'Ship & Measure',
    description: 'Deploy to Vercel ($0) or desktop via Tauri. Track real costs per interaction. Prove the margin.',
  },
]

const techStack = {
  'Frontend': ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS'],
  'Desktop': ['Tauri v2', 'React', 'Python FastAPI sidecar'],
  'Database': ['Supabase (PostgreSQL)', 'SQLite (desktop)'],
  'Payments': ['Stripe (CAD)', 'Razorpay (INR)'],
  'Hosting': ['Vercel ($0)', 'Railway ($5/mo)'],
  'AI': ['Used for BUILD, not for RUN'],
}

export function TechnologyContent() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-24 px-6">
        <motion.div
          className="max-w-content mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="max-w-3xl" variants={fadeUpVariant}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-visible bg-bg-secondary/50 text-text-secondary text-sm font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
              Our Approach
            </span>
            <h1 className="text-text-primary mb-6">
              95% Computed. 5% AI.{' '}
              <span className="text-text-tertiary">100% Yours.</span>
            </h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
              We compute 95% of the answer before AI touches anything.
            </p>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed">
              The result: systems that cost{' '}
              <span className="text-cta-primary font-semibold">~$105/month</span> to run at 5,000 users.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* What Deterministic-First Means */}
      <section className="py-24 px-6 bg-bg-secondary">
        <motion.div
          className="max-w-content mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div className="mb-12" variants={fadeUpVariant}>
            <h2 className="text-text-primary mb-4">
              What deterministic-first means
            </h2>
            <p className="text-text-secondary text-lg max-w-prose leading-relaxed">
              When you search Google, the autocomplete doesn&apos;t call AI. It uses a pre-built index.
              When you use a calculator, it doesn&apos;t call AI. It runs math.
              We build AI systems the same way — the AI constructs the intelligence during development,
              then the system runs on pure computation.
            </p>
            <p className="text-text-secondary text-lg max-w-prose leading-relaxed mt-4">
              Like using a crane to build a building. The crane isn&apos;t the building.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Three-Tier Cost Model */}
      <section className="py-24 px-6">
        <motion.div
          className="max-w-content mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div className="mb-16" variants={fadeUpVariant}>
            <h2 className="text-text-primary mb-4">
              The three-tier cost model
            </h2>
            <p className="text-text-secondary text-lg max-w-prose">
              Every MDS system uses a deterministic-first architecture.
              AI is the last resort, not the first.
            </p>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <CostVisualization />

            <div className="p-8 rounded-2xl border border-border-custom bg-bg-secondary">
              <h3 className="font-heading text-lg font-semibold text-text-primary mb-6">
                The math at 5,000 users
              </h3>
              <div className="space-y-3 font-mono text-sm">
                <p className="text-text-secondary">
                  5,000 users x 4 sessions/mo x 5 interactions = <span className="text-text-primary font-semibold">100,000 interactions</span>
                </p>
                <div className="border-t border-border-custom pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Tier 1 (45%) &mdash; 45,000 at $0.00</span>
                    <span className="text-text-primary">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Tier 2 (30%) &mdash; 30,000 at $0.001</span>
                    <span className="text-text-primary">$30.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Tier 3 (25%) &mdash; 25,000 at $0.002</span>
                    <span className="text-text-primary">$50.00</span>
                  </div>
                </div>
                <div className="border-t border-border-custom pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">AI costs</span>
                    <span className="text-text-primary">$80/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Infra (Vercel $0 + Supabase $25)</span>
                    <span className="text-text-primary">$25/mo</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t border-border-custom pt-2">
                    <span className="text-text-primary">Total</span>
                    <span className="text-cta-primary">~$105/mo</span>
                  </div>
                </div>
                <div className="border-t border-border-custom pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Revenue at $9.99/user</span>
                    <span className="text-text-primary">$49,950/mo</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-accent-emerald">Gross margin</span>
                    <span className="text-accent-emerald">
                      <AnimatedCounter target={99} suffix=".8%" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* MIDAS Framework */}
      <section className="py-24 px-6 bg-bg-secondary">
        <motion.div
          className="max-w-content mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div className="mb-16" variants={fadeUpVariant}>
            <h2 className="text-text-primary mb-4">
              The MIDAS Framework
            </h2>
            <p className="text-text-secondary text-lg max-w-prose">
              Our internal framework for building production AI systems.
              Every product runs on this pipeline.
            </p>
          </motion.div>

          <div className="space-y-4">
            {midasSteps.map((step) => (
              <motion.div
                key={step.step}
                variants={fadeUpVariant}
                className="group flex items-start gap-6 p-6 rounded-2xl border border-border-custom bg-bg-primary hover:border-border-visible transition-colors"
              >
                <span className="font-mono text-2xl font-bold text-bg-hover group-hover:text-accent-blue transition-colors shrink-0">
                  {step.step}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-1">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 px-6">
        <motion.div
          className="max-w-content mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div className="mb-16" variants={fadeUpVariant}>
            <h2 className="text-text-primary mb-4">
              Tech stack
            </h2>
            <p className="text-text-secondary text-lg max-w-prose">
              Battle-tested tools. No hype-driven choices.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(techStack).map(([category, techs]) => (
              <motion.div
                key={category}
                variants={fadeUpVariant}
                className="p-6 rounded-2xl border border-border-custom bg-bg-secondary"
              >
                <h3 className="font-heading text-sm font-semibold text-text-tertiary uppercase tracking-wider mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-bg-tertiary text-text-secondary text-sm font-mono border border-border-custom"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-bg-secondary">
        <motion.div
          className="max-w-content mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={fadeUpVariant}>
            <h2 className="text-text-primary mb-4">
              See it in action
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8">
              Every product in our portfolio runs on this architecture.
              See the build logs for real cost data and architecture decisions.
            </p>
            <div className="flex items-center justify-center">
              <Button href="/products" variant="primary" size="lg">
                See Our Products
                <ArrowRight size={18} />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
