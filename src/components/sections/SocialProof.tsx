"use client"

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'
import { SplitText } from '@/components/ui/SplitText'

export function SocialProof() {
  return (
    <section className="relative py-20 px-6 border-t border-border-custom">
      <motion.div
        className="max-w-content mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <SplitText
          as="h2"
          preset="fade-up"
          className="text-text-primary text-2xl md:text-3xl font-heading font-bold text-center mb-12"
        >
          The Numbers.
        </SplitText>

        {/* Metrics strip */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 p-6 md:p-8 rounded-2xl border border-border-custom bg-bg-elevated/50 backdrop-blur-sm"
          variants={fadeUpVariant}
        >
          <Link href="/products" className="text-center md:border-r md:border-border-custom hover:opacity-80 transition-opacity">
            <p className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-1">
              6
            </p>
            <p className="text-text-secondary text-sm">Products Built</p>
          </Link>
          <Link href="/technology#cost-model" className="text-center md:border-r md:border-border-custom hover:opacity-80 transition-opacity">
            <p className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-1">
              &lt;$0.01
            </p>
            <p className="text-text-secondary text-sm">Per Interaction</p>
          </Link>
          <Link href="/technology#infrastructure" className="text-center md:border-r md:border-border-custom hover:opacity-80 transition-opacity">
            <p className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-1">
              $0
            </p>
            <p className="text-text-secondary text-sm">Hosting Baseline</p>
          </Link>
          <Link href="/services" className="text-center hover:opacity-80 transition-opacity">
            <p className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-1">
              From $3K
            </p>
            <p className="text-text-secondary text-sm">Services Starting Price</p>
          </Link>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          className="max-w-2xl mx-auto mb-10 border-l-2 border-accent-gold pl-6"
          variants={fadeUpVariant}
        >
          <p className="text-text-secondary text-base leading-relaxed italic mb-3">
            &ldquo;AI built the prototype. Then we replaced the AI with math. FrançaisIQ runs 9 scoring engines, 4,000+ practice items, and zero AI calls at runtime.&rdquo;
          </p>
          <Link href="/case-studies" className="text-text-tertiary text-sm not-italic hover:text-accent-blue transition-colors">
            — FrançaisIQ Build Log
          </Link>
        </motion.blockquote>

        {/* CTA link */}
        <motion.div className="text-center" variants={fadeUpVariant}>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-accent-blue text-sm font-medium hover:gap-2.5 transition-all"
          >
            See our build logs
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
