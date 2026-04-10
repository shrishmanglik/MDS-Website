'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { products } from '@/lib/products'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SplitText } from '@/components/ui/SplitText'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { WaitlistForm } from '@/components/ui/WaitlistForm'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'

const publicProducts = products.filter((p) => p.status !== 'internal')

export function ForPeopleContent() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'For People' },
          ]}
        />

        {/* Hero */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-20 text-center"
        >
          <motion.div variants={fadeUpVariant}>
            <SplitText as="h1" preset="blur-in" className="text-text-primary mb-6">
              Products for People
            </SplitText>
          </motion.div>
          <motion.p
            variants={fadeUpVariant}
            className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Smart tools that run at $0 per interaction. No AI costs, no lag, no
            hallucinations. Built on deterministic engines that work forever.
            {' '}
            <span className="text-text-tertiary text-base">
              Some products are live, others are on the waitlist — join the list to hear when the next one ships.
            </span>
          </motion.p>
        </motion.section>

        {/* Product Catalog */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicProducts.map((product) => (
              <motion.div key={product.slug} variants={fadeUpVariant}>
                <GlassCard padding="lg" className="h-full flex flex-col">
                  <div className="mb-4">
                    <StatusBadge status={product.status} />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">
                    {product.name}
                  </h3>
                  <p className="text-text-secondary text-sm mb-3">
                    {product.tagline}
                  </p>
                  <p className="text-text-tertiary text-xs leading-relaxed mb-6 flex-1">
                    {product.highlight}
                  </p>
                  <div className="mt-auto">
                    {product.externalUrl ? (
                      <Button
                        href={product.externalUrl}
                        variant="primary"
                        size="sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Try Free
                        <ArrowRight size={14} />
                      </Button>
                    ) : product.waitlistEnabled ? (
                      <Button
                        href={`/waitlist/${product.slug}`}
                        variant="secondary"
                        size="sm"
                      >
                        Join Waitlist
                        <ArrowRight size={14} />
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" disabled>
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <SectionDivider variant="gold" className="mb-20" />

        {/* General Waitlist */}
        <ScrollReveal>
          <section className="text-center max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles size={20} className="text-accent-gold" aria-hidden="true" />
              <span className="text-accent-gold text-sm font-medium">Stay in the loop</span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4">
              Get notified about new products
            </h2>
            <p className="text-text-secondary text-sm mb-8">
              Be the first to know when we launch new tools. No spam, ever.
            </p>
            <WaitlistForm productName="MDS Products" productSlug="general" />
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}
