'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const tiers = [
  {
    id: 'tier1',
    label: 'Tier 1: Templates',
    pct: '45%',
    cost: '$0',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/30',
    description:
      'Pre-built knowledge templates handle the most common interactions. Zero computation, instant response. Covers FAQ, standard workflows, and routine queries.',
  },
  {
    id: 'tier2',
    label: 'Tier 2: Rules Engine',
    pct: '30%',
    cost: '~$0',
    color: 'text-accent-blue',
    bg: 'bg-accent-blue/10',
    border: 'border-accent-blue/30',
    description:
      'Deterministic rule systems handle conditional logic, calculations, and structured decision-making. Negligible compute cost, sub-millisecond execution.',
  },
  {
    id: 'tier3',
    label: 'Tier 3: AI (Last Resort)',
    pct: '25%',
    cost: '$0.001/req',
    color: 'text-accent-gold',
    bg: 'bg-accent-gold/10',
    border: 'border-accent-gold/30',
    description:
      'Only genuinely novel, unstructured queries reach AI. Optimized prompts, cached responses, and model routing minimize cost while maximizing quality.',
  },
]

export function ArchitectureDiagram({ className = '' }: { className?: string }) {
  const [activeTier, setActiveTier] = useState<string | null>(null)

  return (
    <ScrollReveal>
      <div className={className}>
        <div className="flex flex-col items-center gap-3">
          {/* Entry */}
          <div className="rounded-xl border border-border-custom bg-bg-elevated px-6 py-3 text-sm font-medium text-text-primary font-heading">
            User Request
          </div>
          <div className="w-px h-6 bg-border-custom" />

          {/* Tiers */}
          {tiers.map((tier, i) => (
            <div key={tier.id} className="w-full max-w-lg">
              <button
                onClick={() => setActiveTier(activeTier === tier.id ? null : tier.id)}
                onMouseEnter={() => setActiveTier(tier.id)}
                onMouseLeave={() => setActiveTier(null)}
                className={`w-full rounded-xl border p-5 text-left transition-all duration-200 ${
                  activeTier === tier.id
                    ? `${tier.border} ${tier.bg}`
                    : 'border-border-custom bg-bg-secondary hover:border-border-hover'
                }`}
                aria-expanded={activeTier === tier.id}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${tier.color.replace('text-', 'bg-')}`} />
                    <span className="text-sm font-medium text-text-primary font-heading">{tier.label}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-text-tertiary font-mono">
                    <span>{tier.pct} of traffic</span>
                    <span>{tier.cost}</span>
                  </div>
                </div>
                <AnimatePresence>
                  {activeTier === tier.id && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 text-sm text-text-secondary overflow-hidden"
                    >
                      {tier.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
              {i < tiers.length - 1 && (
                <div className="flex justify-center">
                  <div className="w-px h-3 bg-border-custom" />
                </div>
              )}
            </div>
          ))}

          <div className="w-px h-6 bg-border-custom" />

          {/* Exit */}
          <div className="rounded-xl border border-accent-gold/30 bg-accent-gold/10 px-6 py-3 text-sm font-medium text-accent-gold font-heading">
            Response Delivered
          </div>
        </div>

        <p className="mt-6 text-xs text-text-tertiary text-center">
          Click or hover each tier for details.{' '}
          <a href="/technology" className="text-accent-blue hover:underline">
            Full architecture →
          </a>
        </p>
      </div>
    </ScrollReveal>
  )
}
