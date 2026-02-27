import type { Metadata } from 'next'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/ui/ProductCard'

export const metadata: Metadata = {
  title: 'AI Products | AstroAI, ChemAI, Thread Intelligence',
  description:
    'Vertical AI products built on deterministic-first architecture. 95% computation, 5% AI — designed for scale at $0.01/interaction.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'AI Products | Million Dollar AI Studio',
    description:
      'Vertical AI products built on deterministic-first architecture. 95% computation, 5% AI — designed for scale.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Products | Million Dollar AI Studio',
    description:
      'Vertical AI products built on deterministic-first architecture.',
  },
}

export default function ProductsPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-content mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-text-primary mb-4">
            AI products we{' '}
            <span className="gradient-text">
              build and operate.
            </span>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
            Real AI systems across finance, fashion, education, and science &mdash;
            designed, architected, and built by MDS. Each one proves what we ship for clients.
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
