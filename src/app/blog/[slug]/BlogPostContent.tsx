"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Link2, Linkedin, ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/lib/blog'
import { blogPosts } from '@/lib/blog'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export function BlogPostContent({ post }: { post: BlogPost }) {
  // Prefer same-category posts, then fall back to any other posts
  const relatedPosts = (() => {
    const others = blogPosts.filter((p) => p.slug !== post.slug)
    const sameCategory = others.filter((p) => p.category === post.category)
    const different = others.filter((p) => p.category !== post.category)
    return [...sameCategory, ...different].slice(0, 2)
  })()

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const shareOnX = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href)
      const text = encodeURIComponent(post.title)
      window.open(`https://x.com/intent/tweet?url=${url}&text=${text}`, '_blank')
    }
  }

  const shareOnLinkedIn = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href)
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
    }
  }

  return (
    <div className="pt-24 pb-16 px-6">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-[680px] mx-auto"
      >
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Badge>{post.category}</Badge>
            <span className="text-text-tertiary text-sm">{post.readTime}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-text-tertiary">
            <span>{post.author}</span>
            <span>&middot;</span>
            <span>{post.date}</span>
          </div>
        </div>

        {/* Content */}
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Share buttons */}
        <div className="mt-12 pt-8 border-t border-border-custom">
          <p className="text-text-tertiary text-sm mb-4">Share this article</p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-tertiary text-text-secondary hover:text-text-primary text-sm transition-colors focus:ring-2 focus:ring-accent-purple focus:outline-none"
            >
              <Link2 size={16} aria-hidden="true" />
              Copy Link
            </button>
            <button
              onClick={shareOnX}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-tertiary text-text-secondary hover:text-text-primary text-sm transition-colors focus:ring-2 focus:ring-accent-purple focus:outline-none"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Share on X
            </button>
            <button
              onClick={shareOnLinkedIn}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-tertiary text-text-secondary hover:text-text-primary text-sm transition-colors focus:ring-2 focus:ring-accent-purple focus:outline-none"
            >
              <Linkedin size={16} aria-hidden="true" />
              LinkedIn
            </button>
          </div>
        </div>
      </motion.article>

      {/* CTA Section */}
      <div className="max-w-[680px] mx-auto mt-16">
        <div className="bg-bg-secondary border border-border-custom rounded-2xl p-8 md:p-10 text-center">
          <h3 className="font-heading text-xl md:text-2xl font-bold text-text-primary mb-3">
            Ready to see what AI can do for your business?
          </h3>
          <p className="text-text-secondary leading-relaxed mb-6 max-w-lg mx-auto">
            Get your free AI assessment — a personalized report showing exactly where AI fits in your operations.
          </p>
          <Button href="/free-audit" variant="primary" size="lg">
            Get Your Free AI Assessment
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-[680px] mx-auto mt-16">
          <h2 className="font-heading text-xl font-bold text-text-primary mb-6">
            More from the Studio
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="block group bg-bg-secondary border border-border-custom rounded-2xl p-5 hover:border-accent-purple/30 transition-colors"
              >
                <Badge className="mb-3">{related.category}</Badge>
                <h3 className="font-heading font-semibold text-text-primary group-hover:text-white transition-colors mb-2">
                  {related.title}
                </h3>
                <p className="text-text-secondary text-sm">{related.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
