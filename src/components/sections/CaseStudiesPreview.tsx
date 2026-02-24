"use client"

import { motion } from 'framer-motion'
import { ArrowRight, DollarSign, Box, Cog } from 'lucide-react'
import Link from 'next/link'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'

const capabilities = [
  {
    icon: DollarSign,
    tag: 'Financial Services',
    stat: '<$0.01',
    statLabel: 'per interaction',
    title: 'AI-Powered Financial Analysis Without the AI Costs',
    description:
      'Our deterministic-first approach means XBRL parsing and calculations handle the heavy lifting. AI only interprets what computation can\'t — keeping costs near zero.',
    href: '/technology',
    gradient: 'from-[#5B7FFF] to-[#A855F7]',
  },
  {
    icon: Box,
    tag: 'AI Products',
    stat: '4',
    statLabel: 'products in development',
    title: 'From Concept to Production SaaS',
    description:
      'Astrology, chemistry education, fashion supply chain, financial analysis — each built with the same deterministic-first architecture that keeps operating costs under $200/month.',
    href: '/products',
    gradient: 'from-[#10b981] to-[#5B7FFF]',
  },
  {
    icon: Cog,
    tag: 'Custom Systems',
    stat: '95%',
    statLabel: 'deterministic computation',
    title: 'Enterprise AI That Doesn\'t Break the Bank',
    description:
      'Custom systems with full code ownership, built on the MIDAS framework. 95% of processing is deterministic — you only pay for AI when it\'s actually needed.',
    href: '/services',
    gradient: 'from-[#A855F7] to-[#FF9F43]',
  },
]

export function CaseStudiesPreview() {
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
            What we build.
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Architecture patterns and outcomes from MDS-built systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <motion.div key={cap.title} variants={fadeUpVariant}>
              <Link
                href={cap.href}
                className="block group bg-bg-secondary border border-border-custom rounded-2xl p-6 hover:border-accent-mid/30 transition-all duration-200 h-full"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium text-accent-mid bg-accent-mid/10 px-2 py-0.5 rounded-full">
                    {cap.tag}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="font-heading text-4xl font-bold text-text-primary">
                    {cap.stat}
                  </span>
                  <p className="text-text-tertiary text-xs mt-1">{cap.statLabel}</p>
                </div>

                <h3 className="font-heading text-lg font-semibold text-text-primary group-hover:text-white transition-colors mb-2">
                  {cap.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {cap.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-12" variants={fadeUpVariant}>
          <Link
            href="/technology"
            className="inline-flex items-center gap-2 text-accent-start hover:text-accent-mid transition-colors font-medium"
          >
            See our approach
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
