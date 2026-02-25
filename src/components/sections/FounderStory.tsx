"use client"

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'
import { Button } from '@/components/ui/Button'
import { FlowMotif } from '@/components/ui/FlowMotif'

export function FounderStory() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Decorative flow motif */}
      <FlowMotif className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-4xl opacity-30 pointer-events-none" />

      <motion.div
        className="max-w-3xl mx-auto text-center relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div variants={fadeUpVariant}>
          <span className="inline-block font-mono text-xs uppercase tracking-widest text-accent-primary mb-6">
            The Builder
          </span>
        </motion.div>

        <motion.h2
          className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-6"
          variants={fadeUpVariant}
        >
          Built by One Person.{' '}
          <span className="gradient-text">Trusted by Many.</span>
        </motion.h2>

        <motion.p
          className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4"
          variants={fadeUpVariant}
        >
          Shrish Manglik built every product in this portfolio — solo. Using
          AI-assisted development and deterministic-first architecture, one
          builder consistently delivers what teams of ten struggle to ship.
        </motion.p>

        <motion.p
          className="text-text-tertiary text-base md:text-lg leading-relaxed mb-10"
          variants={fadeUpVariant}
        >
          That&apos;s not a boast — it&apos;s the methodology we bring to every
          client project. Speed, precision, and full ownership.
        </motion.p>

        <motion.div variants={fadeUpVariant}>
          <Button href="/about" variant="secondary" size="md">
            Meet the Builder
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
