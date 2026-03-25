import type { Metadata } from 'next'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/ui/ProductCard'

export const metadata: Metadata = {
  title: '6 Products. One Architecture. Zero AI Costs. | Million Dollar AI Studio',
  description:
    'Each product proves the thesis: AI builds it, deterministic systems run it. See what we\'ve built — and the architecture behind each one.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: '6 Products. One Architecture. Zero AI Costs. | Million Dollar AI Studio',
    description:
      'Each product proves the thesis: AI builds it, deterministic systems run it. See what we\'ve built — and the architecture behind each one.',
  },
  twitter: {
    card: 'summary_large_image',
    title: '6 Products. One Architecture. Zero AI Costs. | Million Dollar AI Studio',
    description:
      'Each product proves the thesis: AI builds it, deterministic systems run it.',
  },
}

export default function ProductsPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-content mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-text-primary mb-4">
            6 products.{' '}
            <span className="gradient-text">
              One architecture. Zero AI costs.
            </span>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
            Each product proves the thesis: AI builds it, deterministic systems run it.
            See what we&apos;ve built &mdash; and the architecture behind each one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <div className="text-center mt-16 pt-8 border-t border-border-custom">
          <p className="text-text-secondary text-sm mb-2">
            We build new products regularly.
          </p>
          <a
            href="https://www.linkedin.com/company/milliondollaraistudio/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-blue hover:text-accent-purple transition-colors text-sm font-medium"
          >
            Follow our journey on LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
}
