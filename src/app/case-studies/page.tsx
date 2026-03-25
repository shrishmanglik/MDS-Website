import type { Metadata } from 'next'
import { CaseStudiesContent } from './CaseStudiesContent'

export const metadata: Metadata = {
  title: 'Build Logs — How We Built Each Product | Million Dollar AI Studio',
  description:
    'Real architecture decisions. Real cost data. Real trade-offs. No anonymized hypotheticals.',
  alternates: { canonical: '/case-studies' },
  openGraph: {
    title: 'Build Logs — How We Built Each Product | Million Dollar AI Studio',
    description: 'Real architecture decisions. Real cost data. Real trade-offs. No anonymized hypotheticals.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build Logs — How We Built Each Product',
    description: 'Real architecture decisions. Real cost data. Real trade-offs. No anonymized hypotheticals.',
  },
}

export default function CaseStudiesPage() {
  return <CaseStudiesContent />
}
