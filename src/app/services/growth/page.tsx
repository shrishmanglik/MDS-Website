import type { Metadata } from 'next'
import { GrowthContent } from './GrowthContent'
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Growth Engine — From $3K/mo',
  description:
    'Ongoing AI-powered growth. Content system, monthly optimization, performance dashboards, and priority support. Scale without hiring.',
  alternates: { canonical: '/services/growth' },
  openGraph: {
    title: 'Growth Engine — From $3K/mo',
    description:
      'Ongoing AI-powered growth. Content system, monthly optimization, performance dashboards, and priority support.',
    images: [
      {
        url: '/api/og?title=Growth+Engine&subtitle=Ongoing+AI-powered+growth.+From+%243K%2Fmo.',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Growth Engine — From $3K/mo',
    description:
      'Ongoing AI-powered growth. Content system, monthly optimization, and priority support.',
  },
}

const growthFaqs = [
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

export default function GrowthPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd({
              title: 'Growth Engine',
              description:
                'Ongoing AI-powered growth with content system, monthly optimization, performance dashboards, and priority support.',
              slug: 'growth',
            }),
            faqJsonLd(growthFaqs),
            breadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: 'Services', url: '/services' },
              { name: 'Growth Engine', url: '/services/growth' },
            ]),
          ]),
        }}
      />
      <GrowthContent />
    </>
  )
}
