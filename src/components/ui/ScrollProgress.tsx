'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'

/**
 * Gradient scroll progress bar fixed at top of viewport.
 * Blue → Purple → Gold gradient matching brand triad.
 */
export function ScrollProgress() {
  const { prefersReducedMotion } = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  if (prefersReducedMotion) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple), var(--accent-gold))',
      }}
      aria-hidden="true"
    />
  )
}
