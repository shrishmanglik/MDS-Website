"use client"

import { useState, type FormEvent } from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { WEB3FORMS_KEY } from '@/lib/constants'

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
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Waitlist signup: ${productName}`,
          email,
          product: productSlug,
          type: 'waitlist',
        }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
        <Check size={16} />
        <span>You&apos;re on the list. We&apos;ll notify you when {productName} launches.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email for early access"
        required
        className="flex-1 px-4 py-2.5 rounded-xl bg-bg-tertiary border border-border-custom text-text-primary text-sm placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-mid focus:border-transparent"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-accent-start to-accent-mid text-white text-sm font-medium hover:brightness-110 transition-all disabled:opacity-60"
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
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-1">Something went wrong. Please try again.</p>
      )}
    </form>
  )
}
