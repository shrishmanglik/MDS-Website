"use client"

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'

const metrics = [
  { value: '99%+', label: 'Extraction accuracy' },
  { value: '100%', label: 'On-premise deployment' },
  { value: '95%', label: 'Clause detection' },
  { value: '2 weeks', label: 'To production' },
] as const

const industries = ['Healthcare', 'Financial Services', 'Legal Tech', 'Education'] as const

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
        <motion.h2
          className="text-text-primary text-2xl md:text-3xl font-heading font-bold text-center mb-12"
          variants={fadeUpVariant}
        >
          Built for real businesses.
        </motion.h2>

        {/* Metrics strip */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          variants={fadeUpVariant}
        >
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <p className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-1">
                {metric.value}
              </p>
              <p className="text-text-secondary text-sm">
                {metric.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Industry badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          variants={fadeUpVariant}
        >
          {industries.map((industry) => (
            <span
              key={industry}
              className="px-4 py-1.5 rounded-full border border-border-visible bg-bg-secondary text-text-secondary text-sm"
            >
              {industry}
            </span>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          className="max-w-2xl mx-auto mb-10 border-l-2 border-accent-primary pl-6"
          variants={fadeUpVariant}
        >
          <p className="text-text-secondary text-base leading-relaxed italic mb-3">
            &ldquo;95% of invoices follow predictable formats. Deterministic template matching handles those perfectly. AI only kicks in for the remaining 5% — keeping costs near zero and accuracy near 100%.&rdquo;
          </p>
          <cite className="text-text-tertiary text-sm not-italic">
            — Invoice Processing Automation, MDS
          </cite>
        </motion.blockquote>

        {/* CTA link */}
        <motion.div className="text-center" variants={fadeUpVariant}>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-accent-primary text-sm font-medium hover:gap-2.5 transition-all"
          >
            Read our case studies
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
