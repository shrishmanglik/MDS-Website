import type { Metadata } from 'next'
import { LaunchpadContent } from './LaunchpadContent'
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'AI Launchpad — From $3K',
  description:
    'Launch your AI-powered business in 2-4 weeks. Website, marketing automation, brand voice AI, and 30-day support included.',
  alternates: { canonical: '/services/launchpad' },
  openGraph: {
    title: 'AI Launchpad — From $3K',
    description:
      'Launch your AI-powered business in 2-4 weeks. Website, marketing automation, brand voice AI, and 30-day support included.',
    images: [
      {
        url: '/api/og?title=AI+Launchpad&subtitle=MVP+in+2-4+weeks.+From+%243K.',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Launchpad — From $3K',
    description:
      'Launch your AI-powered business in 2-4 weeks. From $3K.',
  },
}

const launchpadFaqs = [
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

export default function LaunchpadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd({
              title: 'AI Launchpad',
              description:
                'Launch your AI-powered business in 2-4 weeks with website, marketing automation, and brand voice AI.',
              slug: 'launchpad',
            }),
            faqJsonLd(launchpadFaqs),
            breadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: 'Services', url: '/services' },
              { name: 'AI Launchpad', url: '/services/launchpad' },
            ]),
          ]),
        }}
      />
      <LaunchpadContent />
    </>
  )
}
