import type { Metadata } from 'next'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
}

export default function NotFound() {
  return (
    <div className="pt-24 pb-16 px-6 min-h-[70vh] flex items-center justify-center">
      <div className="max-w-lg mx-auto text-center">
        <div className="flex items-center justify-center mb-6">
          <Image src="/logo-small.png" alt="MDS" width={48} height={48} className="w-12 h-12" />
        </div>
        <h1 className="font-heading text-6xl md:text-8xl font-bold mb-4">
          <span className="bg-gradient-primary gradient-text">404</span>
        </h1>
        <p className="text-text-secondary text-lg mb-2">This page doesn&apos;t exist.</p>
        <p className="text-text-tertiary text-sm mb-8">
          The link may be broken or the page has moved. Here&apos;s where you probably wanted to go:
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/free-audit" variant="primary" size="lg">
            Get Your Free AI Assessment
          </Button>
          <Button href="/products" variant="secondary" size="lg">
            Browse Products
          </Button>
          <Button href="/" variant="ghost" size="lg">
            Back to Home
          </Button>
        </div>
        <p className="text-text-tertiary text-xs mt-8">
          Something genuinely broken? Email us at{' '}
          <a href={`mailto:${SITE.email}`} className="text-accent-purple hover:underline">
            {SITE.email}
          </a>
        </p>
      </div>
    </div>
  )
}
