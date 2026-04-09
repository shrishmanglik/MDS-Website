'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, Languages, RotateCcw } from 'lucide-react'
import { SplitText } from '@/components/ui/SplitText'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'

// ---------------------------------------------------------------------------
// CLB Conversion Tables — TEF score ranges to CLB levels
// Source: IRCC official TEF Canada equivalency chart
// ---------------------------------------------------------------------------

interface CLBRange {
  min: number
  max: number
  clb: number
}

const listeningRanges: CLBRange[] = [
  { min: 145, max: 180, clb: 4 },
  { min: 181, max: 216, clb: 5 },
  { min: 217, max: 248, clb: 6 },
  { min: 249, max: 279, clb: 7 },
  { min: 280, max: 297, clb: 8 },
  { min: 298, max: 315, clb: 9 },
  { min: 316, max: 333, clb: 10 },
  { min: 334, max: 348, clb: 11 },
  { min: 349, max: 360, clb: 12 },
]

const readingRanges: CLBRange[] = [
  { min: 121, max: 150, clb: 4 },
  { min: 151, max: 180, clb: 5 },
  { min: 181, max: 206, clb: 6 },
  { min: 207, max: 232, clb: 7 },
  { min: 233, max: 247, clb: 8 },
  { min: 248, max: 262, clb: 9 },
  { min: 263, max: 276, clb: 10 },
  { min: 277, max: 290, clb: 11 },
  { min: 291, max: 300, clb: 12 },
]

const speakingRanges: CLBRange[] = [
  { min: 181, max: 225, clb: 4 },
  { min: 226, max: 270, clb: 5 },
  { min: 271, max: 309, clb: 6 },
  { min: 310, max: 348, clb: 7 },
  { min: 349, max: 370, clb: 8 },
  { min: 371, max: 392, clb: 9 },
  { min: 393, max: 414, clb: 10 },
  { min: 415, max: 435, clb: 11 },
  { min: 436, max: 450, clb: 12 },
]

const writingRanges: CLBRange[] = [
  { min: 181, max: 225, clb: 4 },
  { min: 226, max: 270, clb: 5 },
  { min: 271, max: 309, clb: 6 },
  { min: 310, max: 348, clb: 7 },
  { min: 349, max: 370, clb: 8 },
  { min: 371, max: 392, clb: 9 },
  { min: 393, max: 414, clb: 10 },
  { min: 415, max: 435, clb: 11 },
  { min: 436, max: 450, clb: 12 },
]

function getClbLevel(score: number, ranges: CLBRange[]): number | null {
  if (score < ranges[0].min) return null
  for (const range of ranges) {
    if (score >= range.min && score <= range.max) return range.clb
  }
  return null
}

/** CRS points per ability for first official language (with spouse scenario) */
function getCrsPointsPerAbility(clb: number): number {
  if (clb <= 3) return 0
  if (clb <= 5) return 6
  if (clb === 6) return 8
  if (clb === 7) return 16
  if (clb === 8) return 22
  if (clb === 9) return 29
  return 32 // CLB 10+
}

function getClbBadgeColor(clb: number | null): string {
  if (clb === null) return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
  if (clb <= 5) return 'bg-red-500/10 text-red-400 border-red-500/20'
  if (clb <= 7) return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  if (clb <= 9) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
}

function getClbLabel(clb: number | null): string {
  if (clb === null) return 'Below CLB 4'
  return `CLB ${clb}`
}

// ---------------------------------------------------------------------------
// Section Data
// ---------------------------------------------------------------------------

interface SectionConfig {
  id: string
  label: string
  sublabel: string
  max: number
  ranges: CLBRange[]
}

const sections: SectionConfig[] = [
  { id: 'listening', label: 'Compr\u00e9hension Orale', sublabel: 'Listening', max: 360, ranges: listeningRanges },
  { id: 'reading', label: 'Compr\u00e9hension \u00c9crite', sublabel: 'Reading', max: 300, ranges: readingRanges },
  { id: 'speaking', label: 'Expression Orale', sublabel: 'Speaking', max: 450, ranges: speakingRanges },
  { id: 'writing', label: 'Expression \u00c9crite', sublabel: 'Writing', max: 450, ranges: writingRanges },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TEFContent() {
  const [scores, setScores] = useState<Record<string, number>>({
    listening: 0,
    reading: 0,
    speaking: 0,
    writing: 0,
  })

  const results = useMemo(() => {
    const clbs = sections.map((s) => ({
      id: s.id,
      label: s.label,
      sublabel: s.sublabel,
      score: scores[s.id],
      max: s.max,
      clb: getClbLevel(scores[s.id], s.ranges),
    }))

    const validClbs = clbs.map((c) => c.clb).filter((c): c is number => c !== null)
    const overallClb = validClbs.length === 4 ? Math.min(...validClbs) : null
    const crsPerAbility = clbs.map((c) => getCrsPointsPerAbility(c.clb ?? 0))
    const totalCrs = crsPerAbility.reduce((sum, pts) => sum + pts, 0)

    return { clbs, overallClb, totalCrs }
  }, [scores])

  function handleScoreChange(id: string, value: number, max: number) {
    const clamped = Math.max(0, Math.min(max, value))
    setScores((prev) => ({ ...prev, [id]: clamped }))
  }

  function handleReset() {
    setScores({ listening: 0, reading: 0, speaking: 0, writing: 0 })
  }

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'TEF Score Estimator' },
          ]}
        />

        {/* Hero */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-12 text-center"
        >
          <motion.div variants={fadeUpVariant}>
            <SplitText as="h1" preset="blur-in" className="text-text-primary mb-6">
              TEF Canada Score Estimator
            </SplitText>
          </motion.div>
          <motion.p
            variants={fadeUpVariant}
            className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Estimate your TEF Canada scores and see the corresponding CLB levels for Express Entry. Free, instant, no signup.
          </motion.p>
        </motion.section>

        {/* Score Input Sections */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-6 mb-12"
        >
          {sections.map((section) => {
            const clb = getClbLevel(scores[section.id], section.ranges)
            const badgeColor = getClbBadgeColor(clb)
            const pct = section.max > 0 ? (scores[section.id] / section.max) * 100 : 0

            return (
              <motion.div key={section.id} variants={fadeUpVariant}>
                <GlassCard padding="lg">
                  <div className="flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-text-primary">
                          {section.label}
                        </h3>
                        <p className="text-text-tertiary text-sm">{section.sublabel}</p>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${badgeColor}`}
                      >
                        {getClbLabel(clb)}
                      </span>
                    </div>

                    {/* Slider + Input */}
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min={0}
                        max={section.max}
                        value={scores[section.id]}
                        onChange={(e) =>
                          handleScoreChange(section.id, parseInt(e.target.value, 10), section.max)
                        }
                        className="flex-1 h-2 rounded-full appearance-none cursor-pointer
                          bg-bg-tertiary accent-accent-blue
                          [&::-webkit-slider-thumb]:appearance-none
                          [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                          [&::-webkit-slider-thumb]:rounded-full
                          [&::-webkit-slider-thumb]:bg-accent-blue
                          [&::-webkit-slider-thumb]:shadow-md
                          [&::-webkit-slider-thumb]:cursor-pointer
                          [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
                          [&::-moz-range-thumb]:rounded-full
                          [&::-moz-range-thumb]:bg-accent-blue
                          [&::-moz-range-thumb]:border-0
                          [&::-moz-range-thumb]:cursor-pointer"
                        aria-label={`${section.sublabel} score`}
                      />
                      <input
                        type="number"
                        min={0}
                        max={section.max}
                        value={scores[section.id]}
                        onChange={(e) =>
                          handleScoreChange(
                            section.id,
                            parseInt(e.target.value, 10) || 0,
                            section.max
                          )
                        }
                        className="w-20 px-3 py-2 rounded-xl bg-bg-secondary border border-border-visible
                          text-text-primary text-center text-sm font-medium
                          focus:ring-2 focus:ring-accent-blue/50 focus:outline-none
                          [appearance:textfield]
                          [&::-webkit-inner-spin-button]:appearance-none
                          [&::-webkit-outer-spin-button]:appearance-none"
                        aria-label={`${section.sublabel} score input`}
                      />
                      <span className="text-text-tertiary text-sm whitespace-nowrap">
                        / {section.max}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 rounded-full bg-bg-tertiary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent-blue transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}

          {/* Reset button */}
          <motion.div variants={fadeUpVariant} className="flex justify-center">
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <RotateCcw size={14} />
              Reset All Scores
            </Button>
          </motion.div>
        </motion.section>

        <SectionDivider variant="blue" className="mb-12" />

        {/* Results Section */}
        <ScrollReveal>
          <GlassCard padding="lg" className="border-accent-blue/30 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center">
                <BarChart3 size={20} className="text-accent-blue" aria-hidden="true" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-text-primary">
                Your Results
              </h2>
            </div>

            {/* Overall CLB */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="text-center p-6 rounded-2xl bg-bg-secondary/50">
                <p className="text-text-tertiary text-sm mb-2">Overall CLB Level</p>
                <p className="text-5xl font-bold text-text-primary mb-1">
                  {results.overallClb !== null ? results.overallClb : '--'}
                </p>
                <p className="text-text-tertiary text-xs">
                  Minimum of all 4 sections (used by IRCC)
                </p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-bg-secondary/50">
                <p className="text-text-tertiary text-sm mb-2">CRS Language Points</p>
                <p className="text-5xl font-bold text-accent-blue mb-1">
                  {results.totalCrs}
                </p>
                <p className="text-text-tertiary text-xs">
                  First official language (with spouse)
                </p>
              </div>
            </div>

            {/* Per-section breakdown */}
            <div className="space-y-3 mb-6">
              {results.clbs.map((c) => {
                const pct = c.max > 0 ? (c.score / c.max) * 100 : 0
                const crsPoints = getCrsPointsPerAbility(c.clb ?? 0)

                return (
                  <div key={c.id} className="flex items-center gap-4">
                    <span className="text-text-secondary text-sm w-24 shrink-0">
                      {c.sublabel}
                    </span>
                    <div className="flex-1 h-3 rounded-full bg-bg-tertiary overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          background:
                            c.clb === null
                              ? '#71717a'
                              : c.clb <= 5
                                ? '#ef4444'
                                : c.clb <= 7
                                  ? '#f59e0b'
                                  : c.clb <= 9
                                    ? '#10b981'
                                    : '#3b82f6',
                        }}
                      />
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getClbBadgeColor(c.clb)}`}
                    >
                      {getClbLabel(c.clb)}
                    </span>
                    <span className="text-text-tertiary text-xs w-16 text-right">
                      {crsPoints} CRS
                    </span>
                  </div>
                )
              })}
            </div>

            {/* CRS Summary */}
            {results.overallClb !== null && (
              <div className="p-4 rounded-xl bg-accent-blue/5 border border-accent-blue/10">
                <p className="text-text-secondary text-sm">
                  Your CLB <span className="font-semibold text-text-primary">{results.overallClb}</span> gives
                  you <span className="font-semibold text-accent-blue">{results.totalCrs} CRS points</span> for
                  first official language (4 abilities combined, with-spouse scenario).
                </p>
              </div>
            )}
          </GlassCard>
        </ScrollReveal>

        <SectionDivider variant="gold" className="mb-12" />

        {/* Cross-sell CTAs */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <GlassCard padding="lg">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center shrink-0">
                  <Languages size={20} className="text-accent-blue" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                    Practice for TEF Canada
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    1,500+ practice items and 10 deterministic scoring engines to help you reach your target CLB level.
                  </p>
                  <Button href="/products/francaisiq" variant="primary" size="sm">
                    Try Fran\u00e7aisIQ
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </div>
            </GlassCard>

            <GlassCard padding="lg">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                  <BarChart3 size={20} className="text-amber-400" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                    Calculate Your Full CRS Score
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    See how your TEF scores contribute to your total Express Entry ranking.
                  </p>
                  <Button href="/tools/crs-calculator" variant="secondary" size="sm">
                    CRS Calculator
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </div>
            </GlassCard>
          </div>
        </ScrollReveal>

        {/* SEO Content */}
        <ScrollReveal delay={0.15}>
          <GlassCard padding="lg" hover={false}>
            <h2 className="font-heading text-xl font-semibold text-text-primary mb-4">
              About the TEF Canada Score Estimator
            </h2>
            <div className="space-y-3 text-text-secondary text-sm leading-relaxed">
              <p>
                The TEF Canada (Test d&apos;\u00e9valuation de fran\u00e7ais) is one of the accepted French
                language tests for Canadian immigration under Express Entry. Your TEF scores are
                converted to Canadian Language Benchmark (CLB) levels, which directly affect your
                CRS score.
              </p>
              <p>
                This free estimator converts your TEF section scores into CLB levels using the
                official IRCC equivalency chart. Your overall CLB level is determined by the
                lowest of your four section scores — this is the level IRCC uses for your Express
                Entry profile.
              </p>
              <p>
                For Express Entry, French language skills can contribute significant CRS points
                both as a first official language and as a second official language bonus. Strong
                TEF scores are one of the most effective ways to improve your CRS ranking.
              </p>
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </div>
  )
}
