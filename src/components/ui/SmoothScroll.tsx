'use client'

import { useEffect } from 'react'

export function SmoothScroll() {
  useEffect(() => {
    let lenis: import('lenis').default | null = null

    // Dynamic import to avoid SSR issues and reduce initial bundle
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
      })

      function raf(time: number) {
        lenis?.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    })

    return () => {
      lenis?.destroy()
    }
  }, [])

  return null
}
