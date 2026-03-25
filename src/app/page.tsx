import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Hero } from '@/components/sections/Hero'
import { SocialProof } from '@/components/sections/SocialProof'
import { SectionDivider } from '@/components/ui/SectionTransition'
import { professionalServiceJsonLd } from '@/lib/structured-data'

// Lazy-load below-fold sections to reduce initial JS bundle
const PersonaRouter = dynamic(() => import('@/components/sections/PersonaRouter').then(m => ({ default: m.PersonaRouter })))
const ThreeStreams = dynamic(() => import('@/components/sections/ThreeStreams').then(m => ({ default: m.ThreeStreams })))
const CaseStudiesPreview = dynamic(() => import('@/components/sections/CaseStudiesPreview').then(m => ({ default: m.CaseStudiesPreview })))
const ProductsPreview = dynamic(() => import('@/components/sections/ProductsPreview').then(m => ({ default: m.ProductsPreview })))
const HowWeWork = dynamic(() => import('@/components/sections/HowWeWork').then(m => ({ default: m.HowWeWork })))
const FounderStory = dynamic(() => import('@/components/sections/FounderStory').then(m => ({ default: m.FounderStory })))

export const metadata: Metadata = {
  title: { absolute: 'Million Dollar AI Studio | We Build AI Systems That Run Without AI' },
  description:
    'We build AI systems that cost $0 to run. 6 products built on deterministic-first architecture. Custom AI development from $3K. Toronto, Canada.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Million Dollar AI Studio | We Build AI Systems That Run Without AI',
    description:
      'We build AI systems that cost $0 to run. 6 products built on deterministic-first architecture. Custom AI development from $3K. Toronto, Canada.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Million Dollar AI Studio | We Build AI Systems That Run Without AI',
    description:
      'We build AI systems that cost $0 to run. 6 products built on deterministic-first architecture. Custom AI development from $3K. Toronto, Canada.',
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
      <SectionDivider variant="glow" />
      <SocialProof />
      <PersonaRouter />
      <SectionDivider variant="gradient" />
      <ThreeStreams />
      <SectionDivider variant="dots" />
      <CaseStudiesPreview />
      <SectionDivider variant="gradient" />
      <ProductsPreview />
      <SectionDivider variant="glow" />
      <HowWeWork />
      <SectionDivider variant="gradient" />
      <FounderStory />
    </>
  )
}
