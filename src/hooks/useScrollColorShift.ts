'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

/**
 * Scroll-linked color temperature shift.
 *
 * Updates CSS custom properties on the document element as the user scrolls:
 * - --bg-hue-shift: subtle hue rotation (0 → 3deg)
 * - --bg-warmth: warmth factor (0 → 1) for temperature-aware components
 *
 * Background shifts from cool blue (top) to warm gold (bottom).
 * Extremely subtle: 2-3 degree hue, barely perceptible but adds atmospheric depth.
 *
 * Performance: Uses passive scroll listener + throttled rAF instead of continuous rAF.
 * Only runs a single rAF frame when scroll fires, then stops — zero overhead when idle.
 * Desktop only — mobile scroll is too erratic for smooth color transitions.
 */
export function useScrollColorShift() {
  const { prefersReducedMotion } = useReducedMotion()
  const rafId = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    if (prefersReducedMotion) return
    if (typeof window === 'undefined') return
    if (window.innerWidth < 768) return

    const update = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) {
        ticking.current = false
        return
      }

      const progress = window.scrollY / scrollHeight

      // Subtle hue shift: 0 → 3 degrees
      const hueShift = progress * 3
      // Warmth factor: 0 (cool) → 1 (warm)
      const warmth = progress

      document.documentElement.style.setProperty('--bg-hue-shift', `${hueShift.toFixed(2)}deg`)
      document.documentElement.style.setProperty('--bg-warmth', warmth.toFixed(3))

      ticking.current = false
    }

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        rafId.current = requestAnimationFrame(update)
      }
    }

    // Initial update
    update()

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener('scroll', onScroll)
      document.documentElement.style.removeProperty('--bg-hue-shift')
      document.documentElement.style.removeProperty('--bg-warmth')
    }
  }, [prefersReducedMotion])
}
