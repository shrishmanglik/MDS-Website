import type { Metadata } from 'next'
import { breadcrumbJsonLd, webPageJsonLd } from '@/lib/structured-data'
import { ForBusinessesContent } from './ForBusinessesContent'

export const metadata: Metadata = {
  title: 'AI Systems for Businesses',
  description:
    'Your AI system. Your margins. Your data. We build custom AI systems with 99.8% gross margins. Same intelligence. Fraction of the cost.',
  alternates: { canonical: '/for-businesses' },
  openGraph: {
    title: 'AI Systems for Businesses | Million Dollar AI Studio',
    description:
      'Custom AI systems with 99.8% gross margins. Full code ownership. One-time build cost.',
    images: [{ url: '/api/og?title=AI+Systems+You+Own&subtitle=99.8%25+gross+margins', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Systems for Businesses',
    description:
      'Custom AI systems with 99.8% gross margins. Full code ownership.',
  },
}

export default function ForBusinessesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'For Businesses', url: '/for-businesses' },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd({
            name: 'AI Systems for Businesses',
            description: 'Custom AI systems with 99.8% gross margins. Full code ownership. One-time build cost.',
            path: '/for-businesses',
          })),
        }}
      />
      <ForBusinessesContent />
    </>
  )
}
