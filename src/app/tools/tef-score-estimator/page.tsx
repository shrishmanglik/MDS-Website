import type { Metadata } from 'next'
import { TEFContent } from './TEFContent'
import { webPageJsonLd, breadcrumbJsonLd } from '@/lib/structured-data'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Free TEF Canada Score Estimator | MDS',
  description:
    'Estimate your TEF Canada scores and see the corresponding CLB levels for Express Entry. Free TEF exam preparation tool and CLB level calculator. Instant results, no signup.',
  alternates: { canonical: '/tools/tef-score-estimator' },
  openGraph: {
    title: 'Free TEF Canada Score Estimator | Million Dollar AI Studio',
    description:
      'Estimate your TEF Canada scores and see CLB levels for Express Entry. Free, instant, no signup.',
    images: [
      {
        url: '/api/og?title=TEF+Score+Estimator&subtitle=TEF+Canada+to+CLB+Calculator',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free TEF Canada Score Estimator',
    description:
      'Estimate your TEF Canada scores and see CLB levels for Express Entry. Free and instant.',
  },
}

function webApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'TEF Canada Score Estimator',
    description:
      'Free TEF Canada score estimator and CLB level calculator for Express Entry immigration to Canada.',
    url: `${SITE.url}/tools/tef-score-estimator`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CAD',
    },
    creator: {
      '@type': 'Organization',
      name: SITE.name,
    },
  }
}

export default function TEFScoreEstimatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd({
            name: 'Free TEF Canada Score Estimator',
            description:
              'Estimate your TEF Canada scores and see CLB levels for Express Entry. Free CLB level calculator.',
            path: '/tools/tef-score-estimator',
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Tools', url: '/tools' },
            { name: 'TEF Score Estimator', url: '/tools/tef-score-estimator' },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationJsonLd()),
        }}
      />
      <TEFContent />
    </>
  )
}
