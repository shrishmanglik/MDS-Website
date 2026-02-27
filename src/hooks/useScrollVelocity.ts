'use client'

import { useEffect, useRef, useCallback } from 'react'

/**
 * useScrollVelocity — returns a ref holding normalized scroll velocity (-1 to 1).
 * Also sets --scroll-velocity CSS custom property on documentElement.
 * Negative = scrolling up, positive = scrolling down.
 *
 * Uses the --scroll-velocity CSS var set by SmoothScroll (Lenis),
 * falling back to manual tracking if Lenis isn't active.
 */
export function useScrollVelocity() {
  const velocityRef = useRef(0)
  const lastScrollRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Check if Lenis is already setting --scroll-velocity
    const hasLenis = getComputedStyle(document.documentElement)
      .getPropertyValue('--scroll-velocity')
      .trim()

    if (hasLenis) {
      // Read from CSS var periodically (Lenis already sets it)
      const readVelocity = () => {
        const raw = parseFloat(
          getComputedStyle(document.documentElement)
            .getPropertyValue('--scroll-velocity') || '0'
        )
        // Normalize: Lenis velocity is in px/s, normalize to -1..1 range
        // Typical Lenis velocity ranges from -3000 to 3000
        velocityRef.current = Math.max(-1, Math.min(1, raw / 3000))
        rafRef.current = requestAnimationFrame(readVelocity)
      }
      rafRef.current = requestAnimationFrame(readVelocity)
      return () => cancelAnimationFrame(rafRef.current)
    }

    // Fallback: manual scroll velocity tracking
    let lastTime = performance.now()
    lastScrollRef.current = window.scrollY

    const handleScroll = () => {
      const now = performance.now()
      const dt = now - lastTime
      if (dt < 16) return // Skip if less than one frame

      const dy = window.scrollY - lastScrollRef.current
      const velocityPxPerSec = (dy / dt) * 1000

      // Normalize to -1..1
      velocityRef.current = Math.max(-1, Math.min(1, velocityPxPerSec / 3000))

      // Set CSS var for other components
      document.documentElement.style.setProperty(
        '--scroll-velocity',
        String(velocityPxPerSec)
      )

      lastScrollRef.current = window.scrollY
      lastTime = now
    }

    // Dampen velocity toward 0 when not scrolling
    const dampen = () => {
      velocityRef.current *= 0.92 // Exponential decay
      if (Math.abs(velocityRef.current) < 0.001) {
        velocityRef.current = 0
      }
      rafRef.current = requestAnimationFrame(dampen)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    rafRef.current = requestAnimationFrame(dampen)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return velocityRef
}

/**
 * useScrollDirection — returns 'up' | 'down' | 'idle'
 * Simpler hook when you just need direction, not magnitude.
 */
export function useScrollDirection() {
  const directionRef = useRef<'up' | 'down' | 'idle'>('idle')

  useEffect(() => {
    let lastY = window.scrollY
    let idleTimer: ReturnType<typeof setTimeout>

    const handleScroll = () => {
      const currentY = window.scrollY
      directionRef.current = currentY > lastY ? 'down' : currentY < lastY ? 'up' : 'idle'
      lastY = currentY

      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        directionRef.current = 'idle'
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(idleTimer)
    }
  }, [])

  return directionRef
}
