import type { Metadata } from 'next'
import { AboutContent } from './AboutContent'
import { webPageJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'About — Built by an Engineer Who Ships | MDS',
  description:
    'Shrish Manglik. Toronto. 6 AI products built on deterministic-first architecture. TELUS Health background. AI-native methodology that compounds with every build.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About — Built by an Engineer Who Ships',
    description:
      'Shrish Manglik. Toronto. 6 AI products built on deterministic-first architecture.',
    images: [{ url: '/api/og?title=About+Shrish+Manglik&subtitle=Built+by+an+Engineer+Who+Ships', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — Built by an Engineer Who Ships',
    description:
      'Shrish Manglik. Toronto. 6 AI products built on deterministic-first architecture.',
  },
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd({
            name: 'About — Built by an Engineer Who Ships',
            description: 'Shrish Manglik. Toronto. 6 AI products built on deterministic-first architecture.',
            path: '/about',
          })),
        }}
      />
      <AboutContent />
    </>
  )
}
