import { describe, it, expect } from 'vitest'
import {
  breadcrumbJsonLd,
  articleJsonLd,
  serviceJsonLd,
  faqJsonLd,
  professionalServiceJsonLd,
  webPageJsonLd,
  productJsonLd,
} from '@/lib/structured-data'

describe('structured-data', () => {
  it('breadcrumbJsonLd generates valid BreadcrumbList', () => {
    const result = breadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
    ])
    expect(result['@type']).toBe('BreadcrumbList')
    expect(result['@context']).toBe('https://schema.org')
    expect(result.itemListElement).toHaveLength(2)
    expect(result.itemListElement[0].position).toBe(1)
    expect(result.itemListElement[1].position).toBe(2)
    expect(result.itemListElement[0].item).toContain('milliondollarstudio.ai')
  })

  it('articleJsonLd generates valid Article schema', () => {
    const result = articleJsonLd({
      title: 'Test Post',
      excerpt: 'A test excerpt',
      date: '2026-01-15',
      author: 'Shrish Manglik',
      slug: 'test-post',
    })
    expect(result['@type']).toBe('Article')
    expect(result.headline).toBe('Test Post')
    expect(result.url).toContain('/blog/test-post')
    expect(result.author.name).toBe('Shrish Manglik')
  })

  it('serviceJsonLd generates valid Service schema', () => {
    const result = serviceJsonLd({
      title: 'AI Audit',
      description: 'Comprehensive AI analysis',
      slug: 'ai-audit',
    })
    expect(result['@type']).toBe('Service')
    expect(result.name).toBe('AI Audit')
    expect(result.url).toContain('/services/ai-audit')
  })

  it('faqJsonLd generates valid FAQPage schema', () => {
    const result = faqJsonLd([
      { question: 'How fast?', answer: '2-4 weeks.' },
      { question: 'Do I own the code?', answer: 'Yes.' },
    ])
    expect(result['@type']).toBe('FAQPage')
    expect(result.mainEntity).toHaveLength(2)
    expect(result.mainEntity[0]['@type']).toBe('Question')
    expect(result.mainEntity[0].acceptedAnswer['@type']).toBe('Answer')
  })

  it('professionalServiceJsonLd includes required fields', () => {
    const result = professionalServiceJsonLd()
    expect(result['@type']).toBe('ProfessionalService')
    expect(result.name).toBe('Million Dollar AI Studio')
    expect(result.url).toContain('milliondollarstudio.ai')
    expect(result.hasOfferCatalog.itemListElement.length).toBeGreaterThan(0)
    expect(result.sameAs.length).toBeGreaterThan(0)
  })

  it('webPageJsonLd generates valid WebPage schema', () => {
    const result = webPageJsonLd({
      name: 'About',
      description: 'About page description',
      path: '/about',
    })
    expect(result['@type']).toBe('WebPage')
    expect(result.name).toBe('About')
    expect(result.url).toContain('/about')
    expect(result.isPartOf['@type']).toBe('WebSite')
  })

  it('productJsonLd generates valid SoftwareApplication schema', () => {
    const result = productJsonLd({
      name: 'FinSight AI',
      description: 'Financial intelligence',
      slug: 'finsight-ai',
      status: 'live',
    })
    expect(result['@type']).toBe('SoftwareApplication')
    expect(result.name).toBe('FinSight AI')
    expect(result.url).toContain('/products/finsight-ai')
    expect(result.offers.availability).toBe('https://schema.org/InStock')
  })

  it('productJsonLd uses PreOrder for non-live products', () => {
    const result = productJsonLd({
      name: 'AstroAI',
      description: 'Astrology AI',
      slug: 'astroai',
      status: 'beta',
    })
    expect(result.offers.availability).toBe('https://schema.org/PreOrder')
  })
})
