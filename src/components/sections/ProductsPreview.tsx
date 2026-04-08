"use client"

import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { products } from '@/lib/products'
import { FEATURED_PRODUCT_SLUGS } from '@/lib/constants'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'
import { SplitText } from '@/components/ui/SplitText'

const featuredProducts = products.filter((p) =>
  (FEATURED_PRODUCT_SLUGS as readonly string[]).includes(p.slug)
)

// Color accents per product for visual variety
const productAccents: Record<string, { border: string; glow: string; bg: string }> = {
  francaisiq: { border: 'border-accent-blue/30', glow: 'shadow-[0_0_40px_rgba(41,98,255,0.08)]', bg: 'from-accent-blue/5' },
  jyotishai: { border: 'border-accent-purple/30', glow: 'shadow-[0_0_40px_rgba(124,58,237,0.08)]', bg: 'from-accent-purple/5' },
  chemai: { border: 'border-accent-emerald/30', glow: 'shadow-[0_0_40px_rgba(16,185,129,0.08)]', bg: 'from-accent-emerald/5' },
}

export function ProductsPreview() {
  return (
    <section className="py-24 px-6 relative">
      {/* Subtle ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/50 to-bg-primary pointer-events-none" />

      <div className="max-w-content mx-auto relative">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-text-tertiary text-xs font-mono uppercase tracking-[0.2em] mb-4">Portfolio</p>
          <SplitText
            as="h2"
            preset="blur-in"
            className="font-heading text-3xl md:text-5xl font-bold text-text-primary mb-4"
          >
            Systems We&apos;ve Shipped
          </SplitText>
          <p className="text-text-secondary text-lg max-w-xl">
            Each product proves the architecture. Real code. Real tests. Real economics.
          </p>
        </motion.div>

        {/* Product cards — stacked, full-width, horizontal layout */}
        <div className="space-y-6">
          {featuredProducts.map((product, index) => {
            const accent = productAccents[product.slug] || productAccents.francaisiq
            return (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/products/${product.slug}`} className="block group">
                  <div className={`rounded-2xl border ${accent.border} ${accent.glow} bg-gradient-to-r ${accent.bg} to-transparent backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:scale-[1.01] hover:border-opacity-60`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      {/* Left: Product info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <StatusBadge status={product.status} />
                          {product.featured && (
                            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-gold shimmer-badge px-2 py-0.5 rounded-full border border-accent-gold/20">
                              Flagship
                            </span>
                          )}
                        </div>
                        <h3 className="text-text-primary text-xl md:text-2xl font-heading font-bold mb-2 group-hover:text-white transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-3">
                          {product.tagline}
                        </p>
                        {product.highlight && (
                          <p className="text-text-tertiary text-xs font-mono">
                            {product.highlight}
                          </p>
                        )}
                      </div>

                      {/* Right: CTA */}
                      <div className="flex items-center gap-4 shrink-0">
                        {product.externalUrl ? (
                          <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-blue group-hover:text-white transition-colors">
                            Try it live <ExternalLink size={14} />
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary group-hover:text-white transition-colors">
                            View build <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom link */}
        <motion.div
          className="mt-10 flex items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-text-tertiary text-xs font-mono">
            {products.length} products total · {products.filter(p => p.status === 'live').length} live
          </p>
          <Link
            href="/for-people"
            className="inline-flex items-center gap-2 text-accent-blue hover:text-white transition-colors text-sm font-medium"
          >
            View all products <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
