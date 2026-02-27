"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'
import { Badge } from '@/components/ui/Badge'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {posts.map((post) => (
        <motion.div key={post.slug} variants={itemVariants}>
          <Link href={`/blog/${post.slug}`} className="block group">
            <motion.div
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.15)' }}
              transition={{ duration: 0.2 }}
              className="bg-bg-secondary border border-border-custom rounded-2xl p-6 hover:border-accent-purple/30 transition-colors h-full flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <Badge>{post.category}</Badge>
                <span className="text-text-tertiary text-xs">{post.readTime}</span>
              </div>
              <h2 className="font-heading text-lg font-semibold text-text-primary mb-2 group-hover:text-white transition-colors">
                {post.title}
              </h2>
              <p className="text-text-secondary text-sm mb-4 flex-1">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-text-tertiary pt-4 border-t border-border-custom">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
