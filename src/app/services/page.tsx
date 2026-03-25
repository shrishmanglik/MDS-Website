import type { Metadata } from 'next'
import { ServicesContent } from './ServicesContent'
import { faqJsonLd, breadcrumbJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'AI Services — Fixed Price, Full Ownership | Million Dollar AI Studio',
  description:
    'From $500 AI audits to $50K+ enterprise builds. Clear deliverables, transparent pricing, full code ownership. Toronto, Canada.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'AI Services — Fixed Price, Full Ownership | Million Dollar AI Studio',
    description:
      'From $500 AI audits to $50K+ enterprise builds. Clear deliverables, transparent pricing, full code ownership. Toronto, Canada.',
    images: [{ url: '/api/og?title=AI+Services+%26+Custom+Builds&subtitle=From+audits+to+enterprise+systems.+Production+AI+you+own.', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Services — Fixed Price, Full Ownership | Million Dollar AI Studio',
    description: 'From $500 AI audits to $50K+ enterprise builds. Clear deliverables, transparent pricing, full code ownership. Toronto, Canada.',
  },
}

const serviceFaqs = [
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

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            faqJsonLd(serviceFaqs),
            breadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: 'Services', url: '/services' },
            ]),
          ]),
        }}
      />
      <ServicesContent />
    </>
  )
}
