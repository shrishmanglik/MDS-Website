import type { Metadata } from 'next'
import { ServicesContent } from './ServicesContent'

export const metadata: Metadata = {
  title: 'AI Services & Custom Builds',
  description:
    'From $500 AI audits to $200K+ enterprise systems. We design, build, and deploy production AI that runs your business.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'AI Services & Custom Builds | Million Dollar AI Studio',
    description:
      'From $500 AI audits to $200K+ enterprise systems. We design, build, and deploy production AI that runs your business.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Services & Custom Builds | Million Dollar AI Studio',
    description: 'From $500 AI audits to $200K+ enterprise systems.',
  },
}

export default function ServicesPage() {
  return <ServicesContent />
}
