"use client"

import { useState } from 'react'
import { ChevronDown, ArrowRight, Check, Clock } from 'lucide-react'
import { Button } from './Button'

interface ServicePackageCardProps {
  name: string
  price: string
  tagline: string
  included: string[]
  timeline: string
  ctaText: string
  ctaHref: string
  recommended?: boolean
}

export function ServicePackageCard({
  name,
  price,
  tagline,
  included,
  timeline,
  ctaText,
  ctaHref,
  recommended = false,
}: ServicePackageCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`rounded-2xl border bg-bg-secondary overflow-hidden ${recommended ? 'border-accent-blue ring-1 ring-accent-blue/20' : 'border-border-custom'}`}>
      {recommended && (
        <div className="flex items-center justify-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-semibold uppercase tracking-wider">
          Recommended starting point
        </div>
      )}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-inset rounded-2xl"
        aria-expanded={expanded}
      >
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-heading text-lg font-semibold text-text-primary">
              {name}
            </h3>
            <span className="text-sm font-mono font-semibold text-accent-blue">
              {price}
            </span>
          </div>
          <p className="text-text-secondary text-sm">{tagline}</p>
        </div>
        <ChevronDown
          size={20}
          className={`text-text-tertiary flex-shrink-0 ml-4 transition-transform duration-200 ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? 'max-h-[600px]' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-6 border-t border-border-custom pt-5">
          <p className="text-text-secondary text-xs uppercase tracking-wider font-medium mb-3">
            What&apos;s included
          </p>
          <ul className="space-y-2 mb-5">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                <Check size={14} className="text-accent-emerald mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1.5 text-text-tertiary text-xs mb-5">
            <Clock size={12} />
            <span>Timeline: {timeline}</span>
          </div>
          <Button href={ctaHref} variant="primary" size="sm">
            {ctaText}
            <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  )
}
