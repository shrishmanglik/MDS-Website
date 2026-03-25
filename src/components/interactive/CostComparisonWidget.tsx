'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { CountUp } from '@/components/ui/CountUp'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function CostComparisonWidget({ className = '' }: { className?: string }) {
  const [users, setUsers] = useState(5000)

  const avgSessionsPerUser = 4
  const avgInteractionsPerSession = 5
  const totalInteractions = users * avgSessionsPerUser * avgInteractionsPerSession
  const aiCostPerInteraction = 0.015
  const typicalAiCost = totalInteractions * aiCostPerInteraction
  const typicalInfraCost = 50 + Math.ceil(users / 1000) * 25
  const typicalTotal = typicalAiCost + typicalInfraCost

  const tier1Pct = 0.45
  const tier2Pct = 0.30
  const tier3Pct = 0.25
  const tier1Interactions = totalInteractions * tier1Pct
  const tier2Interactions = totalInteractions * tier2Pct
  const tier3Interactions = totalInteractions * tier3Pct
  const tier3CostPerInteraction = 0.001
  const mdsTier3Cost = tier3Interactions * tier3CostPerInteraction
  const mdsInfraCost = 30 + Math.ceil(users / 5000) * 10
  const mdsTotal = mdsTier3Cost + mdsInfraCost
  const savings = typicalTotal - mdsTotal
  const savingsPct = ((savings / typicalTotal) * 100).toFixed(0)

  return (
    <ScrollReveal>
      <div className={`${className}`}>
        <h3 className="font-heading text-2xl font-semibold text-text-primary mb-6">
          Cost at Scale: AI-First vs Deterministic-First
        </h3>

        {/* Slider */}
        <div className="mb-8">
          <label htmlFor="user-count" className="block text-sm font-medium text-text-secondary mb-3">
            Monthly active users:{' '}
            <span className="text-accent-gold font-bold font-mono">{users.toLocaleString()}</span>
          </label>
          <input
            id="user-count"
            type="range"
            min={100}
            max={100000}
            step={100}
            value={users}
            onChange={(e) => setUsers(Number(e.target.value))}
            className="w-full accent-[var(--accent-gold)] h-2 bg-bg-elevated rounded-full cursor-pointer"
          />
          <div className="flex justify-between text-xs text-text-tertiary mt-1 font-mono">
            <span>100</span>
            <span>100,000</span>
          </div>
        </div>

        {/* Comparison grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard padding="lg">
            <h4 className="font-heading text-lg font-semibold text-text-primary mb-4">
              Typical AI Startup
            </h4>
            <div className="space-y-2 text-sm text-text-secondary font-mono">
              <p>{totalInteractions.toLocaleString()} interactions × ${aiCostPerInteraction}</p>
              <p>= ${typicalAiCost.toLocaleString(undefined, { maximumFractionDigits: 0 })} AI cost</p>
              <p>+ ${typicalInfraCost} infrastructure</p>
              <div className="border-t border-border-custom pt-3 mt-3">
                <p className="text-2xl font-bold text-red-400">
                  $<CountUp end={Math.round(typicalTotal)} duration={1} />/mo
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard padding="lg" className="ring-1 ring-accent-gold/20">
            <h4 className="font-heading text-lg font-semibold text-text-primary mb-4">
              Deterministic-First (MDS)
            </h4>
            <div className="space-y-2 text-sm text-text-secondary font-mono">
              <p>Tier 1: {tier1Interactions.toLocaleString()} at $0 <span className="text-text-tertiary">(templates)</span></p>
              <p>Tier 2: {tier2Interactions.toLocaleString()} at $0 <span className="text-text-tertiary">(rules)</span></p>
              <p>Tier 3: {tier3Interactions.toLocaleString()} × ${tier3CostPerInteraction} = ${mdsTier3Cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              <p>+ ${mdsInfraCost} infrastructure</p>
              <div className="border-t border-border-custom pt-3 mt-3">
                <p className="text-2xl font-bold text-emerald-400">
                  $<CountUp end={Math.round(mdsTotal)} duration={1} />/mo
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Savings */}
        <div className="mt-6 text-center rounded-xl bg-accent-gold/10 border border-accent-gold/20 p-4">
          <p className="text-lg text-text-primary">
            Save <span className="font-bold text-accent-gold font-mono">${savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</span>{' '}
            ({savingsPct}% reduction) with deterministic-first
          </p>
        </div>

        <p className="mt-4 text-xs text-text-tertiary">
          Methodology: {avgSessionsPerUser} sessions/user/month × {avgInteractionsPerSession} interactions/session.
          Typical AI: ${aiCostPerInteraction}/interaction (GPT-4 level).
          MDS: {(tier1Pct * 100)}% templates ($0), {(tier2Pct * 100)}% rules ($0), {(tier3Pct * 100)}% AI (${tier3CostPerInteraction}/interaction).{' '}
          <a href="/technology#cost-model" className="text-accent-blue hover:underline">Full methodology →</a>
        </p>
      </div>
    </ScrollReveal>
  )
}
