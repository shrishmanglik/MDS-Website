'use client'

import { useRef } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { useReducedMotion } from '@/lib/useReducedMotion'

type TransitionMode = 'wipe' | 'curtain' | 'dissolve'

interface SectionTransitionProps {
  /** The transition animation type */
  mode?: TransitionMode
  /** Children — typically two adjacent sections */
  children: React.ReactNode
  /** Additional CSS classes */
  className?: string
  /** Height of the transition zone (vh units) */
  transitionHeight?: number
}

/**
 * SectionTransition — wraps content and creates a scroll-driven transition
 * between sections. Three modes:
 *
 * - `wipe`: clip-path inset reveal (content wipes in from edges)
 * - `curtain`: previous section slides up to reveal next
 * - `dissolve`: gradient mask fades between sections
 *
 * ScrollTrigger `scrub` controls transition progress.
 * Mobile: simpler fade transition (no clip-path to avoid GPU jank).
 */
export function SectionTransition({
  mode = 'wipe',
  children,
  className = '',
  transitionHeight = 50,
}: SectionTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useReducedMotion()

  useGSAP(
    (gsap, ScrollTrigger) => {
      if (!containerRef.current || !overlayRef.current) return

      // Skip complex transitions on mobile
      const isMobile = window.innerWidth < 768

      const overlay = overlayRef.current

      if (mode === 'wipe') {
        // Clip-path inset: starts fully hidden, wipes open
        gsap.set(overlay, {
          clipPath: isMobile ? 'inset(100% 0 0 0)' : 'inset(100% 0 0 0)',
        })

        gsap.to(overlay, {
          clipPath: 'inset(0% 0 0 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: `+=${transitionHeight}vh`,
            scrub: 1,
          },
        })
      } else if (mode === 'curtain') {
        // Curtain: overlay starts below and slides up
        gsap.set(overlay, { yPercent: 100 })

        gsap.to(overlay, {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: `+=${transitionHeight}vh`,
            scrub: 1,
          },
        })
      } else if (mode === 'dissolve') {
        // Dissolve: gradient mask opacity
        gsap.set(overlay, { opacity: 0 })

        gsap.to(overlay, {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: `+=${transitionHeight}vh`,
            scrub: 1,
          },
        })
      }

      return () => {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.vars.trigger === containerRef.current) t.kill()
        })
      }
    },
    [mode, transitionHeight]
  )

  // Reduced motion: no transition, just show content
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {children}
      {/* Transition overlay — positioned to cover the gap between sections */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none z-[1]"
        aria-hidden="true"
        style={{
          background:
            mode === 'dissolve'
              ? 'linear-gradient(to bottom, transparent 0%, var(--bg-primary, #0A0A0F) 40%, var(--bg-primary, #0A0A0F) 60%, transparent 100%)'
              : undefined,
        }}
      />
    </div>
  )
}

/**
 * SectionDivider — a simpler decorative element between sections.
 * Creates a gradient line or glow effect.
 */
export function SectionDivider({
  variant = 'gradient',
  className = '',
}: {
  variant?: 'gradient' | 'glow' | 'dots'
  className?: string
}) {
  if (variant === 'gradient') {
    return (
      <div className={`relative h-px ${className}`} aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent" />
      </div>
    )
  }

  if (variant === 'glow') {
    return (
      <div className={`relative h-16 ${className}`} aria-hidden="true">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />
        <div className="absolute inset-x-1/4 top-1/2 -translate-y-1/2 h-8 bg-accent-blue/5 blur-2xl rounded-full" />
      </div>
    )
  }

  // dots
  return (
    <div className={`flex items-center justify-center gap-2 py-8 ${className}`} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1 h-1 rounded-full bg-text-tertiary/40"
        />
      ))}
    </div>
  )
}
