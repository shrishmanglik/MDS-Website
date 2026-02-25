"use client"

import { useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

const CURSOR_RADIUS = 6
const CONNECTION_RANGE = 150
const TRAIL_LENGTH = 8

interface Point {
  x: number
  y: number
}

export function NeuralCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<Point>({ x: -100, y: -100 })
  const trailRef = useRef<Point[]>([])
  const rafRef = useRef<number>(0)
  const { prefersReducedMotion } = useReducedMotion()

  const getInteractiveElements = useCallback(() => {
    return document.querySelectorAll<HTMLElement>(
      'a, button, [role="button"], input, textarea, select'
    )
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return

    // Only enable on desktop with fine pointer
    const mql = window.matchMedia('(pointer: fine)')
    if (!mql.matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    // Hide default cursor
    document.documentElement.style.cursor = 'none'

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      // Build trail
      trailRef.current.unshift({ x: e.clientX, y: e.clientY })
      if (trailRef.current.length > TRAIL_LENGTH) {
        trailRef.current.pop()
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -100, y: -100 }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x, y } = mouseRef.current

      if (x < 0) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      // Draw trail
      const trail = trailRef.current
      if (trail.length > 1) {
        for (let i = 1; i < trail.length; i++) {
          const alpha = (1 - i / trail.length) * 0.15
          ctx.beginPath()
          ctx.arc(trail[i].x, trail[i].y, CURSOR_RADIUS * (1 - i / trail.length * 0.5), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(91, 127, 255, ${alpha})`
          ctx.fill()
        }
      }

      // Draw connections to nearby interactive elements
      const elements = getInteractiveElements()
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = cx - x
        const dy = cy - y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < CONNECTION_RANGE && dist > 10) {
          const alpha = (1 - dist / CONNECTION_RANGE) * 0.25
          ctx.beginPath()
          ctx.moveTo(x, y)
          // Bezier curve for organic feel
          const mx = (x + cx) / 2
          const my = (y + cy) / 2 - 20
          ctx.quadraticCurveTo(mx, my, cx, cy)
          ctx.strokeStyle = `rgba(91, 127, 255, ${alpha})`
          ctx.lineWidth = 1
          ctx.stroke()

          // Small node at element center
          ctx.beginPath()
          ctx.arc(cx, cy, 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(91, 127, 255, ${alpha * 0.8})`
          ctx.fill()
        }
      })

      // Draw main cursor node
      // Outer glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, CURSOR_RADIUS * 3)
      gradient.addColorStop(0, 'rgba(91, 127, 255, 0.15)')
      gradient.addColorStop(1, 'rgba(91, 127, 255, 0)')
      ctx.beginPath()
      ctx.arc(x, y, CURSOR_RADIUS * 3, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Core
      ctx.beginPath()
      ctx.arc(x, y, CURSOR_RADIUS, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(91, 127, 255, 0.8)'
      ctx.fill()

      // Bright center
      ctx.beginPath()
      ctx.arc(x, y, CURSOR_RADIUS * 0.4, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.fill()

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.style.cursor = ''
    }
  }, [prefersReducedMotion, getInteractiveElements])

  if (prefersReducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none hidden md:block"
      aria-hidden="true"
    />
  )
}
