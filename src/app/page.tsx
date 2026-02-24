import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { ThreeStreams } from '@/components/sections/ThreeStreams'
import { ProductsPreview } from '@/components/sections/ProductsPreview'
import { CaseStudiesPreview } from '@/components/sections/CaseStudiesPreview'
import { HowWeWork } from '@/components/sections/HowWeWork'

export const metadata: Metadata = {
  title: 'Million Dollar AI Studio | Production AI Systems',
  description:
    'We build AI that works. Custom AI systems, SaaS products, and enterprise builds for businesses that need production-grade AI — not prototypes.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Million Dollar AI Studio | Production AI Systems',
    description:
      'We build AI that works. Custom AI systems, SaaS products, and enterprise builds for businesses that need production-grade AI — not prototypes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Million Dollar AI Studio | Production AI Systems',
    description:
      'We build AI that works. Custom AI systems, SaaS products, and enterprise builds for businesses.',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ThreeStreams />
      <ProductsPreview />
      <CaseStudiesPreview />
      <HowWeWork />
    </>
  )
}
