'use client'

import { useRef } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

interface MarqueeProps {
  /** Content to scroll */
  children: React.ReactNode
  /** Speed in seconds for one complete cycle */
  speed?: number
  /** Scroll direction */
  direction?: 'left' | 'right'
  /** Pause on hover */
  pauseOnHover?: boolean
  /** Additional CSS classes */
  className?: string
  /** Gap between repeated items */
  gap?: string
}

/**
 * Marquee — CSS-only infinite horizontal scroll.
 * Duplicates content and uses translateX(-50%) animation.
 * Pauses on hover. Zero JS per frame.
 */
export function Marquee({
  children,
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
  className = '',
  gap = '2rem',
}: MarqueeProps) {
  const { prefersReducedMotion } = useReducedMotion()

  // Reduced motion: show content statically
  if (prefersReducedMotion) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className="flex items-center" style={{ gap }}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`overflow-hidden ${pauseOnHover ? 'group' : ''} ${className}`}
      role="marquee"
      aria-label="Scrolling content"
    >
      <div
        className={`flex items-center w-max ${
          pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
        }`}
        style={{
          gap,
          animation: `marquee-scroll-${direction} ${speed}s linear infinite`,
        }}
      >
        {/* Original content */}
        <div className="flex items-center shrink-0" style={{ gap }}>
          {children}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex items-center shrink-0" aria-hidden="true" style={{ gap }}>
          {children}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee-scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
