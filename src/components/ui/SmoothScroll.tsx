'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { useScrollColorShift } from '@/hooks/useScrollColorShift'

/**
 * Lenis smooth scroll integrated with GSAP ScrollTrigger.
 * GSAP drives the RAF loop so scroll positions stay in sync.
 * Also activates the scroll-linked color temperature shift.
 */
export function SmoothScroll() {
  const { prefersReducedMotion } = useReducedMotion()
  const lenisRef = useRef<import('lenis').default | null>(null)

  // Scroll-linked color temperature (blue→gold, extremely subtle)
  useScrollColorShift()

  useEffect(() => {
    if (prefersReducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
      return
    }

    let cancelled = false

    // Dynamic import both Lenis and GSAP together
    Promise.all([
      import('lenis'),
      import('@/lib/gsap'),
    ]).then(([{ default: Lenis }, { gsap, ScrollTrigger }]) => {
      if (cancelled || prefersReducedMotion) return

      const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
      })
      lenisRef.current = lenis

      // Sync Lenis scroll events with ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update)

      // Let GSAP ticker drive Lenis RAF (single unified loop)
      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)

      // Expose scroll velocity as CSS custom property
      lenis.on('scroll', (e: { velocity: number }) => {
        const velocity = Math.max(-1, Math.min(1, e.velocity / 5))
        document.documentElement.style.setProperty('--scroll-velocity', String(velocity))
      })
    })

    return () => {
      cancelled = true
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
      // Clean up scroll velocity
      document.documentElement.style.removeProperty('--scroll-velocity')
    }
  }, [prefersReducedMotion])

  return null
}
