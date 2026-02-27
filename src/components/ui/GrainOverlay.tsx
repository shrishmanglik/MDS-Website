'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

/**
 * GrainOverlay — film grain texture with dynamic opacity.
 *
 * Enhancements:
 * - Grain offset responds to --mouse-x / --mouse-y CSS vars (parallax grain)
 * - Grain opacity modulates with --scroll-velocity (set by SmoothScroll/Lenis)
 *   - Faster scrolling = slightly more visible grain (adds energy)
 *   - Idle = minimal grain
 * - Pure CSS for per-frame changes — no JS rAF loop needed
 */
export function GrainOverlay() {
  const { prefersReducedMotion } = useReducedMotion()

  // Set mouse position CSS vars for grain parallax
  useEffect(() => {
    if (prefersReducedMotion) return
    // Only track on desktop with pointer
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      document.documentElement.style.setProperty('--mouse-x', String(x))
      document.documentElement.style.setProperty('--mouse-y', String(y))
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReducedMotion])

  return (
    <div
      className="grain-overlay"
      aria-hidden="true"
      style={{
        // Grain opacity responds to scroll velocity
        // Base: 0.03 (barely visible), max during fast scroll: ~0.08
        opacity: 'calc(0.03 + clamp(0, abs(var(--scroll-velocity, 0)) / 5000, 0.05))',
        // Subtle grain position offset based on mouse position
        transform: 'translate(calc(var(--mouse-x, 0.5) * -4px), calc(var(--mouse-y, 0.5) * -4px))',
        // Ensure overlay extends beyond viewport for parallax offset
        inset: '-4px',
      }}
    />
  )
}
