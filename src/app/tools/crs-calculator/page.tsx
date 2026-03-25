import type { Metadata } from 'next'
import { CRSContent } from './CRSContent'
import { webPageJsonLd, breadcrumbJsonLd } from '@/lib/structured-data'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Free CRS Calculator 2026 — Express Entry Score | MDS',
  description:
    'Calculate your CRS score for Canada Express Entry instantly. Matches the IRCC official calculator exactly. Age, education, language, work experience — all factors included. Free, no signup.',
  alternates: { canonical: '/tools/crs-calculator' },
  openGraph: {
    title: 'Free CRS Calculator — Express Entry Score | Million Dollar AI Studio',
    description:
      'Calculate your CRS score for Canada Express Entry. Matches the official IRCC calculator.',
    images: [
      {
        url: '/api/og?title=Free+CRS+Calculator&subtitle=Express+Entry+Score+Calculator',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free CRS Calculator — Express Entry Score',
    description:
      'Calculate your CRS score for Canada Express Entry. Free and instant.',
  },
}

function webApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CRS Calculator',
    description:
      'Free Comprehensive Ranking System (CRS) score calculator for Canada Express Entry immigration.',
    url: `${SITE.url}/tools/crs-calculator`,
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

export default function CRSCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd({
            name: 'Free CRS Calculator',
            description:
              'Calculate your CRS score for Canada Express Entry. Matches the official IRCC calculator.',
            path: '/tools/crs-calculator',
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Tools', url: '/tools' },
            { name: 'CRS Calculator', url: '/tools/crs-calculator' },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationJsonLd()),
        }}
      />
      <CRSContent />
    </>
  )
}
