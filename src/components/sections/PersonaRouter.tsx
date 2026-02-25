"use client"

import { motion } from 'framer-motion'
import { ArrowRight, Wrench, Box, Cog } from 'lucide-react'
import Link from 'next/link'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'

const personas = [
  {
    icon: Wrench,
    title: 'I need AI built for my business',
    description: 'Custom AI systems scoped to your workflows. From $3K prototypes to full enterprise builds.',
    cta: 'Explore Services',
    href: '/services',
  },
  {
    icon: Box,
    title: 'I want to use an AI product',
    description: 'Production SaaS tools for finance, astrology, chemistry, and more. Ready to deploy.',
    cta: 'Browse Products',
    href: '/products',
  },
  {
    icon: Cog,
    title: 'I need a technical partner',
    description: 'Enterprise-grade AI architecture, built by one person who moves faster than teams of ten.',
    cta: 'Build With Us',
    href: '/build',
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
                className="group block p-6 rounded-2xl border border-border-custom bg-bg-secondary hover:border-accent-primary/30 transition-colors h-full card-tilt"
              >
                <persona.icon className="w-8 h-8 text-accent-primary mb-4" aria-hidden="true" />
                <h3 className="text-text-primary text-lg font-semibold mb-2 font-heading">
                  {persona.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {persona.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-accent-primary text-sm font-medium group-hover:gap-2.5 transition-all">
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
