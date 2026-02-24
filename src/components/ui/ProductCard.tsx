import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/lib/products'
import { StatusBadge } from './StatusBadge'

interface ProductCardProps {
  product: Product
  compact?: boolean
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block h-full rounded-2xl border border-border-custom bg-bg-secondary shimmer-border card-hover overflow-hidden"
    >
      {product.featured && (
        <div className="px-4 py-1.5 bg-gradient-to-r from-accent-primary/20 via-accent-end/20 to-accent-primary/20 border-b border-accent-primary/30">
          <span className="text-xs font-semibold uppercase tracking-wider gradient-text">
            Flagship
          </span>
        </div>
      )}

      <div className={compact ? 'p-5' : 'p-6 md:p-8'}>
        <div className="flex items-center justify-between mb-3">
          <StatusBadge status={product.status} />
        </div>

        <h3 className={`font-heading font-semibold text-text-primary mb-1 ${compact ? 'text-lg' : 'text-xl'}`}>
          {product.name}
        </h3>
        <p className="text-text-secondary text-sm mb-3">
          {product.tagline}
        </p>

        {!compact && (
          <p className="text-text-tertiary text-sm leading-relaxed mb-5">
            {product.description}
          </p>
        )}

        {!compact && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {product.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-xs font-mono text-text-tertiary bg-bg-tertiary border border-border-custom"
              >
                {tech}
              </span>
            ))}
            {product.techStack.length > 4 && (
              <span className="px-2 py-0.5 rounded text-xs font-mono text-text-tertiary bg-bg-tertiary border border-border-custom">
                +{product.techStack.length - 4}
              </span>
            )}
          </div>
        )}

        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-primary group-hover:gap-2.5 transition-all">
          Learn More
          <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  )
}
