'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { WaitlistForm } from '@/components/ui/WaitlistForm'
import { staggerContainer, fadeUpVariant } from '@/lib/animations'

interface WaitlistPageContentProps {
  name: string
  slug: string
  tagline: string
  description: string
  status: 'coming-soon' | 'in-development' | 'beta' | 'live' | 'desktop' | 'built' | 'prd' | 'internal'
}

export function WaitlistPageContent({
  name,
  slug,
  tagline,
  description,
  status,
}: WaitlistPageContentProps) {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'For People', href: '/for-people' },
            { label: `${name} Waitlist` },
          ]}
        />

        {/* Back link */}
        <Link
          href="/for-people"
          className="inline-flex items-center gap-1.5 text-text-tertiary hover:text-text-secondary text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to products
        </Link>

        {/* Content */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUpVariant} className="mb-4">
            <StatusBadge status={status} />
          </motion.div>

          <motion.h1
            variants={fadeUpVariant}
            className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-3"
          >
            {name}
          </motion.h1>

          <motion.p
            variants={fadeUpVariant}
            className="text-text-secondary text-lg mb-2"
          >
            {tagline}
          </motion.p>

          <motion.p
            variants={fadeUpVariant}
            className="text-text-tertiary text-sm leading-relaxed mb-10"
          >
            {description}
          </motion.p>
        </motion.section>

        {/* Waitlist Form */}
        <ScrollReveal delay={0.2}>
          <div className="rounded-2xl border border-border-custom bg-bg-secondary p-8">
            <h2 className="font-heading text-xl font-semibold text-text-primary mb-2">
              Join the Waitlist
            </h2>
            <p className="text-text-secondary text-sm mb-6">
              Be the first to know when {name} launches. No spam, ever.
            </p>
            <WaitlistForm productName={name} productSlug={slug} />
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
