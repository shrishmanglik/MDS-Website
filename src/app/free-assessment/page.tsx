import type { Metadata } from 'next'
import { AssessmentContent } from './AssessmentContent'
import { webPageJsonLd, breadcrumbJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Free AI Assessment',
  description:
    'Get a free AI readiness assessment for your business. Discover your top 3 automation opportunities, architecture recommendations, and cost estimates.',
  alternates: { canonical: '/free-assessment' },
  openGraph: {
    title: 'Free AI Assessment | Million Dollar AI Studio',
    description:
      'Get a free AI readiness assessment. Top automation opportunities, architecture recommendations, and cost estimates.',
    images: [
      {
        url: '/api/og?title=Free+AI+Assessment&subtitle=Discover+your+top+automation+opportunities.',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Assessment | Million Dollar AI Studio',
    description:
      'Free AI readiness assessment for your business. Discover automation opportunities.',
  },
}

export default function FreeAssessmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd({
            name: 'Free AI Assessment',
            description:
              'Get a free AI readiness assessment for your business with top automation opportunities and cost estimates.',
            path: '/free-assessment',
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Free Assessment', url: '/free-assessment' },
          ])),
        }}
      />
      <AssessmentContent />
    </>
  )
}
