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
    <section className="py-24 px-6 bg-bg-secondary">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={fadeUpVariant}
              className="relative"
            >
              {/* Connector line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-6 w-12 h-px">
                  <div
                    className="w-full h-px"
                    style={{
                      background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-end))',
                      opacity: 0.3,
                    }}
                  />
                </div>
              )}

              {/* Vertical connector (mobile) */}
              {index < steps.length - 1 && (
                <div className="md:hidden absolute -bottom-4 left-8 w-px h-8">
                  <div
                    className="w-px h-full mx-auto"
                    style={{
                      background: 'linear-gradient(180deg, var(--accent-primary), transparent)',
                      opacity: 0.3,
                    }}
                  />
                </div>
              )}

              {/* Card */}
              <div className="p-8 rounded-2xl border border-border-custom bg-bg-primary hover:border-border-visible transition-colors">
                {/* Step number — large gradient, high visibility */}
                <span
                  className="block font-mono text-5xl md:text-6xl font-bold mb-5 gradient-text select-none"
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                <h3 className="font-heading text-xl font-semibold text-text-primary mb-3">
                  {step.title}
                </h3>

                <p className="text-text-secondary text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
