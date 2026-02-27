'use client'

import { useEffect } from 'react'
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
 * Desktop only — mobile scroll is too erratic for smooth color transitions.
 */
export function useScrollColorShift() {
  const { prefersReducedMotion } = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    if (typeof window === 'undefined') return
    // Desktop only
    if (window.innerWidth < 768) return

    let rafId: number
    let lastProgress = 0

    const update = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return

      const raw = window.scrollY / scrollHeight
      // Smooth toward target (lerp)
      lastProgress += (raw - lastProgress) * 0.1

      // Subtle hue shift: 0 → 3 degrees
      const hueShift = lastProgress * 3
      // Warmth factor: 0 (cool) → 1 (warm)
      const warmth = lastProgress

      document.documentElement.style.setProperty('--bg-hue-shift', `${hueShift.toFixed(2)}deg`)
      document.documentElement.style.setProperty('--bg-warmth', warmth.toFixed(3))

      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(rafId)
      document.documentElement.style.removeProperty('--bg-hue-shift')
      document.documentElement.style.removeProperty('--bg-warmth')
    }
  }, [prefersReducedMotion])
}
