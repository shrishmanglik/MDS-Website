import type { Metadata } from 'next'
import { breadcrumbJsonLd, webPageJsonLd } from '@/lib/structured-data'
import { ForPeopleContent } from './ForPeopleContent'

export const metadata: Metadata = {
  title: 'Products for People',
  description:
    'Smart tools that work forever. Practice French, generate Vedic birth charts, master chemistry. No AI costs, no lag, no hallucinations.',
  alternates: { canonical: '/for-people' },
  openGraph: {
    title: 'Products for People | Million Dollar AI Studio',
    description:
      'Smart tools that work forever. Practice French, generate Vedic birth charts, master chemistry.',
    images: [{ url: '/api/og?title=Products+for+People&subtitle=Smart+tools+that+work+forever', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products for People',
    description:
      'Smart tools that work forever. No AI costs, no lag, no hallucinations.',
  },
}

export default function ForPeoplePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'For People', url: '/for-people' },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd({
            name: 'Products for People',
            description: 'Smart tools that work forever. Practice French, generate Vedic birth charts, master chemistry.',
            path: '/for-people',
          })),
        }}
      />
      <ForPeopleContent />
    </>
  )
}
