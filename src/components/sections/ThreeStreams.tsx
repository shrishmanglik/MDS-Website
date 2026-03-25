"use client"

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Wrench, Box, Cog } from 'lucide-react'
import Link from 'next/link'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'
import { SplitText } from '@/components/ui/SplitText'

const streams = [
  {
    icon: Wrench,
    title: 'AI Audit',
    description:
      'We analyze your business, find AI opportunities, and tell you exactly what to build — with a budget estimate.',
    price: 'From $500 · Delivered in 1 week',
    cta: 'Learn More →',
    href: '/services/audit',
    gradient: 'from-[#2962FF] to-[#7C3AED]',
    glowColor: 'rgba(41, 98, 255, 0.15)',
  },
  {
    icon: Box,
    title: 'AI Systems',
    description:
      'We design and build custom AI systems your team actually uses. Fixed price. Full code ownership. Deployed in 2–8 weeks.',
    price: 'From $3K',
    cta: 'Learn More →',
    href: '/services/launchpad',
    gradient: 'from-[#10b981] to-[#2962FF]',
    glowColor: 'rgba(16, 185, 129, 0.15)',
  },
  {
    icon: Cog,
    title: 'Ongoing Growth',
    description:
      'Monthly AI partnership. We build, optimize, and expand your AI infrastructure as your needs evolve.',
    price: 'From $3K/month',
    cta: 'Learn More →',
    href: '/services/growth',
    gradient: 'from-[#7C3AED] to-[#D4AF37]',
    glowColor: 'rgba(124, 58, 237, 0.15)',
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
          <stream.icon size={24} className="text-white" aria-hidden="true" />
        </div>
        <h3 className="font-heading text-xl font-semibold text-text-primary mb-3">
          {stream.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {stream.description}
        </p>
        <p className="text-sm font-medium font-mono text-accent-blue mb-6">
          {stream.price}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue group-hover:gap-2.5 transition-all">
          {stream.cta}
          <ArrowRight size={14} aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}

export function ThreeStreams() {
  return (
    <section className="py-24 px-6 bg-bg-tint-purple ambient-orb ambient-orb--purple">
      <motion.div
        className="max-w-content mx-auto relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="text-center mb-16">
          <SplitText
            as="h2"
            preset="wave"
            className="text-text-primary mb-4"
          >
            Three ways to work with us
          </SplitText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
