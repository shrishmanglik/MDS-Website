"use client"

import { motion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'

const VARIANTS: Record<string, Variants> = {
  'fade-up': {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-down': {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-left': {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  'fade-right': {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
}

interface ScrollRevealProps {
  children: ReactNode
  direction?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale'
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export function ScrollReveal({
  children,
  direction = 'fade-up',
  delay = 0,
  duration = 0.6,
  className,
  once = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      variants={VARIANTS[direction]}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
