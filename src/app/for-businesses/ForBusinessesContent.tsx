'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check, X, Shield, Zap, Package } from 'lucide-react'
import { SERVICE_TIERS } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SplitText } from '@/components/ui/SplitText'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'

const tierDetails = [
  {
    label: 'AI Audit',
    href: '/services/audit',
    price: '$500 \u2013 $2K',
    description: "We'll find where your AI costs are hiding and map every opportunity to cut them.",
    icon: Shield,
  },
  {
    label: 'AI Launchpad',
    href: '/services/launchpad',
    price: '$3K \u2013 $5K',
    description: 'Working AI system in 2\u20134 weeks. Full code ownership on delivery.',
    icon: Zap,
  },
  {
    label: 'Growth Engine',
    href: '/services/growth',
    price: '$3K \u2013 $8K/mo',
    description: 'Monthly AI systems development. New capabilities every sprint.',
    icon: ArrowRight,
  },
  {
    label: 'Full Stack Build',
    href: '/services/enterprise',
    price: '$10K \u2013 $50K',
    description: 'Enterprise deterministic-first systems. Complete architecture, complete ownership.',
    icon: Package,
  },
]

const processSteps = [
  {
    step: '01',
    title: 'Discovery Call',
    description:
      'We map your current AI spend, identify deterministic opportunities, and scope the build.',
  },
  {
    step: '02',
    title: 'Architecture & Build',
    description:
      'We build your system with the deterministic-first methodology. Weekly demos. No surprises.',
  },
  {
    step: '03',
    title: 'You Own Everything',
    description:
      'Full code transfer. Full documentation. Your system. Your margins. Your data.',
  },
]

export function ForBusinessesContent() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'For Businesses' },
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
              AI Systems You Own
            </SplitText>
          </motion.div>
          <motion.p
            variants={fadeUpVariant}
            className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
          >
            Your AI system. Your margins. Your data. We build custom AI systems
            with 99.8% gross margins. Same intelligence. Fraction of the cost.
          </motion.p>
        </motion.section>

        {/* Cost Comparison */}
        <ScrollReveal className="mb-24">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary text-center mb-12">
            The Cost Problem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <GlassCard padding="lg">
              <h3 className="font-heading text-lg font-semibold text-text-primary mb-6">
                Traditional AI
              </h3>
              <ul className="space-y-4">
                {[
                  '$0.01\u2013$0.10 per interaction',
                  'Vendor lock-in',
                  'Recurring API fees',
                  'Costs scale with users',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-text-secondary text-sm">
                    <X size={16} className="text-red-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
            <GlassCard padding="lg" className="border-accent-blue/30">
              <h3 className="font-heading text-lg font-semibold text-text-primary mb-6">
                MDS Deterministic-First
              </h3>
              <ul className="space-y-4">
                {[
                  '$0.00 per interaction',
                  'Full code ownership',
                  'One-time build cost',
                  'Costs stay flat',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-text-secondary text-sm">
                    <Check size={16} className="text-accent-emerald mt-0.5 flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </ScrollReveal>

        <SectionDivider variant="blue" className="mb-24" />

        {/* Service Tiers */}
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
            Service Tiers
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="text-text-secondary text-center mb-12 max-w-2xl mx-auto"
          >
            From a quick audit to a full enterprise build. Pick what fits.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tierDetails.map((tier) => (
              <motion.div key={tier.label} variants={fadeUpVariant}>
                <GlassCard padding="lg" className="h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center">
                      <tier.icon size={20} className="text-accent-blue" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-text-primary">
                        {tier.label}
                      </h3>
                      <span className="text-accent-gold text-sm font-medium">
                        {tier.price}
                      </span>
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                    {tier.description}
                  </p>
                  <Button href={tier.href} variant="secondary" size="sm">
                    Learn More
                    <ArrowRight size={14} />
                  </Button>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <SectionDivider variant="subtle" className="mb-24" />

        {/* Process */}
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
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {processSteps.map((step) => (
              <motion.div key={step.step} variants={fadeUpVariant} className="text-center">
                <span className="inline-block font-heading text-4xl font-bold gradient-text mb-4">
                  {step.step}
                </span>
                <h3 className="font-heading text-lg font-semibold text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Bottom CTA */}
        <ScrollReveal>
          <section className="text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4">
              Ready to start?
            </h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto">
              Not sure what you need? Start with a free assessment. Ready to scope a
              build? Send us a structured project brief.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/free-assessment" variant="cta" size="lg">
                Get a Free Assessment
                <ArrowRight size={16} />
              </Button>
              <Button href="/intake" variant="secondary" size="lg">
                Start a Project
                <ArrowRight size={16} />
              </Button>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}
