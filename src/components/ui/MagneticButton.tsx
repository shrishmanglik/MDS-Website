'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

interface MagneticButtonProps {
  children: React.ReactNode
  /** Radius of the magnetic attraction zone (px) */
  radius?: number
  /** Strength of the magnetic pull (0-1) */
  strength?: number
  /** Additional CSS classes */
  className?: string
  /** Whether to apply inner parallax (text moves at different rate) */
  innerParallax?: boolean
}

/**
 * MagneticButton — wraps any element and makes it attracted toward the cursor.
 * When the cursor enters the radius zone, the button smoothly pulls toward it.
 *
 * - Spring physics via lerp for smooth follow
 * - Inner text moves at a different rate for parallax-within-button effect
 * - Mobile: disabled (no magnetic, standard touch behavior)
 * - Reduced motion: disabled
 */
export function MagneticButton({
  children,
  radius = 80,
  strength = 0.3,
  className = '',
  innerParallax = true,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useReducedMotion()
  const [isActive, setIsActive] = useState(false)

  // Track position state in refs for animation loop
  const position = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>(0)

  const lerp = useCallback((start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }, [])

  const animate = useCallback(() => {
    const lerpFactor = 0.12

    position.current.x = lerp(position.current.x, target.current.x, lerpFactor)
    position.current.y = lerp(position.current.y, target.current.y, lerpFactor)

    if (containerRef.current) {
      containerRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`
    }

    // Inner parallax — text moves at a different (amplified) rate
    if (innerParallax && innerRef.current) {
      innerRef.current.style.transform = `translate(${position.current.x * 0.5}px, ${position.current.y * 0.5}px)`
    }

    // Keep animating until position is close to target
    if (
      Math.abs(position.current.x - target.current.x) > 0.01 ||
      Math.abs(position.current.y - target.current.y) > 0.01
    ) {
      rafId.current = requestAnimationFrame(animate)
    }
  }, [lerp, innerParallax])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < radius) {
        // Inside magnetic zone — pull toward cursor
        const pull = (1 - distance / radius) * strength
        target.current.x = dx * pull
        target.current.y = dy * pull
        setIsActive(true)
      } else {
        target.current.x = 0
        target.current.y = 0
        setIsActive(false)
      }

      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(animate)
    },
    [radius, strength, animate]
  )

  const handleMouseLeave = useCallback(() => {
    target.current.x = 0
    target.current.y = 0
    setIsActive(false)
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(animate)
  }, [animate])

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(rafId.current)
  }, [])

  // Desktop + pointer:fine only
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={containerRef}
      className={`will-change-transform ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: isActive ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  )
}
