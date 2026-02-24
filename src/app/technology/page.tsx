import type { Metadata } from 'next'
import { TechnologyContent } from './TechnologyContent'

export const metadata: Metadata = {
  title: 'Our Technology | MIDAS Framework & Deterministic AI',
  description:
    'How we build AI systems that cost $60/month to run at 5,000 users. The three-tier architecture behind every MDS product.',
  alternates: { canonical: '/technology' },
  openGraph: {
    title: 'Our Technology | MIDAS Framework & Deterministic AI',
    description:
      'How we build AI systems that cost $60/month to run at 5,000 users. The three-tier architecture behind every MDS product.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Technology | MIDAS Framework & Deterministic AI',
    description:
      'How we build AI systems that cost $60/month to run at 5,000 users.',
  },
}

export default function TechnologyPage() {
  return <TechnologyContent />
}
