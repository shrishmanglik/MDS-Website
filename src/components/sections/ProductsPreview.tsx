"use client"

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/ui/ProductCard'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'

export function ProductsPreview() {
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
            Products we&apos;ve built
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Every product below was designed, built, and deployed by MDS.
            These aren&apos;t mockups.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <motion.div key={product.slug} variants={fadeUpVariant}>
              <ProductCard product={product} compact />
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-12" variants={fadeUpVariant}>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-purple transition-colors font-medium"
          >
            View all products
            <ArrowRight size={16} />
          </Link>
          <p className="text-text-tertiary text-xs mt-2">
            Real SaaS. Real users. Built solo with AI-assisted development.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
