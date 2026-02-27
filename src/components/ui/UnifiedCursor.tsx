'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

type CursorState = 'default' | 'hover' | 'text' | 'hidden'

const INTERACTIVE_SELECTORS = 'a, button, input, textarea, select, [role="button"], [data-cursor="pointer"]'
const TEXT_SELECTORS = 'input[type="text"], input[type="email"], input[type="tel"], input[type="url"], textarea'

const COLORS = {
  default: { r: 41, g: 98, b: 255 },   // accent-blue
  hover: { r: 212, g: 175, b: 55 },     // accent-gold
  text: { r: 124, g: 58, b: 237 },      // accent-purple
}

const DOT_SIZE = 6
const RING_SIZE_DEFAULT = 32
const RING_SIZE_HOVER = 48
const RING_SIZE_TEXT = 24
const SPRING_FACTOR = 0.12
const CONNECTION_RANGE = 120
const MAX_CONNECTIONS = 4
const TRAIL_LENGTH = 8

/**
 * Unified cursor system combining:
 * - Dot core with instant follow
 * - Spring-follow ring with state-aware sizing
 * - Neural connection lines to nearby interactive elements
 * - Radial body glow via CSS custom properties
 * Desktop + pointer:fine only. Single rAF loop.
 */
export function UnifiedCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { prefersReducedMotion } = useReducedMotion()

  // State refs (no re-renders)
  const mouse = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const state = useRef<CursorState>('default')
  const trail = useRef<Array<{ x: number; y: number }>>([])
  const visible = useRef(false)
  const rafId = useRef(0)

  const getColor = useCallback((cursorState: CursorState) => {
    return COLORS[cursorState === 'hidden' ? 'default' : cursorState]
  }, [])

  const getRingSize = useCallback((cursorState: CursorState) => {
    switch (cursorState) {
      case 'hover': return RING_SIZE_HOVER
      case 'text': return RING_SIZE_TEXT
      default: return RING_SIZE_DEFAULT
    }
  }, [])

  useEffect(() => {
    // Desktop + pointer:fine only
    if (prefersReducedMotion) return
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Sizing
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    // Hide default cursor
    document.documentElement.style.cursor = 'none'
    document.body.style.cursor = 'none'

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      visible.current = true

      // Set CSS custom properties for body glow
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)

      // Detect element under cursor
      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (el) {
        if (el.matches(TEXT_SELECTORS) || el.closest(TEXT_SELECTORS)) {
          state.current = 'text'
        } else if (el.matches(INTERACTIVE_SELECTORS) || el.closest(INTERACTIVE_SELECTORS)) {
          state.current = 'hover'
        } else {
          state.current = 'default'
        }
      }
    }

    const onMouseLeave = () => {
      visible.current = false
      state.current = 'hidden'
    }

    const onMouseEnter = () => {
      visible.current = true
      state.current = 'default'
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    // Animation loop
    let currentRingSize = RING_SIZE_DEFAULT

    const draw = () => {
      const w = window.innerWidth
      const h = window.innerHeight

      ctx.clearRect(0, 0, w, h)

      if (!visible.current) {
        rafId.current = requestAnimationFrame(draw)
        return
      }

      const mx = mouse.current.x
      const my = mouse.current.y

      // Spring-follow ring position
      ring.current.x += (mx - ring.current.x) * SPRING_FACTOR
      ring.current.y += (my - ring.current.y) * SPRING_FACTOR

      // Update trail
      trail.current.unshift({ x: mx, y: my })
      if (trail.current.length > TRAIL_LENGTH) trail.current.pop()

      const color = getColor(state.current)
      const targetRingSize = getRingSize(state.current)
      currentRingSize += (targetRingSize - currentRingSize) * 0.15

      // Draw trail
      if (trail.current.length > 2) {
        for (let i = 1; i < trail.current.length; i++) {
          const alpha = (1 - i / trail.current.length) * 0.15
          const size = DOT_SIZE * (1 - i / trail.current.length) * 0.6
          ctx.beginPath()
          ctx.arc(trail.current[i].x, trail.current[i].y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
          ctx.fill()
        }
      }

      // Draw neural connections to nearby interactive elements
      const interactiveEls = document.querySelectorAll(INTERACTIVE_SELECTORS)
      let connections = 0
      interactiveEls.forEach((el) => {
        if (connections >= MAX_CONNECTIONS) return
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dist = Math.hypot(mx - cx, my - cy)

        if (dist < CONNECTION_RANGE && dist > 20) {
          connections++
          const alpha = (1 - dist / CONNECTION_RANGE) * 0.25

          ctx.beginPath()
          ctx.moveTo(mx, my)
          // Quadratic bezier for organic curve
          const midX = (mx + cx) / 2 + (my - cy) * 0.1
          const midY = (my + cy) / 2 + (cx - mx) * 0.1
          ctx.quadraticCurveTo(midX, midY, cx, cy)
          ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      })

      // Draw ring (spring-follow)
      ctx.beginPath()
      ctx.arc(ring.current.x, ring.current.y, currentRingSize / 2, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.4)`
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Draw dot core
      ctx.beginPath()
      ctx.arc(mx, my, DOT_SIZE / 2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.9)`
      ctx.fill()

      // Glow around dot
      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, DOT_SIZE * 3)
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`)
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)
      ctx.beginPath()
      ctx.arc(mx, my, DOT_SIZE * 3, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      rafId.current = requestAnimationFrame(draw)
    }

    rafId.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId.current)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      window.removeEventListener('resize', resize)
      document.documentElement.style.cursor = ''
      document.body.style.cursor = ''
    }
  }, [prefersReducedMotion, getColor, getRingSize])

  if (prefersReducedMotion) return null

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
        style={{ mixBlendMode: 'screen' }}
        aria-hidden="true"
      />
      {/* CSS body glow — uses --mouse-x/y set above */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] hidden md:block transition-opacity duration-300"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x, -100px) var(--mouse-y, -100px), rgba(41, 98, 255, 0.04), transparent 80%)',
        }}
        aria-hidden="true"
      />
    </>
  )
}
