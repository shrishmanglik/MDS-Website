"use client"

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface NextStep {
  title: string
  description: string
}

interface WaitLink {
  label: string
  href: string
}

interface FormSuccessProps {
  headline: string
  message: string
  nextSteps: NextStep[]
  waitLinks?: WaitLink[]
}

export function FormSuccess({ headline, message, nextSteps, waitLinks }: FormSuccessProps) {
  return (
    <div className="pt-24 pb-16 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
          <Check size={40} className="text-green-500" />
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-primary gradient-text">{headline}</span>
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed mb-6">{message}</p>

        <div className="bg-bg-secondary border border-border-custom rounded-2xl p-6 mb-8 text-left">
          <h3 className="font-heading text-lg font-semibold text-text-primary mb-4">What Happens Next</h3>
          <ol className="space-y-3">
            {nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent-purple/10 flex items-center justify-center shrink-0 text-xs font-bold text-accent-purple">
                  {i + 1}
                </span>
                <div>
                  <p className="text-text-primary text-sm font-medium">{step.title}</p>
                  <p className="text-text-tertiary text-xs">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {waitLinks && waitLinks.length > 0 && (
          <div className="text-text-secondary text-sm space-y-3 mb-8">
            <p>While you wait:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {waitLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-accent-purple hover:text-accent-gold transition-colors">
                  {link.label} &rarr;
                </Link>
              ))}
            </div>
          </div>
        )}

        <Button href="/" variant="secondary" size="lg">
          Back to Homepage
        </Button>
      </motion.div>
    </div>
  )
}
