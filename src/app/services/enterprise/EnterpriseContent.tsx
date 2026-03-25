'use client'

import { motion } from 'framer-motion'
import {
  Cpu,
  Code2,
  CloudUpload,
  GraduationCap,
  Headphones,
  FileSearch,
  Layers,
  Rocket,
  ShieldCheck,
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
    icon: Cpu,
    title: 'Custom AI Architecture',
    description:
      'System design tailored to your requirements. We architect for performance, scalability, and maintainability from day one.',
  },
  {
    icon: Code2,
    title: 'Full Development',
    description:
      'End-to-end implementation. Frontend, backend, AI models, data pipelines, and integrations. Production-grade code with tests.',
  },
  {
    icon: CloudUpload,
    title: 'Deployment & Infrastructure',
    description:
      'We deploy to your cloud or ours. CI/CD pipelines, monitoring, and documentation. Your system runs reliably from day one.',
  },
  {
    icon: GraduationCap,
    title: 'Training & Knowledge Transfer',
    description:
      'Your team learns the system inside out. Technical documentation, video walkthroughs, and hands-on training sessions.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description:
      'Direct communication channel with the engineering team. Post-launch support period included in every tier.',
  },
]

const processSteps = [
  {
    icon: FileSearch,
    step: '01',
    title: 'Discovery',
    description:
      'Requirements gathering, stakeholder interviews, and technical assessment. We deliver a detailed scope document.',
  },
  {
    icon: Layers,
    step: '02',
    title: 'Architecture',
    description:
      'System design, tech stack selection, and integration planning. You approve the blueprint before we build.',
  },
  {
    icon: Code2,
    step: '03',
    title: 'Development',
    description:
      'Agile sprints with weekly demos. You see progress every week and can steer the build as it takes shape.',
  },
  {
    icon: Rocket,
    step: '04',
    title: 'Launch & Support',
    description:
      'QA, deployment, training, and handoff. Dedicated support period to ensure everything runs smoothly.',
  },
]

const pricingTiers = [
  {
    name: 'Standard',
    price: '$10K \u2013 $20K',
    timeline: '4-6 weeks',
    description: 'For well-defined projects with clear scope.',
    features: [
      'Custom AI system (single domain)',
      'API development and integration',
      'Admin dashboard',
      'Testing and QA',
      'Cloud deployment',
      'Technical documentation',
      'Team training (2 sessions)',
      '30-day post-launch support',
    ],
    recommended: false,
  },
  {
    name: 'Advanced',
    price: '$20K \u2013 $35K',
    timeline: '6-10 weeks',
    description: 'For complex systems with multiple integrations.',
    features: [
      'Multi-domain AI system',
      'Complex data pipeline architecture',
      'Multiple API integrations',
      'Advanced admin with analytics',
      'Role-based access control',
      'Performance optimization',
      'Comprehensive documentation',
      'Team training (4 sessions)',
      '60-day post-launch support',
      'Staging and production environments',
    ],
    recommended: true,
  },
  {
    name: 'Enterprise',
    price: '$35K \u2013 $50K',
    timeline: '8-12 weeks',
    description: 'For mission-critical systems requiring enterprise-grade engineering.',
    features: [
      'Enterprise-scale AI architecture',
      'Custom ML model development',
      'Multi-service microservice architecture',
      'Advanced security and compliance',
      'High-availability infrastructure',
      'Real-time monitoring and alerting',
      'Disaster recovery planning',
      'Full team training program',
      '90-day post-launch support',
      'Dedicated project manager',
      'SLA-backed uptime guarantees',
    ],
    recommended: false,
  },
]

const faqItems = [
  {
    question: 'How do you scope custom projects?',
    answer:
      'We start with a discovery call to understand your requirements, then deliver a detailed scope document with architecture, timeline, milestones, and fixed pricing. No work begins until you approve the scope.',
  },
  {
    question: 'Do I own the intellectual property?',
    answer:
      'Yes. 100% code ownership transfers to you on delivery. No licensing fees. No recurring costs for the system itself. You own everything we build.',
  },
  {
    question: 'What happens if the project scope changes?',
    answer:
      'We handle scope changes through formal change requests with updated pricing and timeline before proceeding. No surprise bills. No unilateral changes.',
  },
  {
    question: 'Can you integrate with our existing systems?',
    answer:
      'Yes. We regularly integrate with ERP systems, CRMs, data warehouses, legacy APIs, and third-party services. We assess integration requirements during scoping.',
  },
  {
    question: 'What about ongoing maintenance after delivery?',
    answer:
      'Every build includes a support period (30-90 days depending on tier). After that, you can self-maintain with our documentation, engage us for ad-hoc support, or transition to a Growth Engine retainer.',
  },
]

export function EnterpriseContent() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Full Stack AI Build' },
          ]}
        />

        {/* Hero */}
        <section className="text-center mb-20">
          <ScrollReveal>
            <Badge variant="premium" className="mb-4">
              Custom builds, 4-12 weeks
            </Badge>
          </ScrollReveal>
          <SplitText
            as="h1"
            preset="blur-in"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text-primary"
          >
            Full Stack AI Build
          </SplitText>
          <ScrollReveal delay={0.2}>
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              When you need serious AI engineering. We design, build, and deploy custom
              AI systems scoped to your exact specifications. You own everything.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-accent-gold font-heading text-2xl font-semibold mt-6">
              From $10K
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
            End-to-end delivery. Not a prototype. Not a proof of concept. Production AI.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deliverables.slice(0, 4).map((item) => (
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
          <motion.div variants={fadeUpVariant} className="mt-6 max-w-md mx-auto">
            <GlassCard padding="lg" className="text-center">
              <div className="w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center mb-4 mx-auto">
                <Headphones size={24} className="text-accent-purple" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                {deliverables[4].title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {deliverables[4].description}
              </p>
            </GlassCard>
          </motion.div>
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
            How We Build
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <motion.div key={step.step} variants={fadeUpVariant} className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent-blue/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-mono text-sm font-bold text-accent-blue">
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
            Fixed pricing after scoping. Milestone-based payments. No hourly billing.
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
                  <p className="text-accent-gold font-heading text-2xl font-bold mb-1">
                    {tier.price}
                  </p>
                  <p className="text-text-tertiary text-xs font-mono mb-3">
                    {tier.timeline}
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
                    Discuss {tier.name} Build
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

        {/* Bottom CTA */}
        <ScrollReveal>
          <section className="text-center bg-bg-secondary border border-border-custom rounded-2xl p-12 md:p-16">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4">
              Ready to build something serious?
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Tell us what you need. We will scope it, price it, and give you a timeline
              within one week.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Discuss Your Project
            </Button>
            <p className="text-text-tertiary text-sm mt-3">
              Free scoping. 100% code ownership. Fixed pricing.
            </p>
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}
