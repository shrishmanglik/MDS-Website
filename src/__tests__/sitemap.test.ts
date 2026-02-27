import { describe, it, expect } from 'vitest'

// Import the sitemap function directly
import sitemap from '@/app/sitemap'

describe('sitemap', () => {
  const entries = sitemap()

  it('includes all core pages', () => {
    const urls = entries.map((e) => e.url)
    const corePages = [
      '/services',
      '/products',
      '/build',
      '/technology',
      '/about',
      '/contact',
      '/blog',
      '/free-audit',
      '/intake',
    ]
    for (const page of corePages) {
      expect(urls.some((u) => u.endsWith(page))).toBe(true)
    }
  })

  it('includes product pages', () => {
    const productUrls = entries.filter((e) => e.url.includes('/products/'))
    expect(productUrls.length).toBeGreaterThan(0)
  })

  it('includes blog pages', () => {
    const blogUrls = entries.filter((e) => e.url.includes('/blog/'))
    expect(blogUrls.length).toBeGreaterThan(0)
  })

  it('includes case study pages', () => {
    const csUrls = entries.filter((e) => e.url.includes('/case-studies/'))
    expect(csUrls.length).toBeGreaterThan(0)
  })

  it('all entries have lastModified date', () => {
    for (const entry of entries) {
      expect(entry.lastModified).toBeDefined()
      expect(typeof entry.lastModified).toBe('string')
    }
  })

  it('homepage has priority 1.0', () => {
    const home = entries.find((e) => !e.url.includes('/') || e.url.endsWith('.ai'))
    expect(home?.priority).toBe(1.0)
  })

  it('blog posts use their published dates', () => {
    const blogUrls = entries.filter((e) => e.url.includes('/blog/'))
    // Blog dates should be parseable
    for (const entry of blogUrls) {
      const date = new Date(entry.lastModified as string)
      expect(date.getTime()).not.toBeNaN()
    }
  })
})
