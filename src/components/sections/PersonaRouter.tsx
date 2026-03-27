"use client"

import { motion } from 'framer-motion'
import { ArrowRight, Wrench, Box, Cog } from 'lucide-react'
import Link from 'next/link'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'

const personas = [
  {
    icon: Box,
    title: 'For People',
    description: 'Smart tools that work without internet, without subscriptions, without AI costs. Explore our products.',
    cta: 'Explore Products',
    href: '/for-people',
  },
  {
    icon: Wrench,
    title: 'For Businesses',
    description: 'AI systems you own completely. Near-zero marginal cost. No vendor lock-in. See our services.',
    cta: 'See Services',
    href: '/for-businesses',
  },
  {
    icon: Cog,
    title: 'The Engine',
    description: 'The MIDAS framework. Deterministic-first architecture. Learn how we build.',
    cta: 'Learn Our Method',
    href: '/how-we-build',
  },
] as const

export function PersonaRouter() {
  return (
    <section className="relative py-16 px-6 bg-bg-tint-blue ambient-orb ambient-orb--blue">
      <motion.div
        className="max-w-content mx-auto relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.p
          className="text-text-tertiary text-sm uppercase tracking-widest text-center mb-10"
          variants={fadeUpVariant}
        >
          What brings you here?
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {personas.map((persona) => (
            <motion.div key={persona.href} variants={fadeUpVariant}>
              <Link
                href={persona.href}
                className="group block p-6 rounded-2xl border border-border-custom bg-bg-secondary hover:border-accent-blue/30 transition-colors h-full card-tilt"
              >
                <persona.icon className="w-8 h-8 text-accent-blue mb-4" aria-hidden="true" />
                <h3 className="text-text-primary text-lg font-semibold mb-2 font-heading">
                  {persona.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {persona.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-accent-blue text-sm font-medium group-hover:gap-2.5 transition-all">
                  {persona.cta}
                  <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
