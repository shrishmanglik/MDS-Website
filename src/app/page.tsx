import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Hero } from '@/components/sections/Hero'
import { SocialProof } from '@/components/sections/SocialProof'
import { professionalServiceJsonLd } from '@/lib/structured-data'

// Lazy-load below-fold sections to reduce initial JS bundle
const PersonaRouter = dynamic(() => import('@/components/sections/PersonaRouter').then(m => ({ default: m.PersonaRouter })))
const ThreeStreams = dynamic(() => import('@/components/sections/ThreeStreams').then(m => ({ default: m.ThreeStreams })))
const CaseStudiesPreview = dynamic(() => import('@/components/sections/CaseStudiesPreview').then(m => ({ default: m.CaseStudiesPreview })))
const ProductsPreview = dynamic(() => import('@/components/sections/ProductsPreview').then(m => ({ default: m.ProductsPreview })))
const HowWeWork = dynamic(() => import('@/components/sections/HowWeWork').then(m => ({ default: m.HowWeWork })))
const FounderStory = dynamic(() => import('@/components/sections/FounderStory').then(m => ({ default: m.FounderStory })))

export const metadata: Metadata = {
  title: { absolute: 'Million Dollar AI Studio | AI Systems You Actually Own' },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceJsonLd()),
        }}
      />
      <Hero />
      <SocialProof />
      <PersonaRouter />
      <ThreeStreams />
      <CaseStudiesPreview />
      <ProductsPreview />
      <HowWeWork />
      <FounderStory />
    </>
  )
}
