import type { Metadata } from 'next'
import { AboutContent } from './AboutContent'

export const metadata: Metadata = {
  title: 'About Shrish Manglik',
  description:
    'Founded by systems architect Shrish Manglik. One builder with the right stack outperforming teams of ten.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Shrish Manglik | Million Dollar AI Studio',
    description:
      'Founded by systems architect Shrish Manglik. One builder with the right stack outperforming teams of ten.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Shrish Manglik | Million Dollar AI Studio',
    description:
      'Founded by systems architect Shrish Manglik. One builder with the right stack outperforming teams of ten.',
  },
}

export default function AboutPage() {
  return <AboutContent />
}
