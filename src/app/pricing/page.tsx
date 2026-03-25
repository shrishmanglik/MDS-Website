import type { Metadata } from 'next'
import { PricingContent } from './PricingContent'
import { webPageJsonLd, breadcrumbJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Transparent Pricing — No Surprises | Million Dollar AI Studio',
  description:
    'Clear deliverables, fixed scopes, no hidden fees. AI Audit from $500, Launchpad from $3K, Growth Engine from $3K/mo, Full Stack builds from $10K.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Transparent Pricing — No Surprises | Million Dollar AI Studio',
    description:
      'Clear deliverables, fixed scopes, no hidden fees. AI Audit from $500, Launchpad from $3K, Growth Engine from $3K/mo, Full Stack builds from $10K.',
    images: [
      {
        url: '/api/og?title=Transparent+Pricing&subtitle=No+surprises.+Clear+deliverables.',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transparent Pricing — No Surprises | Million Dollar AI Studio',
    description:
      'Clear deliverables, fixed scopes, no hidden fees. From AI audits to full-stack builds.',
  },
}

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd({
            name: 'Transparent Pricing',
            description:
              'Clear deliverables, fixed scopes, no hidden fees. AI services from audit to full-stack build.',
            path: '/pricing',
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Pricing', url: '/pricing' },
          ])),
        }}
      />
      <PricingContent />
    </>
  )
}
