"use client"

import { useState, type FormEvent } from 'react'
import { Check } from 'lucide-react'
import { SITE } from '@/lib/constants'
import { submitForm } from '@/lib/forms/submitForm'
import { Button } from './Button'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    budget: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const result = await submitForm({
      form_name: 'Contact',
      subject: 'New Contact Message — MDS Website',
      ...formData,
    })
    if (result.success) {
      setSubmitted(true)
    } else {
      setError(result.message)
    }
    setSubmitting(false)
  }

  const resetForm = () => {
    setFormData({ name: '', email: '', company: '', message: '', budget: '' })
    setSubmitted(false)
    setError('')
  }

  const inputStyles =
    'w-full rounded-xl bg-bg-tertiary border border-border-custom px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-accent-mid focus:outline-none focus:border-accent-mid transition-colors'

  if (submitted) {
    return (
      <div className="text-center py-8" role="status" aria-live="polite">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-green-500" />
        </div>
        <h3 className="font-heading text-xl font-bold text-text-primary mb-2">Message Sent!</h3>
        <p className="text-text-secondary text-sm mb-4">
          We&apos;ll get back to you within 24 hours. For urgent matters, email us directly at{' '}
          <a href={`mailto:${SITE.email}`} className="text-accent-mid hover:underline">{SITE.email}</a>.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={resetForm}
            className="text-accent-mid hover:text-accent-start transition-colors text-sm font-medium min-h-[44px] inline-flex items-center"
          >
            Send another message
          </button>
          <span className="text-text-tertiary">|</span>
          <Button href="/" variant="secondary" size="md">
            Back to Homepage
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from real users, bots fill it */}
      <input
        type="text"
        name="_honeypot"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-text-secondary mb-1.5">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your name"
          className={inputStyles}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-text-secondary mb-1.5">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="you@example.com"
          className={inputStyles}
        />
      </div>
      <div>
        <label htmlFor="contact-company" className="block text-sm font-medium text-text-secondary mb-1.5">
          Company <span className="text-text-tertiary">(optional)</span>
        </label>
        <input
          id="contact-company"
          type="text"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          placeholder="Your company"
          className={inputStyles}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-text-secondary mb-1.5">
          What do you need?
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your project or problem"
          className={`${inputStyles} resize-none`}
        />
      </div>
      <div>
        <label htmlFor="contact-budget" className="block text-sm font-medium text-text-secondary mb-1.5">
          Budget
        </label>
        <select
          id="contact-budget"
          required
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          className={inputStyles}
        >
          <option value="" disabled>Select a budget range</option>
          <option value="Under $5K">Under $5K</option>
          <option value="$5K – $15K">$5K – $15K</option>
          <option value="$15K – $50K">$15K – $50K</option>
          <option value="$50K+">$50K+</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>
      <div aria-live="polite">
        {error && (
          <p className="text-red-400 text-sm text-center">
            {error}{' '}
            {!error.includes('email') && (
              <>You can also email us at{' '}
                <a href={`mailto:${SITE.email}`} className="underline hover:text-red-300">{SITE.email}</a>.
              </>
            )}
          </p>
        )}
      </div>
      <Button type="submit" variant="primary" size="lg" loading={submitting} className="w-full">
        Send Message
      </Button>
    </form>
  )
}
