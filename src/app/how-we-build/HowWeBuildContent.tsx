'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Database, Cpu, Sparkles } from 'lucide-react'
import { TECH_CAPABILITIES } from '@/lib/constants'
import { caseStudies } from '@/lib/case-studies'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SplitText } from '@/components/ui/SplitText'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'

const tiers = [
  {
    icon: Database,
    title: 'Tier 1: Templates & Lookups',
    cost: '$0.00',
    share: '90% of interactions',
    description:
      'Pre-computed answers, validated lookup tables, cached results. No computation needed at runtime.',
    color: 'text-accent-emerald',
    bgColor: 'bg-accent-emerald/10',
  },
  {
    icon: Cpu,
    title: 'Tier 2: Rules & Pattern Matching',
    cost: '~$0.001',
    share: '5% of interactions',
    description:
      'Business logic, scoring engines, deterministic calculations. Light computation, zero AI.',
    color: 'text-accent-gold',
    bgColor: 'bg-accent-gold/10',
  },
  {
    icon: Sparkles,
    title: 'Tier 3: AI API (Last Resort)',
    cost: '$0.01\u2013$0.02',
    share: '<5% of interactions',
    description:
      'Only for genuinely creative synthesis where deterministic logic cannot produce the answer.',
    color: 'text-accent-purple',
    bgColor: 'bg-accent-purple/10',
  },
]

const techCategories = Object.entries(TECH_CAPABILITIES) as [
  string,
  readonly string[],
][]

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  desktop: 'Desktop',
  backend: 'Backend',
  infrastructure: 'Infrastructure',
  payments: 'Payments',
  ai: 'AI (Build Only)',
}

export function HowWeBuildContent() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'How We Build' },
          ]}
        />

        {/* Hero */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-24 text-center"
        >
          <motion.div variants={fadeUpVariant}>
            <SplitText as="h1" preset="blur-in" className="text-text-primary mb-6">
              Deterministic-First Architecture
            </SplitText>
          </motion.div>
          <motion.p
            variants={fadeUpVariant}
            className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            95% computed. 5% AI. 100% yours. Here&apos;s how we build systems
            with 99.8% gross margins.
          </motion.p>
        </motion.section>

        {/* Three-Tier Model */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-24"
        >
          <motion.h2
            variants={fadeUpVariant}
            className="font-heading text-2xl md:text-3xl font-bold text-text-primary text-center mb-12"
          >
            The Three-Tier Model
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <motion.div key={tier.title} variants={fadeUpVariant}>
                <GlassCard padding="lg" className="h-full">
                  <div className={`w-12 h-12 rounded-xl ${tier.bgColor} flex items-center justify-center mb-4`}>
                    <tier.icon size={24} className={tier.color} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                    {tier.title}
                  </h3>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className={`text-2xl font-bold ${tier.color}`}>
                      {tier.cost}
                    </span>
                    <span className="text-text-tertiary text-sm">
                      {tier.share}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {tier.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <SectionDivider variant="gold" className="mb-24" />

        {/* Cost at Scale */}
        <ScrollReveal className="mb-24">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary text-center mb-4">
            The Math at 5,000 Users
          </h2>
          <p className="text-text-secondary text-center mb-10 max-w-xl mx-auto">
            Real numbers. No hand-waving.
          </p>
          <GlassCard padding="lg" className="max-w-3xl mx-auto">
            <div className="font-mono text-sm space-y-2 text-text-secondary mb-6">
              <p>5,000 users &times; 4 sessions &times; 5 interactions = <span className="text-text-primary font-semibold">100,000 interactions/month</span></p>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary">Tier 1: 90,000 at $0.00</span>
                <span className="text-accent-emerald font-medium">$0</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary">Tier 2: 5,000 at $0.001</span>
                <span className="text-accent-gold font-medium">$5</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary">Tier 3: 5,000 at $0.01</span>
                <span className="text-accent-purple font-medium">$50</span>
              </div>
            </div>
            <SectionDivider variant="subtle" className="my-6" />
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary">AI cost</span>
                <span className="text-text-primary font-semibold">$55/month</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary">Infrastructure</span>
                <span className="text-text-primary font-semibold">$25/month</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary">Total cost</span>
                <span className="text-text-primary font-bold">~$80/month</span>
              </div>
            </div>
            <SectionDivider variant="gold" className="my-6" />
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary">Revenue at $9.99/user</span>
                <span className="text-accent-gold font-bold">$49,950/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-primary font-semibold">Gross Margin</span>
                <span className="text-2xl font-bold gradient-text">99.8%</span>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <SectionDivider variant="blue" className="mb-24" />

        {/* Tech Stack */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-24"
        >
          <motion.h2
            variants={fadeUpVariant}
            className="font-heading text-2xl md:text-3xl font-bold text-text-primary text-center mb-12"
          >
            Tech Stack
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {techCategories.map(([key, techs]) => (
              <motion.div key={key} variants={fadeUpVariant}>
                <GlassCard padding="md" className="h-full">
                  <h3 className="font-heading text-sm font-semibold text-accent-blue uppercase tracking-wider mb-3">
                    {categoryLabels[key] || key}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono text-text-secondary bg-bg-tertiary border border-border-custom"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <SectionDivider variant="subtle" className="mb-24" />

        {/* Build Logs */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-24"
        >
          <motion.h2
            variants={fadeUpVariant}
            className="font-heading text-2xl md:text-3xl font-bold text-text-primary text-center mb-4"
          >
            Build Logs
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="text-text-secondary text-center mb-12 max-w-xl mx-auto"
          >
            Detailed breakdowns of how we built each product.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.slice(0, 4).map((study) => (
              <motion.div key={study.slug} variants={fadeUpVariant}>
                <GlassCard padding="lg" className="h-full flex flex-col">
                  <span className="text-accent-blue text-xs font-medium uppercase tracking-wider mb-2">
                    {study.industry}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                    {study.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
                    {study.subtitle.slice(0, 120)}
                    {study.subtitle.length > 120 ? '...' : ''}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-accent-gold text-sm font-semibold">
                      {study.heroStat.value} {study.heroStat.label}
                    </span>
                    <Button href={`/case-studies/${study.slug}`} variant="ghost" size="sm">
                      Read
                      <ArrowRight size={14} />
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Bottom CTA */}
        <ScrollReveal>
          <section className="text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4">
              See Our Products
            </h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto">
              These are the products we built with this architecture. Try them for free.
            </p>
            <Button href="/for-people" variant="cta" size="lg">
              See Our Products
              <ArrowRight size={16} />
            </Button>
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}
