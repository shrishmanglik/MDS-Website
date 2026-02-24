import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { PersonaRouter } from '@/components/sections/PersonaRouter'
import { SocialProof } from '@/components/sections/SocialProof'
import { ThreeStreams } from '@/components/sections/ThreeStreams'
import { ProductsPreview } from '@/components/sections/ProductsPreview'
import { CaseStudiesPreview } from '@/components/sections/CaseStudiesPreview'
import { HowWeWork } from '@/components/sections/HowWeWork'

export const metadata: Metadata = {
  title: 'Million Dollar AI Studio | AI Systems You Actually Own',
  description:
    'AI systems you actually own. Custom AI builds, SaaS products, and enterprise systems with full code ownership — not prototypes, not demos.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Million Dollar AI Studio | AI Systems You Actually Own',
    description:
      'AI systems you actually own. Custom AI builds, SaaS products, and enterprise systems with full code ownership — not prototypes, not demos.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Million Dollar AI Studio | AI Systems You Actually Own',
    description:
      'AI systems you actually own. Production AI with full code ownership.',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <PersonaRouter />
      <SocialProof />
      <ThreeStreams />
      <ProductsPreview />
      <CaseStudiesPreview />
      <HowWeWork />
    </>
  )
}
