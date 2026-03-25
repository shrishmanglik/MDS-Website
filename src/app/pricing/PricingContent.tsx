'use client'

import { motion } from 'framer-motion'
import {
  Check,
  Minus,
  Search,
  Layers,
  Clock,
  Headphones,
  Rocket,
  Building2,
  ShoppingCart,
  ArrowRight,
} from 'lucide-react'
import { SplitText } from '@/components/ui/SplitText'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Accordion } from '@/components/ui/Accordion'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'

const tiers = [
  {
    name: 'AI Audit',
    price: '$500 – $2,000',
    tagline: 'The starting point. Most clients begin here.',
    recommended: true,
    features: [
      { text: 'Comprehensive operations analysis', included: true },
      { text: 'AI opportunity identification', included: true },
      { text: 'ROI projections per opportunity', included: true },
      { text: 'Implementation roadmap', included: true },
      { text: 'Development & deployment', included: false },
      { text: 'Ongoing optimization', included: false },
    ],
    timeline: '1–2 weeks',
    ctaText: 'Book an Audit',
    ctaHref: '/contact',
  },
  {
    name: 'AI Launchpad',
    price: '$3,000 – $5,000',
    tagline: 'Get off the ground with AI at the core.',
    recommended: false,
    features: [
      { text: 'AI-powered website (custom design)', included: true },
      { text: 'SEO optimization', included: true },
      { text: 'Basic marketing automation', included: true },
      { text: 'Brand voice AI training', included: true },
      { text: '30-day post-launch support', included: true },
      { text: 'Ongoing content system', included: false },
    ],
    timeline: '2–3 weeks',
    ctaText: 'Start Your Launch',
    ctaHref: '/contact',
  },
  {
    name: 'Growth Engine',
    price: '$3,000 – $8,000/mo',
    tagline: 'Ongoing AI-powered growth.',
    recommended: false,
    features: [
      { text: 'Everything in Launchpad', included: true },
      { text: 'AI content system (blog, social, email)', included: true },
      { text: 'Monthly AI audit & optimization', included: true },
      { text: 'Performance dashboards', included: true },
      { text: 'Priority support', included: true },
      { text: 'Custom AI system builds', included: false },
    ],
    timeline: 'Ongoing monthly',
    ctaText: 'Accelerate Growth',
    ctaHref: '/contact',
  },
  {
    name: 'Full Stack AI Build',
    price: '$10K – $50K',
    tagline: 'Serious AI engineering, scoped to you.',
    recommended: false,
    features: [
      { text: 'Custom AI system architecture', included: true },
      { text: 'Full development & deployment', included: true },
      { text: 'Process automation', included: true },
      { text: 'Team training & knowledge transfer', included: true },
      { text: 'Dedicated support channel', included: true },
      { text: '100% code ownership', included: true },
    ],
    timeline: '4–8 weeks',
    ctaText: 'Discuss Your Project',
    ctaHref: '/contact',
  },
]

const priceFactors = [
  {
    icon: Search,
    title: 'Scope',
    description:
      'How many workflows, integrations, or user-facing features does the project cover? Larger scope means more engineering.',
  },
  {
    icon: Layers,
    title: 'Complexity',
    description:
      'Custom ML models cost more than API wrappers. Real-time systems cost more than batch jobs. We price for what the problem actually requires.',
  },
  {
    icon: Clock,
    title: 'Timeline',
    description:
      'Need it in two weeks instead of six? Accelerated timelines require focused allocation and carry a premium.',
  },
  {
    icon: Headphones,
    title: 'Support',
    description:
      'One-time delivery vs. ongoing optimization. Growth Engine clients get continuous improvements; one-off builds get 30-day support.',
  },
]

const exampleProjects = [
  {
    icon: ShoppingCart,
    title: 'E-commerce AI Chatbot',
    price: '$4,500',
    tier: 'AI Launchpad',
    description:
      'Product recommendation chatbot integrated with Shopify. Handles 80% of customer queries automatically.',
  },
  {
    icon: Building2,
    title: 'Legal Document Analyzer',
    price: '$28,000',
    tier: 'Full Stack Build',
    description:
      'Custom NLP pipeline that extracts key clauses from contracts, flags risks, and generates summaries for review.',
  },
  {
    icon: Rocket,
    title: 'SaaS Growth System',
    price: '$5,000/mo',
    tier: 'Growth Engine',
    description:
      'Automated content pipeline, lead scoring, and personalized email sequences. 3x qualified leads in 90 days.',
  },
]

const faqItems = [
  {
    question: 'Can I start with the audit and upgrade later?',
    answer:
      'Yes — most clients do exactly that. The AI Audit identifies your best opportunities, and we use those findings to scope the next engagement. Audit fees are credited toward any follow-on project.',
  },
  {
    question: 'Are there any hidden fees?',
    answer:
      'No. Every engagement has a fixed scope and price agreed upfront. If scope changes during the project, we discuss it before any additional cost is incurred.',
  },
  {
    question: 'Do I own the code?',
    answer:
      'Yes. 100% code ownership on every engagement. No licensing, no lock-in, no recurring fees for what we built.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'Bank transfer (ACH/wire), credit card via Stripe (CAD/USD), and Razorpay for INR payments. We invoice 50% upfront and 50% on delivery for project work.',
  },
  {
    question: 'What if my project doesn\'t fit these tiers?',
    answer:
      'These tiers cover 90% of engagements. If your project is unusual, book a scoping call and we\'ll create a custom proposal.',
  },
]

export function PricingContent() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-20"
        >
          <motion.div variants={fadeUpVariant}>
            <Badge variant="hybrid" className="mb-6">
              No surprises
            </Badge>
          </motion.div>
          <motion.div variants={fadeUpVariant}>
            <SplitText
              as="h1"
              preset="fade-up"
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
            >
              Transparent Pricing
            </SplitText>
          </motion.div>
          <motion.p
            variants={fadeUpVariant}
            className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto"
          >
            Clear deliverables. Fixed scopes. No hidden fees.
            Pick the tier that matches where you are — upgrade when you&apos;re ready.
          </motion.p>
        </motion.section>

        {/* Tier Comparison */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 0.1}>
                <GlassCard
                  padding="lg"
                  className={`relative flex flex-col h-full ${
                    tier.recommended
                      ? 'ring-1 ring-accent-blue/30 border border-accent-blue/20'
                      : ''
                  }`}
                >
                  {tier.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="hybrid">Recommended</Badge>
                    </div>
                  )}

                  <h3 className="font-heading text-xl font-bold text-text-primary mb-1">
                    {tier.name}
                  </h3>
                  <p className="font-mono text-lg font-semibold text-accent-blue mb-2">
                    {tier.price}
                  </p>
                  <p className="text-text-secondary text-sm mb-6">
                    {tier.tagline}
                  </p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li
                        key={f.text}
                        className="flex items-start gap-2 text-sm"
                      >
                        {f.included ? (
                          <Check
                            size={16}
                            className="text-emerald-400 mt-0.5 shrink-0"
                          />
                        ) : (
                          <Minus
                            size={16}
                            className="text-text-tertiary mt-0.5 shrink-0"
                          />
                        )}
                        <span
                          className={
                            f.included
                              ? 'text-text-secondary'
                              : 'text-text-tertiary'
                          }
                        >
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-xs text-text-tertiary mb-4">
                    <Clock size={14} />
                    {tier.timeline}
                  </div>

                  <Button
                    variant={tier.recommended ? 'primary' : 'secondary'}
                    href={tier.ctaHref}
                    size="md"
                    className="w-full"
                  >
                    {tier.ctaText}
                  </Button>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <SectionDivider variant="gold" className="mb-24" />

        {/* What Drives the Price */}
        <section className="mb-24">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary text-center mb-4">
              What Drives the Price?
            </h2>
            <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12">
              Every project is different. Here are the four factors that determine where
              your project lands within a tier.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {priceFactors.map((factor, i) => (
              <ScrollReveal key={factor.title} delay={i * 0.1}>
                <GlassCard padding="lg" className="h-full">
                  <factor.icon
                    size={28}
                    className="text-accent-blue mb-4"
                  />
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                    {factor.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {factor.description}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <SectionDivider variant="blue" className="mb-24" />

        {/* Example Projects */}
        <section className="mb-24">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary text-center mb-4">
              Example Projects
            </h2>
            <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12">
              Real engagements at different price points to help you calibrate expectations.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {exampleProjects.map((project, i) => (
              <ScrollReveal key={project.title} delay={i * 0.1}>
                <GlassCard padding="lg" className="h-full flex flex-col">
                  <project.icon
                    size={28}
                    className="text-accent-gold mb-4"
                  />
                  <Badge variant="default" className="mb-3 self-start">
                    {project.tier}
                  </Badge>
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-1">
                    {project.title}
                  </h3>
                  <p className="font-mono text-sm font-semibold text-accent-blue mb-3">
                    {project.price}
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">
                    {project.description}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <SectionDivider variant="gold" className="mb-24" />

        {/* FAQ */}
        <section className="mb-24 max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Accordion items={faqItems} />
          </ScrollReveal>
        </section>

        {/* CTA */}
        <ScrollReveal>
          <section className="text-center">
            <GlassCard padding="lg" className="max-w-2xl mx-auto">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4">
                Not sure which tier fits?
              </h2>
              <p className="text-text-secondary mb-8">
                Book a free 30-minute scoping call. We&apos;ll map your needs to the right
                engagement — no pressure, no pitch deck.
              </p>
              <Button href="/contact" size="lg">
                Get a Free Scoping Call
                <ArrowRight size={18} />
              </Button>
            </GlassCard>
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}
