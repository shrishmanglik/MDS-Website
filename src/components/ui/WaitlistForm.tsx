"use client"

import { useState, type FormEvent } from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { submitForm } from '@/lib/forms/submitForm'

interface WaitlistFormProps {
  productName: string
  productSlug: string
}

export function WaitlistForm({ productName, productSlug }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    const result = await submitForm({
      form_name: 'Waitlist',
      subject: `Waitlist signup: ${productName}`,
      email,
      product: productSlug,
      type: 'waitlist',
    })
    setStatus(result.success ? 'success' : 'error')
    if (result.success) setEmail('')
  }

  if (status === 'success') {
    return (
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm"
        role="status"
        aria-live="polite"
      >
        <Check size={16} />
        <span>You&apos;re on the list. We&apos;ll notify you when {productName} launches.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      {/* Honeypot */}
      <input type="text" name="_honeypot" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email for early access"
        required
        className="flex-1 px-4 py-2.5 rounded-xl bg-bg-tertiary border border-border-custom text-text-primary text-sm placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white text-sm font-medium hover:brightness-110 transition-all disabled:opacity-60"
      >
        {status === 'loading' ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <>
            Join Waitlist
            <ArrowRight size={14} />
          </>
        )}
      </button>
      <div aria-live="polite">
        {status === 'error' && (
          <p className="text-red-400 text-xs mt-1">Something went wrong. Please try again.</p>
        )}
      </div>
    </form>
  )
}
