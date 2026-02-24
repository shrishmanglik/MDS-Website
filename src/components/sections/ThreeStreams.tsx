"use client"

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Wrench, Box, Cog } from 'lucide-react'
import Link from 'next/link'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'

const streams = [
  {
    icon: Wrench,
    title: 'AI Services',
    description:
      'We build it for you. Websites, automation, content systems — all with AI at the core.',
    price: '$3K–$50K',
    cta: 'View Packages',
    href: '/services',
    gradient: 'from-[#5B7FFF] to-[#A855F7]',
    glowColor: 'rgba(91, 127, 255, 0.15)',
  },
  {
    icon: Box,
    title: 'AI Products',
    description:
      'SaaS we own. Deterministic-first architecture. Less than $0.01 per interaction.',
    price: '4 products in development',
    cta: 'Explore Products',
    href: '/products',
    gradient: 'from-[#10b981] to-[#5B7FFF]',
    glowColor: 'rgba(16, 185, 129, 0.15)',
  },
  {
    icon: Cog,
    title: 'Custom AI Systems',
    description:
      'Enterprise-grade. Built to your spec. Full code ownership. Ongoing support.',
    price: '$5K–$200K+',
    cta: 'Build With Us',
    href: '/build',
    gradient: 'from-[#A855F7] to-[#FF9F43]',
    glowColor: 'rgba(168, 85, 247, 0.15)',
  },
]

function TiltCard({ stream }: { stream: typeof streams[number] }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setRotation({ x: y * -10, y: x * 10 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setRotation({ x: 0, y: 0 })
    setIsHovered(false)
  }, [])

  return (
    <Link
      href={stream.href}
      className="group block h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
    >
      <div
        className="h-full p-8 rounded-2xl border border-border-custom bg-bg-secondary transition-colors duration-200"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
          boxShadow: isHovered ? `0 0 40px ${stream.glowColor}` : 'none',
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.12)' : undefined,
        }}
      >
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stream.gradient} flex items-center justify-center mb-6`}
        >
          <stream.icon size={24} className="text-white" />
        </div>
        <h3 className="font-heading text-xl font-semibold text-text-primary mb-3">
          {stream.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {stream.description}
        </p>
        <p className="text-sm font-medium font-mono text-accent-primary mb-6">
          {stream.price}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-primary group-hover:gap-2.5 transition-all">
          {stream.cta}
          <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  )
}

export function ThreeStreams() {
  return (
    <section className="py-24 px-6">
      <motion.div
        className="max-w-content mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div className="text-center mb-16" variants={fadeUpVariant}>
          <h2 className="text-text-primary mb-4">
            Three ways to work with us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {streams.map((stream) => (
            <motion.div key={stream.title} variants={fadeUpVariant}>
              <TiltCard stream={stream} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
