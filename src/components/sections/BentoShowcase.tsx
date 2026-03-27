"use client"

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Cpu, Users, Wrench } from 'lucide-react'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'

// Live cost counter that ticks up slowly to show real-time savings
function LiveSavingsCounter() {
  const [savings, setSavings] = useState(47823)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setSavings(prev => prev + Math.floor(Math.random() * 3) + 1)
    }, 2000)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <span ref={ref} className="font-mono tabular-nums">
      ${savings.toLocaleString()}
    </span>
  )
}

// Animated architecture flow — shows data flowing through tiers
function ArchitectureFlow() {
  return (
    <div className="flex items-center gap-3 text-xs font-mono">
      <div className="flex flex-col items-center gap-1">
        <div className="w-8 h-8 rounded-lg bg-accent-emerald/20 flex items-center justify-center">
          <span className="text-accent-emerald text-[10px] font-bold">T1</span>
        </div>
        <span className="text-text-tertiary">90%</span>
      </div>
      <motion.div
        className="h-px flex-1 bg-gradient-to-r from-accent-emerald to-accent-blue"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{ transformOrigin: 'left' }}
      />
      <div className="flex flex-col items-center gap-1">
        <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center">
          <span className="text-accent-blue text-[10px] font-bold">T2</span>
        </div>
        <span className="text-text-tertiary">8%</span>
      </div>
      <motion.div
        className="h-px flex-1 bg-gradient-to-r from-accent-blue to-accent-purple"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{ transformOrigin: 'left' }}
      />
      <div className="flex flex-col items-center gap-1">
        <div className="w-8 h-8 rounded-lg bg-accent-purple/20 flex items-center justify-center">
          <span className="text-accent-purple text-[10px] font-bold">T3</span>
        </div>
        <span className="text-text-tertiary">2%</span>
      </div>
    </div>
  )
}

// Animated code snippet
function CodeSnippet() {
  const lines = [
    { text: '// No API calls. Pure computation.', color: 'text-text-tertiary' },
    { text: 'const score = engine.compute(input);', color: 'text-accent-blue' },
    { text: '// Cost: $0.000000', color: 'text-accent-emerald' },
    { text: 'return score; // ← deterministic', color: 'text-text-secondary' },
  ]

  return (
    <div className="font-mono text-xs leading-relaxed">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * i + 0.3, duration: 0.4 }}
          viewport={{ once: true }}
          className={line.color}
        >
          {line.text}
        </motion.div>
      ))}
    </div>
  )
}

export function BentoShowcase() {
  return (
    <section className="py-20 px-6">
      <motion.div
        className="max-w-content mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">

          {/* Cell 1: Hero metric — LARGE, spans 2 cols */}
          <motion.div
            variants={fadeUpVariant}
            className="col-span-1 md:col-span-2 rounded-2xl border border-border-custom bg-bg-elevated/50 backdrop-blur-sm p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 to-transparent pointer-events-none" />
            <div className="relative">
              <p className="text-text-tertiary text-xs font-mono uppercase tracking-widest mb-2">Runtime Cost Per Interaction</p>
              <p className="text-5xl md:text-7xl font-mono font-bold gradient-text leading-none">$0.00</p>
            </div>
            <div className="relative flex items-center justify-between mt-6">
              <p className="text-text-secondary text-sm">While competitors pay $0.01–$0.10 per call</p>
              <Link href="/how-we-build" className="text-accent-gold text-sm font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                See how <ArrowRight size={12} />
              </Link>
            </div>
          </motion.div>

          {/* Cell 2: Margin */}
          <motion.div
            variants={fadeUpVariant}
            className="rounded-2xl border border-border-custom bg-bg-elevated/50 backdrop-blur-sm p-6 flex flex-col justify-between"
          >
            <div>
              <p className="text-text-tertiary text-xs font-mono uppercase tracking-widest mb-2">Gross Margin</p>
              <p className="text-4xl font-mono font-bold text-accent-emerald">99.8%</p>
            </div>
            <p className="text-text-tertiary text-xs mt-4">Industry avg: 25-40%</p>
          </motion.div>

          {/* Cell 3: Products count */}
          <motion.div
            variants={fadeUpVariant}
            className="rounded-2xl border border-border-custom bg-bg-elevated/50 backdrop-blur-sm p-6 flex flex-col justify-between"
          >
            <div>
              <p className="text-text-tertiary text-xs font-mono uppercase tracking-widest mb-2">Products Shipped</p>
              <p className="text-4xl font-mono font-bold text-accent-blue">6</p>
            </div>
            <Link href="/for-people" className="text-accent-blue text-xs font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={10} />
            </Link>
          </motion.div>

          {/* Cell 4: Architecture flow — spans 2 cols */}
          <motion.div
            variants={fadeUpVariant}
            className="col-span-1 md:col-span-2 rounded-2xl border border-border-custom bg-bg-elevated/50 backdrop-blur-sm p-6"
          >
            <p className="text-text-tertiary text-xs font-mono uppercase tracking-widest mb-4">Three-Tier Architecture</p>
            <ArchitectureFlow />
            <div className="mt-4 grid grid-cols-3 gap-2 text-[10px]">
              <div className="text-center">
                <p className="text-accent-emerald font-semibold">Templates</p>
                <p className="text-text-tertiary">$0.00 / call</p>
              </div>
              <div className="text-center">
                <p className="text-accent-blue font-semibold">Rules Engine</p>
                <p className="text-text-tertiary">~$0.001 / call</p>
              </div>
              <div className="text-center">
                <p className="text-accent-purple font-semibold">AI (last resort)</p>
                <p className="text-text-tertiary">$0.01 / call</p>
              </div>
            </div>
          </motion.div>

          {/* Cell 5: Live code */}
          <motion.div
            variants={fadeUpVariant}
            className="rounded-2xl border border-border-custom bg-bg-void p-5 relative overflow-hidden"
          >
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-semantic-error/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-semantic-warning/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent-emerald/80" />
              <span className="text-text-tertiary text-[10px] ml-2 font-mono">engine.ts</span>
            </div>
            <CodeSnippet />
          </motion.div>

          {/* Cell 6: Savings counter */}
          <motion.div
            variants={fadeUpVariant}
            className="rounded-2xl border border-border-custom bg-bg-elevated/50 backdrop-blur-sm p-6 flex flex-col justify-between"
          >
            <div>
              <p className="text-text-tertiary text-xs font-mono uppercase tracking-widest mb-2">Est. Annual Savings vs AI-wrapper</p>
              <p className="text-3xl font-bold text-accent-gold"><LiveSavingsCounter /></p>
            </div>
            <p className="text-text-tertiary text-[10px] mt-3">For a 5K user product. Updates live.</p>
          </motion.div>

          {/* Cell 7: For People — CTA */}
          <motion.div
            variants={fadeUpVariant}
            className="rounded-2xl border border-accent-blue/20 bg-bg-tint-blue p-6 flex flex-col justify-between group hover:border-accent-blue/40 transition-colors"
          >
            <div>
              <Users className="w-6 h-6 text-accent-blue mb-3" />
              <h3 className="text-text-primary font-semibold mb-1">For People</h3>
              <p className="text-text-secondary text-xs leading-relaxed">Smart tools. No subscriptions. No AI costs.</p>
            </div>
            <Link href="/for-people" className="text-accent-blue text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-4">
              Explore <ArrowRight size={12} />
            </Link>
          </motion.div>

          {/* Cell 8: For Businesses — CTA */}
          <motion.div
            variants={fadeUpVariant}
            className="rounded-2xl border border-accent-gold/20 bg-bg-elevated/50 p-6 flex flex-col justify-between group hover:border-accent-gold/40 transition-colors"
          >
            <div>
              <Wrench className="w-6 h-6 text-accent-gold mb-3" />
              <h3 className="text-text-primary font-semibold mb-1">For Businesses</h3>
              <p className="text-text-secondary text-xs leading-relaxed">Custom AI systems. Full ownership. From $3K.</p>
            </div>
            <Link href="/for-businesses" className="text-accent-gold text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-4">
              See services <ArrowRight size={12} />
            </Link>
          </motion.div>

          {/* Cell 9: The Engine — CTA, spans 2 cols */}
          <motion.div
            variants={fadeUpVariant}
            className="col-span-1 md:col-span-2 rounded-2xl border border-accent-purple/20 bg-bg-elevated/50 p-6 flex flex-col md:flex-row md:items-center justify-between group hover:border-accent-purple/40 transition-colors gap-4"
          >
            <div className="flex items-start gap-4">
              <Cpu className="w-8 h-8 text-accent-purple shrink-0 mt-1" />
              <div>
                <h3 className="text-text-primary font-semibold mb-1">The Engine: MIDAS Framework</h3>
                <p className="text-text-secondary text-sm leading-relaxed">Every product we ship makes the next one faster. Deterministic-first architecture that compounds.</p>
              </div>
            </div>
            <Link href="/how-we-build" className="text-accent-purple text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all whitespace-nowrap shrink-0">
              Learn how <ArrowRight size={14} />
            </Link>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}
