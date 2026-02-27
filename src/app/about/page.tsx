import type { Metadata } from 'next'
import { AboutContent } from './AboutContent'
import { webPageJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'About Shrish Manglik',
  description:
    'Founded by systems architect Shrish Manglik. One builder with the right stack outperforming teams of ten.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Shrish Manglik',
    description:
      'Founded by systems architect Shrish Manglik. One builder with the right stack outperforming teams of ten.',
    images: [{ url: '/api/og?title=About+Shrish+Manglik&subtitle=One+builder+with+the+right+stack+outperforming+teams+of+ten.', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Shrish Manglik',
    description:
      'Founded by systems architect Shrish Manglik. One builder with the right stack outperforming teams of ten.',
  },
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd({
            name: 'About Shrish Manglik',
            description: 'Founded by systems architect Shrish Manglik. One builder with the right stack outperforming teams of ten.',
            path: '/about',
          })),
        }}
      />
      <AboutContent />
    </>
  )
}
