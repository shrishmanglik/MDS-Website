'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

interface TerminalLine {
  /** The text to type out */
  text: string
  /** 'command' = green with $ prefix, 'output' = gray, 'highlight' = accent-blue */
  type?: 'command' | 'output' | 'highlight'
  /** Delay before starting this line (ms) */
  delay?: number
}

interface TerminalTextProps {
  /** Lines to type out sequentially */
  lines: TerminalLine[]
  /** Typing speed in ms per character */
  speed?: number
  /** Pause between lines (ms) */
  linePause?: number
  /** Additional CSS classes for the container */
  className?: string
  /** Whether to show the blinking cursor */
  showCursor?: boolean
  /** Trigger on scroll into view */
  triggerOnScroll?: boolean
}

const TYPE_COLORS = {
  command: 'text-emerald-400',
  output: 'text-text-secondary',
  highlight: 'text-accent-blue',
}

/**
 * TerminalText — character-by-character typewriter effect styled as a terminal.
 * Uses JetBrains Mono. Perfect for reinforcing the "we build AI" narrative.
 */
export function TerminalText({
  lines,
  speed = 30,
  linePause = 400,
  className = '',
  showCursor = true,
  triggerOnScroll = true,
}: TerminalTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useReducedMotion()
  const [displayedLines, setDisplayedLines] = useState<Array<{ text: string; type: string; complete: boolean }>>([])
  const [isActive, setIsActive] = useState(!triggerOnScroll)
  const [cursorVisible, setCursorVisible] = useState(true)

  // Intersection Observer for scroll trigger
  useEffect(() => {
    if (!triggerOnScroll || !containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsActive(true)
          observer.disconnect()
        }
      },
      { rootMargin: '-50px' }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [triggerOnScroll])

  // Blinking cursor
  useEffect(() => {
    if (!showCursor || prefersReducedMotion) return
    const interval = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(interval)
  }, [showCursor, prefersReducedMotion])

  // Typing animation
  useEffect(() => {
    if (!isActive) return

    if (prefersReducedMotion) {
      // Show all lines instantly
      setDisplayedLines(
        lines.map((l) => ({ text: l.text, type: l.type || 'output', complete: true }))
      )
      return
    }

    let cancelled = false
    let timeout: ReturnType<typeof setTimeout>

    async function typeLines() {
      for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
        if (cancelled) return

        const line = lines[lineIdx]
        const lineDelay = line.delay ?? 0
        const type = line.type || 'output'

        // Wait for line delay
        if (lineDelay > 0) {
          await new Promise((r) => { timeout = setTimeout(r, lineDelay) })
        }

        // Add empty line
        setDisplayedLines((prev) => [...prev, { text: '', type, complete: false }])

        // Type each character
        for (let charIdx = 0; charIdx < line.text.length; charIdx++) {
          if (cancelled) return

          await new Promise((r) => { timeout = setTimeout(r, speed) })

          setDisplayedLines((prev) => {
            const updated = [...prev]
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              text: line.text.slice(0, charIdx + 1),
            }
            return updated
          })
        }

        // Mark line as complete
        setDisplayedLines((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = { ...updated[updated.length - 1], complete: true }
          return updated
        })

        // Pause between lines
        if (lineIdx < lines.length - 1) {
          await new Promise((r) => { timeout = setTimeout(r, linePause) })
        }
      }
    }

    typeLines()
    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [isActive, lines, speed, linePause, prefersReducedMotion])

  const allComplete = displayedLines.length === lines.length && displayedLines.every((l) => l.complete)

  return (
    <div
      ref={containerRef}
      className={`font-mono text-sm leading-relaxed rounded-xl bg-bg-secondary/80 border border-border-visible backdrop-blur-sm p-4 md:p-6 overflow-hidden ${className}`}
      role="presentation"
      aria-label={lines.map((l) => l.text).join('. ')}
    >
      {/* Terminal header dots */}
      <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-border-visible/50">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
        <span className="ml-3 text-text-tertiary text-xs">mds-terminal</span>
      </div>

      {/* Terminal lines */}
      <div className="space-y-1" aria-hidden="true">
        {displayedLines.map((line, i) => (
          <div key={i} className="flex">
            {line.type === 'command' && (
              <span className="text-accent-gold mr-2 select-none">$</span>
            )}
            <span className={TYPE_COLORS[line.type as keyof typeof TYPE_COLORS] || TYPE_COLORS.output}>
              {line.text}
              {/* Cursor on the last incomplete line */}
              {!line.complete && showCursor && (
                <span
                  className={`inline-block w-[2px] h-[1.1em] ml-[1px] align-middle bg-accent-blue transition-opacity ${
                    cursorVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}
            </span>
          </div>
        ))}

        {/* Cursor after all complete */}
        {allComplete && showCursor && (
          <div className="flex">
            <span className="text-accent-gold mr-2 select-none">$</span>
            <span
              className={`inline-block w-[2px] h-[1.1em] bg-accent-blue transition-opacity ${
                cursorVisible ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        )}
      </div>
    </div>
  )
}
