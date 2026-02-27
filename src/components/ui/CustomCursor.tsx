"use client"

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const hovering = useRef(false)
  const visible = useRef(false)
  const raf = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(max-width: 768px)').matches) return

    document.documentElement.style.cursor = 'none'
    const cursorStyle = document.createElement('style')
    cursorStyle.id = 'custom-cursor-hide'
    cursorStyle.textContent =
      '*, a, button, [role="button"], input, textarea, select, label, [tabindex] { cursor: none !important; }'
    document.head.appendChild(cursorStyle)

    const dot = dotRef.current!
    const ring = ringRef.current!

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!visible.current) {
        visible.current = true
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
    }

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest(
        'a, button, [role="button"], input, textarea, select, label, [tabindex]'
      )
      hovering.current = !!t
    }

    const hide = () => {
      visible.current = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }
    const show = () => {
      visible.current = true
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    const loop = () => {
      // Dot follows instantly
      dot.style.transform = `translate3d(${pos.current.x - 4}px, ${pos.current.y - 4}px, 0)`

      // Ring follows with spring-like lag
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12

      const s = hovering.current ? 48 : 32
      const half = s / 2
      ring.style.width = `${s}px`
      ring.style.height = `${s}px`
      ring.style.borderColor = hovering.current
        ? 'rgba(212, 175, 55, 0.5)'
        : 'rgba(41, 98, 255, 0.3)'
      ring.style.transform = `translate3d(${ringPos.current.x - half}px, ${ringPos.current.y - half}px, 0)`

      raf.current = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)
    raf.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf.current)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
      document.documentElement.style.cursor = ''
      cursorStyle.remove()
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#2962FF',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          willChange: 'transform',
          transition: 'opacity 0.15s',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(41, 98, 255, 0.3)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0,
          willChange: 'transform, width, height, border-color',
          transition:
            'width 0.2s cubic-bezier(0.16,1,0.3,1), height 0.2s cubic-bezier(0.16,1,0.3,1), border-color 0.2s ease, opacity 0.15s',
        }}
      />
    </>
  )
}
