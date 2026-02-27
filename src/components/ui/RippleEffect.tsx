'use client'

import { useCallback, useRef } from 'react'

interface RippleEffectProps {
  children: React.ReactNode
  /** Color of the ripple */
  color?: string
  /** Duration of the ripple animation (ms) */
  duration?: number
  /** Additional CSS classes */
  className?: string
}

/**
 * RippleEffect — creates a radial ripple from the click point.
 * Pure CSS @keyframes — no Framer Motion needed.
 * One DOM span created/removed per click for zero memory overhead.
 */
export function RippleEffect({
  children,
  color = 'rgba(255, 255, 255, 0.2)',
  duration = 600,
  className = '',
}: RippleEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Calculate max distance to corner for ripple radius
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(rect.width - x, y),
        Math.hypot(x, rect.height - y),
        Math.hypot(rect.width - x, rect.height - y)
      )

      const ripple = document.createElement('span')
      const size = maxDistance * 2

      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        background: ${color};
        width: ${size}px;
        height: ${size}px;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
        transform: scale(0);
        opacity: 1;
        animation: ripple-expand ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        z-index: 0;
      `

      containerRef.current.appendChild(ripple)

      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove()
      }, duration)
    },
    [color, duration]
  )

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      style={{ isolation: 'isolate' }}
    >
      {children}
      <style jsx global>{`
        @keyframes ripple-expand {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
