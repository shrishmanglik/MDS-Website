'use client'

import { motion } from 'framer-motion'
import {
  PenTool,
  Settings,
  BarChart3,
  Headphones,
  CalendarCheck,
  LineChart,
  RefreshCw,
  Target,
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
    icon: PenTool,
    title: 'Content System',
    description:
      'Blog posts, social content, email campaigns, and landing pages. AI-generated, human-reviewed, published on schedule. Your brand voice, at scale.',
  },
  {
    icon: Settings,
    title: 'Monthly Optimization',
    description:
      'Every month we audit performance, refine AI models, optimize conversion funnels, and adjust strategy based on real data.',
  },
  {
    icon: BarChart3,
    title: 'Performance Dashboards',
    description:
      'Real-time visibility into traffic, conversions, content performance, and ROI. No vanity metrics. Only numbers that matter.',
  },
  {
    icon: Headphones,
    title: 'Priority Support',
    description:
      'Direct access to your dedicated strategist. Same-day response on business days. Slack, email, or scheduled calls.',
  },
]

const processSteps = [
  {
    icon: CalendarCheck,
    step: '01',
    title: 'Onboarding',
    description:
      'We audit your current setup, configure your brand voice AI, and build your content calendar for month one.',
  },
  {
    icon: PenTool,
    step: '02',
    title: 'Create',
    description:
      'Content is generated, reviewed, and scheduled. Marketing automation runs. Your growth engine starts.',
  },
  {
    icon: LineChart,
    step: '03',
    title: 'Measure',
    description:
      'Weekly data reviews. Monthly performance reports. We track what works and double down.',
  },
  {
    icon: RefreshCw,
    step: '04',
    title: 'Optimize',
    description:
      'Strategy adjustments based on data. AI model refinements. Continuous improvement every cycle.',
  },
]

const pricingTiers = [
  {
    name: 'Foundation',
    price: '$3K/mo',
    description: 'Core growth engine for businesses getting started with ongoing AI.',
    features: [
      '8 blog posts per month',
      '20 social media posts per month',
      'Monthly email campaign',
      'SEO monitoring and optimization',
      'Performance dashboard',
      'Monthly strategy call',
      'Brand voice AI maintenance',
    ],
    recommended: false,
  },
  {
    name: 'Scale',
    price: '$5K/mo',
    description: 'For businesses ready to accelerate. More content, deeper optimization.',
    features: [
      '16 blog posts per month',
      '40 social media posts per month',
      'Weekly email campaigns',
      'Advanced SEO with backlink strategy',
      'A/B testing and conversion optimization',
      'Custom performance dashboards',
      'Bi-weekly strategy calls',
      'Landing page creation (up to 4/mo)',
      'Competitor monitoring',
    ],
    recommended: true,
  },
  {
    name: 'Enterprise',
    price: '$8K/mo',
    description: 'Full-service AI growth for high-growth companies.',
    features: [
      'Unlimited content production',
      'Multi-channel marketing automation',
      'Advanced analytics and attribution',
      'Custom AI workflow development',
      'Dedicated strategist',
      'Weekly strategy calls',
      'Priority same-day support',
      'Quarterly business reviews',
      'Custom integrations and tooling',
      'Team training sessions',
    ],
    recommended: false,
  },
]

const faqItems = [
  {
    question: 'What is the minimum commitment?',
    answer:
      'We recommend a 3-month minimum to see meaningful results. After that, it is month-to-month with 30-day notice to cancel. No long-term contracts required.',
  },
  {
    question: 'How is content created?',
    answer:
      'We use your brand voice AI model to generate content drafts, then our team reviews, edits, and optimizes before publishing. You approve everything before it goes live.',
  },
  {
    question: 'Can I pause the engagement?',
    answer:
      'Yes. You can pause for up to 60 days and resume without losing your brand voice model, content history, or optimizations.',
  },
  {
    question: 'What metrics do you track?',
    answer:
      'Traffic, conversions, lead quality, content performance, SEO rankings, and custom KPIs specific to your business. Everything is visible in your performance dashboard.',
  },
  {
    question: 'Do I need the Launchpad first?',
    answer:
      'Not necessarily. If you already have a website and basic infrastructure, we can onboard directly to Growth Engine. We will assess your current setup during the kickoff.',
  },
]

export function GrowthContent() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Growth Engine' },
          ]}
        />

        {/* Hero */}
        <section className="text-center mb-20">
          <ScrollReveal>
            <Badge variant="offline" className="mb-4">
              Ongoing monthly service
            </Badge>
          </ScrollReveal>
          <SplitText
            as="h1"
            preset="blur-in"
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text-primary"
          >
            Growth Engine
          </SplitText>
          <ScrollReveal delay={0.2}>
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Continuous AI-powered content, optimization, and strategy.
              Scale your marketing without scaling your team.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-accent-gold font-heading text-2xl font-semibold mt-6">
              From $3K/mo
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
            What You Get Every Month
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="text-text-secondary text-center mb-12 max-w-xl mx-auto"
          >
            A growth team in a box. Content, strategy, optimization, and support.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deliverables.map((item) => (
              <motion.div key={item.title} variants={fadeUpVariant}>
                <GlassCard padding="lg">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                    <item.icon size={24} className="text-emerald-400" aria-hidden="true" />
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
            The Monthly Cycle
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <motion.div key={step.step} variants={fadeUpVariant} className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-mono text-sm font-bold text-accent-gold">
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
            Predictable monthly investment. Cancel anytime after the initial period.
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
                    Start {tier.name}
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
              We operate 6 products across education, immigration, and astrology — each built on the same deterministic-first stack, each running at near-zero cost.
            </p>
          </GlassCard>
        </ScrollReveal>

        {/* Bottom CTA */}
        <ScrollReveal>
          <section className="text-center bg-bg-secondary border border-border-custom rounded-2xl p-12 md:p-16">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4">
              Ready to grow on autopilot?
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Book a call and we will show you exactly how the Growth Engine works
              for your industry.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Accelerate Growth
            </Button>
            <p className="text-text-tertiary text-sm mt-3">
              Month-to-month after initial period. No lock-in.
            </p>
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}
