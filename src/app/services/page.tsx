import type { Metadata } from 'next'
import { ServicesContent } from './ServicesContent'
import { faqJsonLd, breadcrumbJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'AI Services & Custom Builds',
  description:
    'From $500 AI audits to $200K+ enterprise systems. We design, build, and deploy production AI that runs your business.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'AI Services & Custom Builds | Million Dollar AI Studio',
    description:
      'From $500 AI audits to $200K+ enterprise systems. We design, build, and deploy production AI that runs your business.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Services & Custom Builds | Million Dollar AI Studio',
    description: 'From $500 AI audits to $200K+ enterprise systems.',
  },
}

const serviceFaqs = [
  {
    question: 'How fast can you deliver?',
    answer: 'Most projects ship in 2-4 weeks. AI Audits in 1 week.',
  },
  {
    question: "What's the difference between Services and Build With Us?",
    answer:
      'Services are packaged engagements with defined deliverables — audits, websites, content systems, and one-off builds. Build With Us is for custom AI systems scoped to your exact specifications with tiered pricing based on complexity. Not sure which fits? Start with the AI Audit.',
  },
  {
    question: "What's the free assessment vs the paid AI Audit?",
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
      "Next.js, FastAPI, React, Python, Docker. We pick what's right for the project.",
  },
  {
    question: 'Can you work with my existing systems?',
    answer: "Yes. We integrate with whatever you're already using.",
  },
  {
    question: 'What if I need something not listed here?',
    answer: "We build custom. Tell us what you need — we'll scope it.",
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
