"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'

/**
 * Module-level flag — survives across template re-mounts.
 * False on initial page load, true on subsequent client-side navigations.
 */
let isFirstMount = true

/**
 * Enhanced page transition template.
 *
 * - First page load: subtle fade-in (300ms) — doesn't delay perceived LCP
 * - Client-side navigation: dramatic curtain reveal + content slide-up (600ms)
 *   - Dark gradient curtain scales down from covering the viewport
 *   - Content fades in with upward slide after curtain begins lifting
 * - Reduced motion: instant display, no animation
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const { prefersReducedMotion } = useReducedMotion()
  const isSubsequentNav = useRef(!isFirstMount)

  useEffect(() => {
    isFirstMount = false
  }, [])

  if (prefersReducedMotion) {
    return <>{children}</>
  }

  // Subsequent navigation: cinematic curtain reveal
  if (isSubsequentNav.current) {
    return (
      <>
        {/* Curtain overlay — scales from covering viewport to nothing */}
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, var(--bg-void), var(--bg-primary))',
            transformOrigin: 'top',
          }}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Content reveals after curtain lifts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.15,
          }}
        >
          {children}
        </motion.div>
      </>
    )
  }

  // Initial page load: quick subtle fade
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
