"use client"

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'
import { CountUp } from '@/components/ui/CountUp'
import { SplitText } from '@/components/ui/SplitText'
import { Marquee } from '@/components/ui/Marquee'

const industries = [
  'Healthcare', 'Financial Services', 'Legal Tech', 'Education',
  'Logistics', 'Real Estate', 'E-Commerce', 'Manufacturing',
] as const

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
          Built for real businesses.
        </SplitText>

        {/* Metrics strip */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 p-6 md:p-8 rounded-2xl border border-border-custom bg-bg-elevated/50 backdrop-blur-sm"
          variants={fadeUpVariant}
        >
          <div className="text-center md:border-r md:border-border-custom">
            <p className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-1">
              &lt;$0.01
            </p>
            <p className="text-text-secondary text-sm">Cost per AI interaction</p>
          </div>
          <div className="text-center md:border-r md:border-border-custom">
            <p className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-1">
              <CountUp end={99} suffix="%+" />
            </p>
            <p className="text-text-secondary text-sm">Extraction accuracy</p>
          </div>
          <div className="text-center md:border-r md:border-border-custom">
            <p className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-1">
              <CountUp end={95} suffix="%" />
            </p>
            <p className="text-text-secondary text-sm">Deterministic processing</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-1">
              <CountUp end={2} suffix=" weeks" />
            </p>
            <p className="text-text-secondary text-sm">To production</p>
          </div>
        </motion.div>

        {/* Industry badges — infinite marquee */}
        <motion.div className="mb-12 -mx-6" variants={fadeUpVariant}>
          <Marquee speed={40} pauseOnHover gap="0.75rem">
            {industries.map((industry) => (
              <span
                key={industry}
                className="px-4 py-1.5 rounded-full border border-border-visible bg-bg-secondary text-text-secondary text-sm whitespace-nowrap"
              >
                {industry}
              </span>
            ))}
          </Marquee>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          className="max-w-2xl mx-auto mb-10 border-l-2 border-accent-gold pl-6"
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
            className="inline-flex items-center gap-1.5 text-accent-blue text-sm font-medium hover:gap-2.5 transition-all"
          >
            Read our case studies
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
