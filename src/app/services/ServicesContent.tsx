"use client"

import { motion } from 'framer-motion'
import { ServicePackageCard } from '@/components/ui/ServicePackageCard'
import { Accordion } from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'

const packages = [
  {
    name: 'AI Audit',
    price: '$500 – $2,000',
    tagline: 'The starting point. Most clients begin here.',
    included: [
      'Comprehensive operations analysis',
      'AI opportunity identification across your workflows',
      'ROI projections per opportunity',
      'Implementation roadmap with priorities',
    ],
    timeline: '1-2 weeks',
    ctaText: 'Book an Audit',
    ctaHref: '/contact',
    recommended: true,
  },
  {
    name: 'AI Launchpad',
    price: '$3,000 – $5,000',
    tagline: 'Get off the ground with AI at the core.',
    included: [
      'AI-powered website (custom designed, SEO-optimized)',
      'Basic marketing automation setup',
      'Brand voice AI training',
      '30-day post-launch support',
    ],
    timeline: '2-3 weeks',
    ctaText: 'Start Your Launch',
    ctaHref: '/contact',
  },
  {
    name: 'Growth Engine',
    price: '$3,000 – $8,000/month',
    tagline: 'Ongoing AI-powered growth.',
    included: [
      'Everything in Launchpad',
      'Content system (blog, social, email — AI-generated, human-reviewed)',
      'Monthly AI audit and optimization',
      'Performance dashboards',
      'Priority support',
    ],
    timeline: 'Ongoing monthly',
    ctaText: 'Accelerate Growth',
    ctaHref: '/contact',
  },
  {
    name: 'Full Stack AI Build',
    price: '$10K – $50K',
    tagline: 'When you need serious AI engineering.',
    included: [
      'Custom AI system design and architecture',
      'Full development and deployment',
      'Process automation implementation',
      'Team training and knowledge transfer',
      'Dedicated support channel',
    ],
    timeline: '4-8 weeks',
    ctaText: 'Discuss Your Project',
    ctaHref: '/contact',
  },
]

const faqItems = [
  {
    question: 'How fast can you deliver?',
    answer: 'Most projects ship in 2-4 weeks. AI Audits in 1 week.',
  },
  {
    question: 'What\'s the difference between Services and Build With Us?',
    answer:
      'Services are packaged engagements with defined deliverables — audits, websites, content systems, and one-off builds. Build With Us is for custom AI systems scoped to your exact specifications with tiered pricing based on complexity. Not sure which fits? Start with the AI Audit.',
  },
  {
    question: 'What\'s the free assessment vs the paid AI Audit?',
    answer:
      'The free assessment is a quick 5-page opportunity report based on your form responses — it shows where AI could fit. The paid AI Audit ($500–$2K) is a deep-dive engagement where we analyze your actual operations, interview stakeholders, and deliver a detailed implementation roadmap with ROI projections.',
  },
  {
    question: 'Do I own the code?',
    answer: 'Yes. 100% code ownership. We build it, you own it.',
  },
  {
    question: 'What tech stack do you use?',
    answer:
      'Next.js, FastAPI, React, Python, Docker. We pick what\'s right for the project.',
  },
  {
    question: 'Can you work with my existing systems?',
    answer: 'Yes. We integrate with whatever you\'re already using.',
  },
  {
    question: 'What if I need something not listed here?',
    answer:
      'We build custom. Tell us what you need — we\'ll scope it.',
  },
]

export function ServicesContent() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text-primary">
            AI That Runs Your Business.
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We don&apos;t sell hours. We sell outcomes. Every engagement has clear
            deliverables, fixed pricing, and a deadline.
          </p>
        </motion.section>

        {/* Service Package Cards */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-4 mb-24"
        >
          {packages.map((pkg) => (
            <motion.div key={pkg.name} variants={fadeUpVariant}>
              <ServicePackageCard {...pkg} />
            </motion.div>
          ))}
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-8">
            Frequently asked questions
          </h2>
          <Accordion items={faqItems} />
        </motion.section>

        {/* Bottom CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="text-center bg-bg-secondary border border-border-custom rounded-2xl p-12 md:p-16"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4">
            Not sure which package?
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Book a 15-minute call. We&apos;ll help you figure out the right
            starting point.
          </p>
          <Button href="/contact" variant="primary" size="lg">
            Talk to Shrish
          </Button>
          <p className="text-text-tertiary text-sm mt-3">
            Free 15-min call. No pitch decks. No obligations.
          </p>
        </motion.section>
      </div>
    </div>
  )
}
