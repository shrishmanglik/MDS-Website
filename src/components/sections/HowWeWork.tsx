"use client"

import { motion } from 'framer-motion'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'

const steps = [
  {
    number: '01',
    title: 'You tell us what you need',
    description:
      'Brief call or form submission. We listen, ask the right questions, and scope the work.',
  },
  {
    number: '02',
    title: 'We architect and build',
    description:
      'AI-powered development in days, not months. Progress updates every step of the way.',
  },
  {
    number: '03',
    title: 'You own everything',
    description:
      'Full code, documentation, training, and ongoing support. No lock-in. No surprises.',
  },
]

export function HowWeWork() {
  return (
    <section className="py-24 px-6">
      <motion.div
        className="max-w-content mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div className="text-center mb-16" variants={fadeUpVariant}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            How We Work
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Simple, transparent, and fast. No surprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={fadeUpVariant}
              className="relative p-6 rounded-2xl border border-border-custom bg-bg-secondary"
            >
              {/* Connector line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 border-t border-dashed border-border-visible" />
              )}

              <span className="font-mono text-3xl font-bold text-bg-hover mb-4 block">
                {step.number}
              </span>
              <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
