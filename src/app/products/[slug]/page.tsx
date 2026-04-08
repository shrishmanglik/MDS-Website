import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { notFound } from 'next/navigation'
import { products, getProductBySlug } from '@/lib/products'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { WaitlistForm } from '@/components/ui/WaitlistForm'
import { Button } from '@/components/ui/Button'
import { productJsonLd, breadcrumbJsonLd } from '@/lib/structured-data'

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Product Not Found' }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url: `/products/${slug}`,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
    },
    alternates: { canonical: `/products/${slug}` },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="pt-24 pb-16 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            productJsonLd({
              name: product.name,
              description: product.tagline,
              slug: product.slug,
              status: product.status,
            }),
            breadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: 'Products', url: '/products' },
              { name: product.name, url: `/products/${product.slug}` },
            ]),
          ]),
        }}
      />
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-text-tertiary hover:text-text-secondary text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Products
        </Link>

        {/* Header */}
        <div className="mb-8">
          <StatusBadge status={product.status} />
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-4 mb-2">
            {product.name}
          </h1>
          <p className="text-text-secondary text-lg md:text-xl">
            {product.tagline}
          </p>
        </div>

        {/* CTA: Try or Waitlist or Contact fallback */}
        <div className="mb-10">
          {product.externalUrl ? (
            <Button
              href={product.externalUrl}
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Try {product.name}
              <ArrowRight size={16} />
            </Button>
          ) : product.waitlistEnabled ? (
            <WaitlistForm
              productName={product.name}
              productSlug={product.slug}
            />
          ) : (
            <div className="rounded-2xl border border-border-custom bg-bg-secondary p-6">
              <p className="text-text-secondary text-sm mb-4">
                {product.name} is an internal tool — not currently available to the public.
                Interested in how we built it?
              </p>
              <Button href="/case-studies" variant="secondary" size="md">
                Read the Build Log
                <ArrowRight size={16} />
              </Button>
            </div>
          )}
        </div>

        {/* Gradient placeholder for screenshot */}
        <div className="rounded-2xl border border-border-custom bg-gradient-to-br from-accent-blue/10 via-accent-purple/5 to-transparent h-64 md:h-80 flex items-center justify-center mb-12">
          <span className="text-text-tertiary text-sm">
            {product.name} Preview
          </span>
        </div>

        {/* What it does */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-semibold text-text-primary mb-4">
            What it does
          </h2>
          <div className="text-text-secondary leading-relaxed space-y-4">
            {product.longDescription.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-semibold text-text-primary mb-4">
            Key Features
          </h2>
          <ul className="space-y-3">
            {product.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-text-secondary"
              >
                <Check
                  size={16}
                  className="text-accent-emerald mt-0.5 flex-shrink-0"
                  aria-hidden="true"
                />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-semibold text-text-primary mb-4">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {product.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-sm font-mono text-text-secondary bg-bg-tertiary border border-border-custom"
              >
                {tech}
              </span>
            ))}
          </div>
          {product.buildTime && (
            <p className="text-text-tertiary text-sm mt-3">
              {product.buildTime}
            </p>
          )}
        </section>

        {/* The Story */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-semibold text-text-primary mb-4">
            The Story
          </h2>
          <p className="text-text-secondary leading-relaxed">
            {product.story}
          </p>
        </section>

        {/* Other products */}
        {(() => {
          const others = products
            .filter((p) => p.slug !== product.slug && p.status !== 'internal')
            .slice(0, 3)
          if (others.length === 0) return null
          return (
            <section className="mb-12">
              <h2 className="font-heading text-2xl font-semibold text-text-primary mb-4">
                Other products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {others.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/products/${other.slug}`}
                    className="group rounded-2xl border border-border-custom bg-bg-secondary p-5 card-hover"
                  >
                    <h3 className="font-heading font-semibold text-text-primary group-hover:text-white transition-colors text-base mb-1">
                      {other.name}
                    </h3>
                    <p className="text-text-secondary text-xs leading-relaxed mb-3">
                      {other.tagline}
                    </p>
                    <span className="inline-flex items-center gap-1 text-accent-blue text-xs font-medium group-hover:gap-2 transition-all">
                      View <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )
        })()}

        {/* Cross-sell CTA */}
        <div className="rounded-2xl border border-border-custom bg-bg-secondary p-8 text-center">
          <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">
            Want something like this built for you?
          </h3>
          <p className="text-text-secondary text-sm mb-5">
            We build custom AI systems from scratch. Full code ownership.
          </p>
          <Button href="/for-businesses" variant="primary" size="md">
            Build Your AI With Us
            <ArrowRight size={16} />
          </Button>
          <p className="text-text-tertiary text-xs mt-3">
            Fixed price. Fast delivery. You own everything.
          </p>
        </div>
      </div>
    </div>
  )
}
