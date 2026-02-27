import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'AI Architecture Insights',
  description:
    'Technical insights on building production AI systems, cost optimization, and the future of deterministic-first architecture.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'AI Architecture Insights | Million Dollar AI Studio',
    description:
      'Technical insights on building production AI systems, cost optimization, and deterministic-first architecture.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Architecture Insights | Million Dollar AI Studio',
    description: 'Technical insights on building production AI systems.',
  },
}

export default function BlogPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-content mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-text-primary mb-4">
            From the studio.
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
            Technical insights on building production AI systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group bg-bg-secondary border border-border-custom rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-medium text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-full">
                  {post.category}
                </span>
                <span className="text-text-tertiary text-xs">{post.readTime}</span>
              </div>
              <h2 className="font-heading text-lg font-semibold text-text-primary group-hover:text-white transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                {post.excerpt}
              </p>
              <span className="text-text-tertiary text-xs">{post.date}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
