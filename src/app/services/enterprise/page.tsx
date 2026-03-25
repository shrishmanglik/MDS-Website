import type { Metadata } from 'next'
import { EnterpriseContent } from './EnterpriseContent'
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Full Stack AI Build — From $10K',
  description:
    'Custom AI systems built to your exact specifications. Architecture, development, deployment, training, and dedicated support. 4-12 weeks.',
  alternates: { canonical: '/services/enterprise' },
  openGraph: {
    title: 'Full Stack AI Build — From $10K',
    description:
      'Custom AI systems built to your exact specifications. Architecture, development, deployment, training, and dedicated support.',
    images: [
      {
        url: '/api/og?title=Full+Stack+AI+Build&subtitle=Custom+AI+systems.+From+%2410K.',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Full Stack AI Build — From $10K',
    description:
      'Custom AI systems built to your exact specifications. 4-12 weeks.',
  },
}

const enterpriseFaqs = [
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

export default function EnterprisePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd({
              title: 'Full Stack AI Build',
              description:
                'Custom AI systems with architecture, development, deployment, training, and dedicated support.',
              slug: 'enterprise',
            }),
            faqJsonLd(enterpriseFaqs),
            breadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: 'Services', url: '/services' },
              { name: 'Full Stack AI Build', url: '/services/enterprise' },
            ]),
          ]),
        }}
      />
      <EnterpriseContent />
    </>
  )
}
