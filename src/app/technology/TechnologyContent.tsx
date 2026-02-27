'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'
import { TECH_CAPABILITIES } from '@/lib/constants'

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
    label: 'Tier 1: Templates & Rules',
    cost: '$0.00/call',
    percentage: 70,
    color: 'bg-accent-primary',
    description: 'Pre-computed templates, lookup tables, cached results. Zero API cost.',
  },
  {
    label: 'Tier 2: Rule Engine',
    cost: '~$0.001/call',
    percentage: 25,
    color: 'bg-accent-end',
    description: 'Business logic, validation, transformations. Near-zero cost.',
  },
  {
    label: 'Tier 3: AI API',
    cost: '$0.01/call',
    percentage: 5,
    color: 'bg-cta-primary',
    description: 'Only the 5% that genuinely needs intelligence touches an AI model.',
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
              <span className="text-sm font-mono text-accent-primary">{tier.cost}</span>
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
    title: 'Data Ingestion',
    description: 'Raw data enters the pipeline. Documents, APIs, user inputs — any format.',
  },
  {
    step: '02',
    title: 'Deterministic Processing',
    description: 'Templates, rules, and computations handle 95% of the work. No AI needed.',
  },
  {
    step: '03',
    title: 'AI Augmentation',
    description: 'Only genuinely ambiguous cases route to an AI model. 5% of total volume.',
  },
  {
    step: '04',
    title: 'Quality Assurance',
    description: 'Automated validation checks every output. Confidence scores gate delivery.',
  },
  {
    step: '05',
    title: 'Delivery',
    description: 'Clean, structured output. API, dashboard, email — whatever the use case needs.',
  },
]

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
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
              Our Approach
            </span>
            <h1 className="text-text-primary mb-6">
              Most AI companies call an API{' '}
              <span className="text-text-tertiary">and charge you for it.</span>
            </h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4">
              We compute 95% of the answer before AI touches anything.
            </p>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed">
              The result: systems that cost{' '}
              <span className="text-cta-primary font-semibold">$60/month</span> to run at 5,000 users.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Three-Tier Cost Model */}
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
              The three-tier cost model
            </h2>
            <p className="text-text-secondary text-lg max-w-prose">
              Every MDS system uses a deterministic-first architecture.
              AI is the last resort, not the first.
            </p>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <CostVisualization />

            <div className="p-8 rounded-2xl border border-border-custom bg-bg-primary">
              <h3 className="font-heading text-lg font-semibold text-text-primary mb-4">
                Cost comparison
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border-custom">
                  <span className="text-text-secondary">Typical AI startup</span>
                  <span className="font-mono text-text-primary">$2,000–$10,000/mo</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border-custom">
                  <span className="text-text-secondary">MDS deterministic-first</span>
                  <span className="font-mono text-cta-primary font-semibold">$60–$200/mo</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-text-secondary">Savings</span>
                  <span className="font-mono text-accent-emerald font-semibold">
                    <AnimatedCounter target={95} suffix="%" />
                  </span>
                </div>
              </div>
              <p className="text-text-tertiary text-xs mt-4">
                Based on 5,000 monthly active users with deterministic-first architecture.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* MIDAS Framework */}
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
              The MIDAS Framework
            </h2>
            <p className="text-text-secondary text-lg max-w-prose">
              Our internal framework for building production AI systems.
              Every product and client system runs on this pipeline.
            </p>
          </motion.div>

          <div className="space-y-4">
            {midasSteps.map((step) => (
              <motion.div
                key={step.step}
                variants={fadeUpVariant}
                className="group flex items-start gap-6 p-6 rounded-2xl border border-border-custom bg-bg-secondary hover:border-border-visible transition-colors"
              >
                <span className="font-mono text-2xl font-bold text-bg-hover group-hover:text-accent-primary transition-colors shrink-0">
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
              Tech stack
            </h2>
            <p className="text-text-secondary text-lg max-w-prose">
              Battle-tested tools. No hype-driven choices.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(TECH_CAPABILITIES).map(([category, techs]) => (
              <motion.div
                key={category}
                variants={fadeUpVariant}
                className="p-6 rounded-2xl border border-border-custom bg-bg-primary"
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
      <section className="py-24 px-6">
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
              Want to see what it can do for your business?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/products" variant="primary" size="lg">
                See Our Products
                <ArrowRight size={18} />
              </Button>
              <Button href="/free-audit" variant="secondary" size="lg">
                Get a Free AI Audit
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
