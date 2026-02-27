import { SITE, SOCIAL } from '@/lib/constants'

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.url}`,
    })),
  }
}

export function articleJsonLd(post: { title: string; excerpt: string; date: string; author: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: SITE.name },
    url: `${SITE.url}/blog/${post.slug}`,
  }
}

export function serviceJsonLd(service: { title: string; description: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: { '@type': 'Organization', name: SITE.name },
    url: `${SITE.url}/services/${service.slug}`,
  }
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function professionalServiceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    description:
      'Production AI systems for businesses. Custom AI builds, SaaS products, and enterprise systems with full code ownership.',
    founder: { '@type': 'Person', name: SITE.founder },
    areaServed: 'Worldwide',
    serviceType: [
      'AI Consulting',
      'Custom AI Development',
      'AI Product Development',
      'AI Automation',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Audit',
            description: 'Comprehensive AI opportunity analysis with implementation roadmap.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Launchpad',
            description: 'AI-powered website with custom design and SEO optimization.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom AI Systems',
            description: 'Enterprise AI systems scoped to your exact specifications.',
          },
        },
      ],
    },
    sameAs: [
      SOCIAL.twitter.url,
      SOCIAL.linkedin.url,
      SOCIAL.github.url,
    ],
  }
}

export function webPageJsonLd(page: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.name,
    description: page.description,
    url: `${SITE.url}${page.path}`,
    isPartOf: { '@type': 'WebSite', url: SITE.url, name: SITE.name },
  }
}

export function productJsonLd(product: {
  name: string
  description: string
  slug: string
  status: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.description,
    url: `${SITE.url}/products/${product.slug}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      availability:
        product.status === 'live'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
    },
    creator: {
      '@type': 'Organization',
      name: SITE.name,
    },
  }
}
