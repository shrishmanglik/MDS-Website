import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { caseStudies, getCaseStudyBySlug } from '@/lib/case-studies'
import { breadcrumbJsonLd } from '@/lib/structured-data'
import { CaseStudyDetailContent } from './CaseStudyDetailContent'

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) return { title: 'Case Study Not Found' }

  return {
    title: `${study.title} — Case Study`,
    description: study.subtitle,
    alternates: { canonical: `/case-studies/${slug}` },
    openGraph: {
      title: `${study.title} — Case Study`,
      description: study.subtitle,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${study.title} — Case Study`,
      description: study.subtitle,
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)
  if (!study) {
    notFound()
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: 'Case Studies', url: '/case-studies' },
              { name: study.title, url: `/case-studies/${slug}` },
            ])
          ),
        }}
      />
      <CaseStudyDetailContent study={study} />
    </>
  )
}
