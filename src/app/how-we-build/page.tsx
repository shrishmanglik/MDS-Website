import type { Metadata } from 'next'
import { breadcrumbJsonLd, webPageJsonLd } from '@/lib/structured-data'
import { HowWeBuildContent } from './HowWeBuildContent'

export const metadata: Metadata = {
  title: 'Deterministic-First Architecture | How We Build',
  description:
    '95% computed. 5% AI. 100% yours. The three-tier architecture behind 99.8% gross margins at 5,000 users. See the math.',
  alternates: { canonical: '/how-we-build' },
  openGraph: {
    title: 'Deterministic-First Architecture | How We Build',
    description:
      '95% computed. 5% AI. 100% yours. The three-tier architecture behind 99.8% gross margins.',
    images: [{ url: '/api/og?title=How+We+Build&subtitle=95%25+computed.+5%25+AI.+100%25+yours.', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deterministic-First Architecture',
    description:
      '95% computed. 5% AI. 100% yours. See the math behind 99.8% gross margins.',
  },
}

export default function HowWeBuildPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'How We Build', url: '/how-we-build' },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd({
            name: 'Deterministic-First Architecture | How We Build',
            description: '95% computed. 5% AI. 100% yours. The three-tier architecture behind 99.8% gross margins.',
            path: '/how-we-build',
          })),
        }}
      />
      <HowWeBuildContent />
    </>
  )
}
