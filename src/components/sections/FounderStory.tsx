"use client"

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'
import { Button } from '@/components/ui/Button'
import { FlowMotif } from '@/components/ui/FlowMotif'
import { SplitText } from '@/components/ui/SplitText'

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
          <span className="inline-block font-mono text-xs uppercase tracking-widest text-accent-blue mb-6">
            The Builder
          </span>
        </motion.div>

        <SplitText
          as="h2"
          preset="scramble"
          className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-6"
        >
          The Builder Behind It All.
        </SplitText>

        <motion.p
          className="text-text-secondary text-lg md:text-xl leading-relaxed mb-4"
          variants={fadeUpVariant}
        >
          Shrish Manglik — systems architect, former TELUS Health engineer. 6
          products built using the same deterministic-first architecture. Every
          system I build makes the next one faster.
        </motion.p>

        <motion.p
          className="text-text-tertiary text-base md:text-lg leading-relaxed mb-10"
          variants={fadeUpVariant}
        >
          AI-assisted development, deterministic-first architecture, and full
          code ownership on every project.
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
