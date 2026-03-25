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
    tagline: '5-page AI Opportunity Report identifying 3-5 highest-ROI AI applications, with architecture recommendations and budget estimates.',
    included: [
      'Comprehensive operations analysis',
      'AI opportunity scoring matrix',
      'ROI projections per opportunity',
      'Implementation roadmap with priorities',
      '30-minute walkthrough call',
    ],
    timeline: '5-7 business days',
    ctaText: 'Book an Audit',
    ctaHref: '/services/audit',
    recommended: true,
  },
  {
    name: 'AI Launchpad',
    price: '$3,000 – $5,000',
    tagline: 'A working AI system deployed and ready for your team. Single-purpose: one workflow automated, one process transformed.',
    included: [
      'Custom AI system design',
      'Full development and deployment',
      'Documentation and training session',
      '30 days bug-fix support',
    ],
    timeline: '2-4 weeks',
    ctaText: 'Start Your Build',
    ctaHref: '/services/launchpad',
  },
  {
    name: 'Growth Engine',
    price: '$3,000 – $8,000/month',
    tagline: 'Ongoing AI partnership. We build, optimize, and expand your AI infrastructure month over month.',
    included: [
      'Monthly development sprints',
      'Performance monitoring and optimization',
      'Priority support channel',
      'Monthly progress reports',
    ],
    timeline: 'Ongoing, minimum 3 months',
    ctaText: 'Accelerate Growth',
    ctaHref: '/services/growth',
  },
  {
    name: 'Full Stack AI Build',
    price: '$10,000 – $50,000+',
    tagline: 'Enterprise-grade AI system. Multi-department integration, custom training data, fully documented.',
    included: [
      'Custom AI system architecture',
      'Full development and deployment',
      'API documentation and admin dashboard',
      'Team training and knowledge transfer',
      '90 days dedicated support',
    ],
    timeline: '4-12 weeks',
    ctaText: 'Discuss Your Project',
    ctaHref: '/services/enterprise',
  },
]

const faqItems = [
  {
    question: 'How fast can you deliver?',
    answer: 'AI Audits: 1 week. Launchpad builds: 2-4 weeks. Full Stack: 4-12 weeks. We scope accurately because we\'ve built six of our own products using the same architecture.',
  },
  {
    question: 'Do I own the code?',
    answer: '100%. We transfer all code, infrastructure credentials, documentation, and IP. You can take everything to another developer tomorrow and they\'ll be able to maintain it. No lock-in.',
  },
  {
    question: 'What if it doesn\'t work?',
    answer: 'We build iteratively with weekly demos. You see progress and give feedback throughout. If at any checkpoint you\'re not satisfied, we stop and you only pay for completed work.',
  },
  {
    question: 'How is this different from hiring a freelancer?',
    answer: 'Freelancers build from scratch every time. We use a proven architecture (deterministic-first) that we\'ve refined across six products. Your system gets the benefit of everything we\'ve learned.',
  },
  {
    question: 'What AI models do you use?',
    answer: 'The cheapest one that works. Our architecture handles 95%+ of computation without any AI model — lookup tables, rule engines, pre-computed data. AI only touches genuinely creative tasks. That\'s why our systems cost less than $0.01 per interaction.',
  },
  {
    question: 'I\'m not technical. Will I understand what you build?',
    answer: 'Yes. Every engagement includes documentation written for non-technical stakeholders, a walkthrough session, and ongoing support.',
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
            AI Services — Fixed Price, Full Ownership
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Every engagement has clear deliverables, a transparent price, and ends with you owning everything we built.
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
