import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { products, getProductBySlug } from '@/lib/products'
import { breadcrumbJsonLd, webPageJsonLd } from '@/lib/structured-data'
import { WaitlistPageContent } from './WaitlistPageContent'

export function generateStaticParams() {
  return products
    .filter((p) => p.waitlistEnabled)
    .map((p) => ({ product: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string }>
}): Promise<Metadata> {
  const { product: slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Waitlist | MDS' }

  return {
    title: `Join the ${product.name} Waitlist | Million Dollar AI Studio`,
    description: `${product.tagline} Be the first to know when ${product.name} launches.`,
    alternates: { canonical: `/waitlist/${slug}` },
    openGraph: {
      title: `Join the ${product.name} Waitlist`,
      description: `${product.tagline} Be the first to know when ${product.name} launches.`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} Waitlist`,
      description: product.tagline,
    },
  }
}

export default async function WaitlistPage({
  params,
}: {
  params: Promise<{ product: string }>
}) {
  const { product: slug } = await params
  const product = getProductBySlug(slug)

  if (!product || !product.waitlistEnabled) {
    notFound()
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: 'Home', url: '/' },
            { name: 'For People', url: '/for-people' },
            { name: `${product.name} Waitlist`, url: `/waitlist/${slug}` },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd({
            name: `${product.name} Waitlist`,
            description: `${product.tagline} Be the first to know when ${product.name} launches.`,
            path: `/waitlist/${slug}`,
          })),
        }}
      />
      <WaitlistPageContent
        name={product.name}
        slug={product.slug}
        tagline={product.tagline}
        description={product.description}
        status={product.status}
      />
    </>
  )
}
