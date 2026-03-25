'use client'

import { motion } from 'framer-motion'
import {
  Globe,
  Zap,
  Mic,
  HeadphonesIcon,
  Palette,
  Code2,
  Rocket,
  Shield,
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
    icon: Globe,
    title: 'AI-Powered Website',
    description:
      'Custom-designed, SEO-optimized website with AI-generated content pipeline. Looks premium. Runs fast. Ranks well.',
  },
  {
    icon: Zap,
    title: 'Marketing Automation',
    description:
      'Email sequences, lead capture, and nurture flows. Set it once, let it run. We configure everything before launch.',
  },
  {
    icon: Mic,
    title: 'Brand Voice AI',
    description:
      'A custom AI model trained on your brand voice, tone, and messaging. Generate on-brand content anytime, no prompt engineering required.',
  },
  {
    icon: HeadphonesIcon,
    title: '30-Day Support',
    description:
      'Post-launch bug fixes, content adjustments, and performance monitoring. We do not disappear after delivery.',
  },
]

const processSteps = [
  {
    icon: Palette,
    step: '01',
    title: 'Discovery & Design',
    description:
      'Brand workshop, competitor analysis, and wireframes. You approve the direction before we write a line of code.',
  },
  {
    icon: Code2,
    step: '02',
    title: 'Build',
    description:
      'Full development sprint. Website, automation, content — all built in parallel with weekly check-ins.',
  },
  {
    icon: Rocket,
    step: '03',
    title: 'Launch',
    description:
      'QA, deployment, DNS, and go-live. We handle everything. You get a launch day, not a launch month.',
  },
  {
    icon: Shield,
    step: '04',
    title: 'Support',
    description:
      '30 days of active support. Bug fixes, content tweaks, performance tuning. Full handoff documentation at the end.',
  },
]

const pricingTiers = [
  {
    name: 'Essential',
    price: '$3K',
    description: 'Everything you need to launch with AI at the core.',
    features: [
      'Custom-designed website (up to 8 pages)',
      'SEO foundation and sitemap',
      'AI-generated launch content',
      'Basic email automation (welcome + nurture)',
      'Brand voice AI model',
      'Mobile-responsive design',
      '30-day post-launch support',
    ],
    recommended: false,
  },
  {
    name: 'Growth',
    price: '$5K',
    description: 'Launch bigger. More pages, more automation, more firepower.',
    features: [
      'Custom-designed website (up to 15 pages)',
      'Advanced SEO with keyword strategy',
      'Full content library (blog, landing pages)',
      'Multi-sequence email automation',
      'Brand voice AI model with style guide',
      'Lead scoring and CRM integration',
      'Analytics dashboard setup',
      'Social media content templates',
      '30-day post-launch support',
    ],
    recommended: true,
  },
]

const faqItems = [
  {
    question: 'What does "AI-powered website" mean?',
    answer:
      'We build your site with AI baked into the content pipeline, SEO strategy, and user experience. The site itself runs without AI inference costs, but the content and optimization are AI-generated and human-reviewed.',
  },
  {
    question: 'How long does the Launchpad take?',
    answer:
      'Essential packages deliver in 2-3 weeks. Growth packages in 3-4 weeks. We set the timeline at kickoff and stick to it.',
  },
  {
    question: 'Do I need to provide content?',
    answer:
      'No. We generate all initial content using your brand voice AI model. You review and approve before launch. After launch, you own the content system.',
  },
  {
    question: 'What happens after the 30-day support period?',
    answer:
      'You can transition to our Growth Engine for ongoing optimization, or manage everything independently. We do a full handoff with documentation either way.',
  },
  {
    question: 'Can I upgrade to Growth Engine later?',
    answer:
      'Absolutely. Most Launchpad clients upgrade within 60 days. The transition is seamless since we built the foundation.',
  },
]

export function LaunchpadContent() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'AI Launchpad' },
          ]}
        />

        {/* Hero */}
        <section className="text-center mb-20">
          <ScrollReveal>
            <Badge variant="premium" className="mb-4">
              MVP in 2-4 weeks
            </Badge>
          </ScrollReveal>
          <SplitText
            as="h1"
            preset="blur-in"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text-primary"
          >
            AI Launchpad
          </SplitText>
          <ScrollReveal delay={0.2}>
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Go from zero to live in weeks, not months. We build your AI-powered web presence,
              marketing engine, and brand voice system so you can launch with momentum.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-accent-gold font-heading text-2xl font-semibold mt-6">
              From $3K
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
            A complete launch package. Not a template. Not a WordPress theme.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deliverables.map((item) => (
              <motion.div key={item.title} variants={fadeUpVariant}>
                <GlassCard padding="lg">
                  <div className="w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center mb-4">
                    <item.icon size={24} className="text-accent-purple" aria-hidden="true" />
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
            Fixed pricing. Defined deliverables. Ship date on day one.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {pricingTiers.map((tier) => (
              <motion.div key={tier.name} variants={fadeUpVariant}>
                <GlassCard
                  padding="lg"
                  className={`h-full flex flex-col ${
                    tier.recommended ? 'ring-2 ring-accent-purple' : ''
                  }`}
                >
                  {tier.recommended && (
                    <Badge variant="ai" className="mb-3 self-start">
                      Best Value
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
                    Start {tier.name} Launch
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
              Ready to launch?
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Tell us about your business. We will scope the project and give you a launch date
              within 48 hours.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Start Your Launchpad
            </Button>
            <p className="text-text-tertiary text-sm mt-3">
              Free scoping call. Fixed pricing. No surprises.
            </p>
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}
