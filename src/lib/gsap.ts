'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Export configured instances
export { gsap, ScrollTrigger }

// Default GSAP config for the site
gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
})

/**
 * Sync Lenis smooth scroll with GSAP ScrollTrigger.
 * Call this once after Lenis is initialized.
 */
export function syncLenisWithGSAP(lenis: import('lenis').default) {
  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000)
  })

  // Disable Lenis internal RAF since GSAP drives it now
  gsap.ticker.lagSmoothing(0)
}

/**
 * Kill all ScrollTrigger instances — call on unmount/navigation
 */
export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}
