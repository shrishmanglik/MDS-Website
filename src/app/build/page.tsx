import type { Metadata } from 'next'
import { ArrowRight, Check } from 'lucide-react'
import { PricingTier } from '@/components/ui/PricingTier'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Custom AI Systems',
  description:
    'Personalized AI systems built to your specifications. Starter, Professional, and Enterprise tiers. Full code ownership. Ongoing support.',
  alternates: { canonical: '/build' },
  openGraph: {
    title: 'Custom AI Systems',
    description: 'Personalized AI systems. Fixed price. You own everything.',
    url: '/build',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom AI Systems',
    description: 'Personalized AI systems. Fixed price. You own everything.',
  },
}

const tiers = [
  {
    name: 'Starter',
    price: '$5K \u2013 $15K',
    monthlySupport: '$500',
    description: 'Single AI workflow or agent built to your specifications.',
    features: [
      '1 AI workflow or agent',
      'Basic API integration',
      'Full documentation',
      '30-day support',
      'Full code ownership',
    ],
    idealFor: 'Solopreneurs, small teams, proof-of-concepts',
    timeline: '2-3 weeks',
    ctaText: 'Build Your AI',
    ctaHref: '/intake',
  },
  {
    name: 'Professional',
    price: '$15K \u2013 $50K',
    monthlySupport: '$1,500',
    description: 'Multi-agent system with integrations and dashboards.',
    features: [
      'Multiple AI agents',
      'API + webhook integrations',
      'Custom integrations',
      'Admin dashboard',
      '90-day support',
      'Full code ownership',
    ],
    idealFor: 'Growing businesses, funded startups, mid-market',
    timeline: '4-6 weeks',
    ctaText: 'Build Your AI',
    ctaHref: '/intake',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$50K \u2013 $200K',
    monthlySupport: 'Custom',
    description: 'Full AI infrastructure deployment with SLA guarantees.',
    features: [
      'Enterprise architecture',
      'Full API suite',
      'Custom AI model training',
      'Dedicated support',
      'SLA guarantee',
      'Full code ownership',
    ],
    idealFor: 'Large organizations, complex integrations, mission-critical systems',
    timeline: '6-12 weeks',
    ctaText: 'Talk to Shrish',
    ctaHref: '/contact',
  },
]

const useCases = [
  'AI-powered customer service agents',
  'Internal knowledge base and document search',
  'Automated content creation pipelines',
  'Financial analysis and reporting tools',
  'Supply chain optimization systems',
  'Sales intelligence and lead scoring',
  'Custom CRM with AI insights',
]

const processSteps = [
  {
    number: '01',
    title: 'Discovery Call',
    description: '15 minutes. We understand your needs and recommend a tier.',
  },
  {
    number: '02',
    title: 'Scoping Document',
    description: 'Detailed spec with architecture, timeline, and fixed price.',
  },
  {
    number: '03',
    title: 'You Approve',
    description: 'Fixed scope, fixed price. No surprises mid-project.',
  },
  {
    number: '04',
    title: 'We Build',
    description: 'AI-powered development. Progress updates every 2-3 days.',
  },
  {
    number: '05',
    title: 'You Own',
    description: 'Full code, documentation, training, and handoff.',
  },
  {
    number: '06',
    title: 'Ongoing Support',
    description: 'Monthly support included in every tier.',
  },
]

export default function BuildPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-primary gradient-text">Got an idea? We build it.</span>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-3">
            Personalized AI systems designed for your exact needs. Fixed price. Fast delivery. You own everything.
          </p>
          <p className="text-text-tertiary text-sm max-w-xl mx-auto">
            Looking for packaged services like audits, websites, or content systems?{' '}
            <a href="/services" className="text-accent-purple hover:underline">See our service packages instead.</a>
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <PricingTier key={tier.name} {...tier} />
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-primary gradient-text">What people build with us</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {useCases.map((useCase) => (
              <div
                key={useCase}
                className="flex items-center gap-3 rounded-2xl border border-border-custom bg-bg-secondary p-6"
              >
                <Check size={18} className="text-accent-emerald flex-shrink-0" />
                <span className="text-text-primary text-sm">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-primary gradient-text">How it works</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-border-custom bg-bg-secondary p-6"
              >
                <span className="font-mono text-sm text-accent-purple font-semibold">{step.number}</span>
                <h3 className="font-heading text-xl font-semibold text-text-primary mt-2 mb-2">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center bg-bg-secondary border border-border-custom rounded-2xl p-12 md:p-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-primary gradient-text">Ready to build?</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Book a 15-minute discovery call. No pitch decks. No NDAs. Just a conversation about what you need.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Book a Discovery Call
              <ArrowRight size={16} />
            </Button>
            <p className="text-text-tertiary text-sm mt-3">
              Free 15-min call. We&apos;ll recommend the right tier for your project.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
