import type { Metadata } from 'next'
import { KundliContent } from './KundliContent'
import { webPageJsonLd, breadcrumbJsonLd } from '@/lib/structured-data'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Free Kundli Generator — Vedic Birth Chart',
  description:
    'Generate your free Vedic Kundli (birth chart) online instantly. North Indian style Rashi chart with planetary positions, nakshatras, and house placements. No signup required.',
  alternates: { canonical: '/tools/kundli-generator' },
  openGraph: {
    title: 'Free Kundli Generator — Vedic Birth Chart Online | Million Dollar AI Studio',
    description:
      'Generate your free Vedic birth chart with planetary positions and nakshatra details. Powered by the JyotishAI engine.',
    images: [
      {
        url: '/api/og?title=Free+Kundli+Generator&subtitle=Vedic+Birth+Chart+Online',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Kundli Generator — Vedic Birth Chart',
    description:
      'Generate your free Vedic Kundli online. North Indian chart with planetary positions.',
  },
}

function webApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Free Kundli Generator',
    description:
      'Generate a free Vedic Kundli (birth chart) online with planetary positions, nakshatra details, and North Indian style Rashi chart.',
    url: `${SITE.url}/tools/kundli-generator`,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    creator: {
      '@type': 'Organization',
      name: SITE.name,
    },
  }
}

export default function KundliGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd({
            name: 'Free Kundli Generator',
            description:
              'Generate your free Vedic Kundli (birth chart) online with planetary positions and nakshatra details.',
            path: '/tools/kundli-generator',
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Tools', url: '/tools' },
            { name: 'Kundli Generator', url: '/tools/kundli-generator' },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationJsonLd()),
        }}
      />
      <KundliContent />
    </>
  )
}
