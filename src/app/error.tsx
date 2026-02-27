"use client"

import Link from 'next/link'

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-primary gradient-text">Something went wrong</span>
        </h1>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          Something unexpected happened. Please try again or return to the homepage.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-accent-start via-accent-mid to-accent-end text-white font-medium hover:brightness-110 transition-all"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-border-custom text-text-secondary hover:text-text-primary transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
