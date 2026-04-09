import type { Metadata } from 'next'
import { AuditContent } from './AuditContent'
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'AI Audit — From $500',
  description:
    'Comprehensive AI operations analysis with ROI projections and implementation roadmap. Find every AI opportunity in your business.',
  alternates: { canonical: '/services/audit' },
  openGraph: {
    title: 'AI Audit — From $500',
    description:
      'Comprehensive AI operations analysis with ROI projections and implementation roadmap. Find every AI opportunity in your business.',
    images: [
      {
        url: '/api/og?title=AI+Audit&subtitle=Comprehensive+operations+analysis.+From+%24500.',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Audit — From $500',
    description:
      'Comprehensive AI operations analysis with ROI projections and implementation roadmap.',
  },
}

const auditFaqs = [
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
    question: 'What kinds of businesses is this for?',
    answer:
      'Any business with repeatable processes and at least one workflow that could be automated with AI or deterministic logic. The methodology is industry-agnostic — we map your workflows, find your bottlenecks, and recommend automation opportunities scored by impact and feasibility. You do not need prior AI experience or technical staff to engage.',
  },
]

export default function AuditPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd({
              title: 'AI Audit',
              description:
                'Comprehensive AI operations analysis with ROI projections and implementation roadmap.',
              slug: 'audit',
            }),
            faqJsonLd(auditFaqs),
            breadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: 'Services', url: '/services' },
              { name: 'AI Audit', url: '/services/audit' },
            ]),
          ]),
        }}
      />
      <AuditContent />
    </>
  )
}
