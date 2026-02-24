import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing — Redirecting to Services',
  robots: { index: false, follow: true },
  alternates: { canonical: '/services' },
}

export default function PricingRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/services" />
      <div className="pt-24 pb-16 px-6 min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary mb-4">
            This page has moved.
          </p>
          <Link
            href="/services"
            className="text-accent-mid hover:text-accent-start transition-colors font-medium"
          >
            View our services and pricing &rarr;
          </Link>
        </div>
      </div>
    </>
  )
}
