'use client'

import { motion } from 'framer-motion'
import {
  ClipboardCheck,
  BarChart3,
  TrendingUp,
  Map,
  MessageSquare,
  Search,
  FileText,
  Route,
  Check,
} from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Accordion } from '@/components/ui/Accordion'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { SplitText } from '@/components/ui/SplitText'
import { Badge } from '@/components/ui/Badge'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'

const deliverables = [
  {
    icon: ClipboardCheck,
    title: 'Process & Data Audit',
    description:
      'We map every workflow, data flow, and manual bottleneck in your operations. You see exactly where time and money are leaking.',
  },
  {
    icon: BarChart3,
    title: 'Opportunity Scoring Matrix',
    description:
      'Each AI opportunity is scored by impact, feasibility, and cost. You get a ranked list of what to build first.',
  },
  {
    icon: TrendingUp,
    title: 'ROI Projections',
    description:
      'Conservative, expected, and optimistic revenue and cost-savings estimates for every identified opportunity.',
  },
  {
    icon: Map,
    title: 'Implementation Roadmap',
    description:
      'A phased plan with timelines, resource requirements, and dependencies. You know exactly what to do next.',
  },
]

const processSteps = [
  {
    icon: MessageSquare,
    step: '01',
    title: 'Kickoff',
    description: 'Intake questionnaire and a 30-minute call to understand your business and goals.',
  },
  {
    icon: Search,
    step: '02',
    title: 'Analysis',
    description:
      'We audit your processes, data, and team workflows to identify every AI opportunity.',
  },
  {
    icon: FileText,
    step: '03',
    title: 'Report',
    description:
      'You receive a detailed report with scored opportunities, ROI projections, and findings.',
  },
  {
    icon: Route,
    step: '04',
    title: 'Roadmap',
    description:
      'A prioritized implementation plan with timelines, costs, and recommended next steps.',
  },
]

const pricingTiers = [
  {
    name: 'Starter',
    price: '$500',
    description: 'For small businesses exploring AI for the first time.',
    features: [
      'Single department audit',
      'Up to 5 process reviews',
      'Opportunity scoring matrix',
      'Summary report with top 3 recommendations',
      '30-minute debrief call',
    ],
    recommended: false,
  },
  {
    name: 'Standard',
    price: '$1,000',
    description: 'The most popular choice. Comprehensive cross-functional analysis.',
    features: [
      'Multi-department audit',
      'Up to 15 process reviews',
      'Full opportunity scoring matrix',
      'ROI projections per opportunity',
      'Implementation roadmap',
      '60-minute debrief call',
      'Stakeholder interviews (up to 5)',
    ],
    recommended: true,
  },
  {
    name: 'Deep Dive',
    price: '$2,000',
    description: 'For complex organizations needing enterprise-grade analysis.',
    features: [
      'Full organization audit',
      'Unlimited process reviews',
      'Competitive AI landscape analysis',
      'Detailed ROI models with scenarios',
      'Phased implementation roadmap',
      'Technical architecture recommendations',
      'Stakeholder interviews (up to 12)',
      '2x debrief sessions',
    ],
    recommended: false,
  },
]

const faqItems = [
  {
    question: 'How long does an AI Audit take?',
    answer:
      'Starter audits deliver in 3-5 business days. Standard audits in 1 week. Deep Dive audits in 1-2 weeks depending on the complexity of your operations.',
  },
  {
    question: 'What do I need to prepare?',
    answer:
      'We send a brief intake questionnaire before kickoff. Beyond that, we just need access to the people and processes we are auditing. No technical setup required on your end.',
  },
  {
    question: 'What is the difference between the free assessment and the paid AI Audit?',
    answer:
      'The free assessment is a quick 5-page opportunity report based on your form responses. The paid AI Audit is a deep-dive engagement where we analyze your actual operations, interview stakeholders, and deliver a detailed implementation roadmap with ROI projections.',
  },
  {
    question: 'Can the audit cost be applied to a future project?',
    answer:
      'Yes. If you proceed with any implementation project within 60 days, 100% of the audit fee is credited toward the project cost.',
  },
  {
    question: 'What industries do you work with?',
    answer:
      'We have audited businesses across fintech, e-commerce, professional services, healthcare, and education. The methodology applies to any business with repeatable processes.',
  },
]

export function AuditContent() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'AI Audit' },
          ]}
        />

        {/* Hero */}
        <section className="text-center mb-20">
          <ScrollReveal>
            <Badge variant="ai" className="mb-4">
              Most clients start here
            </Badge>
          </ScrollReveal>
          <SplitText
            as="h1"
            preset="blur-in"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text-primary"
          >
            AI Audit
          </SplitText>
          <ScrollReveal delay={0.2}>
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              A comprehensive analysis of your operations, processes, and data.
              We find every AI opportunity and show you exactly what to build first.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-accent-gold font-heading text-2xl font-semibold mt-6">
              From $500
            </p>
          </ScrollReveal>
        </section>

        <SectionDivider variant="gold" className="mb-20" />

        {/* Deliverables */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-20"
        >
          <motion.h2
            variants={fadeUpVariant}
            className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4 text-center"
          >
            What You Get
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="text-text-secondary text-center mb-12 max-w-xl mx-auto"
          >
            Every audit delivers actionable intelligence, not generic advice.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deliverables.map((item) => (
              <motion.div key={item.title} variants={fadeUpVariant}>
                <GlassCard padding="lg">
                  <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center mb-4">
                    <item.icon size={24} className="text-accent-blue" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {item.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <SectionDivider variant="subtle" className="mb-20" />

        {/* Process */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-20"
        >
          <motion.h2
            variants={fadeUpVariant}
            className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-12 text-center"
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <motion.div key={step.step} variants={fadeUpVariant} className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent-purple/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-mono text-sm font-bold text-accent-purple">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-heading text-base font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <SectionDivider variant="blue" className="mb-20" />

        {/* Pricing */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-20"
        >
          <motion.h2
            variants={fadeUpVariant}
            className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4 text-center"
          >
            Pricing
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="text-text-secondary text-center mb-12 max-w-xl mx-auto"
          >
            Fixed pricing. No hourly billing. No surprises.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <motion.div key={tier.name} variants={fadeUpVariant}>
                <GlassCard
                  padding="lg"
                  className={`h-full flex flex-col ${
                    tier.recommended ? 'ring-2 ring-accent-blue' : ''
                  }`}
                >
                  {tier.recommended && (
                    <Badge variant="hybrid" className="mb-3 self-start">
                      Most Popular
                    </Badge>
                  )}
                  <h3 className="font-heading text-xl font-bold text-text-primary mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-accent-gold font-heading text-2xl font-bold mb-3">
                    {tier.price}
                  </p>
                  <p className="text-text-secondary text-sm mb-6">{tier.description}</p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check
                          size={16}
                          className="text-emerald-400 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    href="/contact"
                    variant={tier.recommended ? 'primary' : 'secondary'}
                    size="md"
                    className="w-full"
                  >
                    Book {tier.name} Audit
                  </Button>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <SectionDivider variant="subtle" className="mb-20" />

        {/* FAQ */}
        <ScrollReveal className="mb-20">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion items={faqItems} />
        </ScrollReveal>

        {/* Example Project */}
        <ScrollReveal className="mb-20">
          <GlassCard padding="lg">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4">
              Example Project
            </h2>
            <p className="text-text-secondary text-base leading-relaxed">
              We audited our own TEF exam prep platform and found 22 unnecessary AI API calls. We eliminated them, reducing costs from ~$450/month to &lt;$5/month at 5,000 users.
            </p>
          </GlassCard>
        </ScrollReveal>

        {/* Bottom CTA */}
        <ScrollReveal>
          <section className="text-center bg-bg-secondary border border-border-custom rounded-2xl p-12 md:p-16">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4">
              Ready to find your AI opportunities?
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Most clients start with the audit. It pays for itself in the first recommendation alone.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Book Your AI Audit
            </Button>
            <p className="text-text-tertiary text-sm mt-3">
              100% of the audit fee credited toward implementation projects.
            </p>
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}
