import { products } from '@/lib/products'
import { blogPosts } from '@/lib/blog'
import { caseStudies } from '@/lib/case-studies'
import { SITE } from '@/lib/constants'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

// Captured at build time for static generation
const BUILD_DATE = new Date().toISOString().split('T')[0]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url

  const productUrls = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const blogUrls = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date).toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const caseStudyUrls = caseStudies.map((cs) => ({
    url: `${base}/case-studies/${cs.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: base, lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/services`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/products`, lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/build`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/technology`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/case-studies`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog`, lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/free-audit`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/intake`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/roi-calculator`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/privacy`, lastModified: BUILD_DATE, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: BUILD_DATE, changeFrequency: 'yearly', priority: 0.3 },
    ...productUrls,
    ...blogUrls,
    ...caseStudyUrls,
  ]
}
