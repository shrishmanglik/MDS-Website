import type { Metadata } from 'next'
import { CaseStudiesContent } from './CaseStudiesContent'

export const metadata: Metadata = {
  title: 'Case Studies — AI System Capabilities',
  description:
    'Capability demonstrations showing what our AI systems can do. Document processing, privacy-first recruitment AI, and full-stack legal tech products.',
  alternates: { canonical: '/case-studies' },
  openGraph: {
    title: 'Case Studies — AI System Capabilities | Million Dollar AI Studio',
    description: 'Capability demonstrations showing what our AI systems can do across finance, healthcare, and legal tech.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies — AI System Capabilities',
    description: 'See what our AI systems can do. Real architectures, real code, real capability.',
  },
}

export default function CaseStudiesPage() {
  return <CaseStudiesContent />
}
