import type { Metadata } from 'next'
import { breadcrumbJsonLd, webPageJsonLd } from '@/lib/structured-data'
import { ToolsContent } from './ToolsContent'

export const metadata: Metadata = {
  title: 'Free Tools',
  description:
    'Free tools that run at $0. No sign-up required. No AI fees. Ever. CRS Calculator for Express Entry, Vedic Kundli Generator, and TEF Canada Score Estimator.',
  alternates: { canonical: '/tools' },
  openGraph: {
    title: 'Free Tools | Million Dollar AI Studio',
    description:
      'CRS Calculator, Vedic Kundli Generator, TEF Canada Score Estimator — free, instant, no sign-up.',
    images: [{ url: '/api/og?title=Free+Tools&subtitle=No+sign-up.+No+AI+fees.+Ever.', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Tools | MDS',
    description: 'CRS Calculator, Vedic Kundli Generator, TEF Score Estimator. Free, instant.',
  },
}

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'Tools', url: '/tools' },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd({
            name: 'Free Tools',
            description: 'Free tools that run at $0. No sign-up required. No AI fees. Ever.',
            path: '/tools',
          })),
        }}
      />
      <ToolsContent />
    </>
  )
}
