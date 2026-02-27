'use client'

import { useRef, useState, useCallback, useEffect } from 'react'

interface BeforeAfterSliderProps {
  /** "Before" content (left side) */
  before: React.ReactNode
  /** "After" content (right side) */
  after: React.ReactNode
  /** Before label */
  beforeLabel?: string
  /** After label */
  afterLabel?: string
  /** Initial slider position (0-100) */
  initialPosition?: number
  /** Additional CSS classes */
  className?: string
}

/**
 * BeforeAfterSlider — draggable comparison slider.
 * Uses clip-path: inset() controlled by a drag handle.
 * Direct DOM manipulation during drag (no React re-renders).
 */
export function BeforeAfterSlider({
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'After',
  initialPosition = 50,
  className = '',
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)
  const beforeRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(initialPosition)
  const isDragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))

    // Direct DOM manipulation for smooth drag (no React re-render)
    if (beforeRef.current) {
      beforeRef.current.style.clipPath = `inset(0 ${100 - percent}% 0 0)`
    }
    if (handleRef.current) {
      handleRef.current.style.left = `${percent}%`
    }

    setPosition(percent)
  }, [])

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      updatePosition(e.clientX)
    },
    [updatePosition]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return
      updatePosition(e.clientX)
    },
    [updatePosition]
  )

  const handlePointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  // Keyboard support
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let newPos = position
      if (e.key === 'ArrowLeft') newPos = Math.max(0, position - 2)
      else if (e.key === 'ArrowRight') newPos = Math.min(100, position + 2)
      else return

      e.preventDefault()
      setPosition(newPos)

      if (beforeRef.current) {
        beforeRef.current.style.clipPath = `inset(0 ${100 - newPos}% 0 0)`
      }
      if (handleRef.current) {
        handleRef.current.style.left = `${newPos}%`
      }
    },
    [position]
  )

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-2xl border border-border-custom ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ touchAction: 'none' }}
    >
      {/* After layer (bottom) */}
      <div className="relative w-full">
        {after}
        {/* After label */}
        <span className="absolute top-3 right-3 px-2 py-0.5 bg-bg-primary/80 backdrop-blur-sm text-text-tertiary text-xs rounded-full">
          {afterLabel}
        </span>
      </div>

      {/* Before layer (top, clipped) */}
      <div
        ref={beforeRef}
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - initialPosition}% 0 0)` }}
      >
        {before}
        {/* Before label */}
        <span className="absolute top-3 left-3 px-2 py-0.5 bg-bg-primary/80 backdrop-blur-sm text-text-tertiary text-xs rounded-full">
          {beforeLabel}
        </span>
      </div>

      {/* Drag handle */}
      <div
        ref={handleRef}
        className="absolute top-0 bottom-0 w-0.5 bg-white/80 cursor-ew-resize z-10"
        style={{ left: `${initialPosition}%` }}
      >
        {/* Handle grip */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center shadow-lg">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 3L2 8L5 13" stroke="#0A0A0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 3L14 8L11 13" stroke="#0A0A0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}
