'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

export function SmoothScroll() {
  const { prefersReducedMotion } = useReducedMotion()
  const lenisRef = useRef<import('lenis').default | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (prefersReducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }
      return
    }

    // Dynamic import to avoid SSR issues and reduce initial bundle
    import('lenis').then(({ default: Lenis }) => {
      if (prefersReducedMotion) return

      lenisRef.current = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
      })

      function raf(time: number) {
        lenisRef.current?.raf(time)
        rafRef.current = requestAnimationFrame(raf)
      }
      rafRef.current = requestAnimationFrame(raf)
    })

    return () => {
      lenisRef.current?.destroy()
      lenisRef.current = null
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }
    }
  }, [prefersReducedMotion])

  return null
}
