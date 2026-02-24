import { products } from '@/lib/products'
import { blogPosts } from '@/lib/blog'
import { caseStudies } from '@/lib/case-studies'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const LAST_UPDATED = '2026-02-23'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://milliondollarstudio.ai'

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const blogUrls = blogPosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const caseStudyUrls = caseStudies.map((cs) => ({
    url: `${baseUrl}/case-studies/${cs.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: baseUrl, lastModified: LAST_UPDATED, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/products`, lastModified: LAST_UPDATED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/build`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/technology`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/case-studies`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: LAST_UPDATED, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/free-audit`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/intake`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/roi-calculator`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: LAST_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: LAST_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
    ...productUrls,
    ...blogUrls,
    ...caseStudyUrls,
  ]
}
