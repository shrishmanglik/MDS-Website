import type { Metadata } from 'next'
import { TechnologyContent } from './TechnologyContent'
import { webPageJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Our Technology | MIDAS Framework & Deterministic AI',
  description:
    'How we build AI systems that cost $60/month to run at 5,000 users. The three-tier architecture behind every MDS product.',
  alternates: { canonical: '/technology' },
  openGraph: {
    title: 'Our Technology | MIDAS Framework',
    description:
      'How we build AI systems that cost $60/month to run at 5,000 users. The three-tier architecture behind every MDS product.',
    images: [{ url: '/api/og?title=MIDAS+Framework+%26+Deterministic+AI&subtitle=AI+systems+that+cost+%2460%2Fmo+to+run+at+5%2C000+users.', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Technology | MIDAS Framework',
    description:
      'How we build AI systems that cost $60/month to run at 5,000 users.',
  },
}

export default function TechnologyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd({
            name: 'Our Technology | MIDAS Framework & Deterministic AI',
            description: 'How we build AI systems that cost $60/month to run at 5,000 users. The three-tier architecture behind every MDS product.',
            path: '/technology',
          })),
        }}
      />
      <TechnologyContent />
    </>
  )
}
