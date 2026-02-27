'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

/**
 * React hook for GSAP animations with proper cleanup and reduced motion support.
 * Lazy-loads GSAP only when needed.
 */
export function useGSAP(
  callback: (gsap: typeof import('gsap').gsap, ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger) => (() => void) | void,
  deps: React.DependencyList = [],
  containerRef?: React.RefObject<HTMLElement | null>
) {
  const { prefersReducedMotion } = useReducedMotion()
  const cleanupRef = useRef<(() => void) | void>(undefined)

  useEffect(() => {
    if (prefersReducedMotion) return

    let cancelled = false

    import('@/lib/gsap').then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return

      // Create a GSAP context scoped to container if provided
      if (containerRef?.current) {
        const ctx = gsap.context(() => {
          cleanupRef.current = callback(gsap, ScrollTrigger)
        }, containerRef.current)

        cleanupRef.current = () => ctx.revert()
      } else {
        cleanupRef.current = callback(gsap, ScrollTrigger)
      }
    })

    return () => {
      cancelled = true
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion, ...deps])
}

/**
 * Hook to get scroll progress of an element (0 to 1).
 * Useful for parallax effects.
 */
export function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const progressRef = useRef(0)
  const { prefersReducedMotion } = useReducedMotion()

  useGSAP(
    (gsap, ScrollTrigger) => {
      if (!ref.current) return

      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          progressRef.current = self.progress
        },
      })
    },
    [],
    ref
  )

  return progressRef
}
