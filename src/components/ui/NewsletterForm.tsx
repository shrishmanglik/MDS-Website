'use client'

import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/Button'

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // Will integrate with Web3Forms later
    setSubmitted(true)
  }

  if (submitted) {
    return <p className="text-accent-emerald text-sm">You're subscribed!</p>
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className || ''}`}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-4 py-2 rounded-lg bg-bg-elevated border border-border-custom text-text-primary placeholder:text-text-tertiary text-sm focus:outline-none focus:border-accent-blue transition-colors"
        aria-label="Email for newsletter"
      />
      <Button type="submit" variant="primary" size="sm">
        Subscribe
      </Button>
    </form>
  )
}
