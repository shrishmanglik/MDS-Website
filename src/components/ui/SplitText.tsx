'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { useGSAP } from '@/hooks/useGSAP'
import {
  textAnimationPresets,
  SCRAMBLE_CHARS,
  type AnimationPreset,
  type SplitMode,
} from '@/lib/textAnimations'

interface SplitTextProps {
  /** The text to animate */
  children: string
  /** Animation preset */
  preset?: AnimationPreset
  /** Override split mode (chars, words, lines) */
  splitMode?: SplitMode
  /** Custom stagger delay in seconds */
  stagger?: number
  /** Delay before animation starts (seconds) */
  delay?: number
  /** HTML tag to render */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  /** Additional CSS classes */
  className?: string
  /** Trigger animation on scroll into view (default true) */
  triggerOnScroll?: boolean
  /** Scroll trigger margin */
  scrollMargin?: string
}

/**
 * SplitText — splits text into individual chars/words and animates them.
 * Supports multiple animation presets including AI-themed "scramble" effect.
 * Accessible: uses aria-label for screen readers, aria-hidden on visual spans.
 */
export function SplitText({
  children,
  preset = 'blur-in',
  splitMode: splitModeOverride,
  stagger: staggerOverride,
  delay = 0,
  as: Tag = 'div',
  className = '',
  triggerOnScroll = true,
  scrollMargin = '-80px',
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { prefersReducedMotion } = useReducedMotion()
  const [hasAnimated, setHasAnimated] = useState(false)
  const config = textAnimationPresets[preset]
  const effectiveSplitMode = splitModeOverride || config.splitMode

  // Split text into units
  const units = useMemo(() => {
    if (effectiveSplitMode === 'chars') {
      return children.split('').map((char, i) => ({
        char,
        key: `${i}-${char}`,
        isSpace: char === ' ',
      }))
    } else if (effectiveSplitMode === 'words') {
      return children.split(/(\s+)/).map((word, i) => ({
        char: word,
        key: `${i}-${word}`,
        isSpace: /^\s+$/.test(word),
      }))
    }
    // lines — treat whole string as one unit
    return [{ char: children, key: '0-line', isSpace: false }]
  }, [children, effectiveSplitMode])

  // GSAP animation (non-scramble presets)
  useGSAP(
    (gsap, ScrollTrigger) => {
      if (!containerRef.current || preset === 'scramble') return

      const elements = containerRef.current.querySelectorAll('.split-unit')
      if (elements.length === 0) return

      const effectiveStagger = staggerOverride ?? config.stagger

      // Set initial state
      gsap.set(elements, config.from)

      const animConfig: gsap.TweenVars = {
        ...config.to,
        duration: config.duration,
        stagger: effectiveStagger,
        delay,
        ease: config.ease,
        onComplete: () => setHasAnimated(true),
      }

      if (triggerOnScroll) {
        gsap.to(elements, {
          ...animConfig,
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top bottom${scrollMargin}`,
            once: true,
          },
        })
      } else {
        gsap.to(elements, animConfig)
      }
    },
    [children, preset, delay]
  )

  // Scramble effect — custom rAF implementation
  useEffect(() => {
    if (prefersReducedMotion || preset !== 'scramble') return
    if (!containerRef.current) return

    const elements = containerRef.current.querySelectorAll('.split-unit') as NodeListOf<HTMLSpanElement>
    if (elements.length === 0) return

    let cancelled = false
    const effectiveStagger = staggerOverride ?? config.stagger

    // Observer for scroll trigger
    const startScramble = () => {
      elements.forEach((el, i) => {
        const targetChar = el.dataset.char || ''
        if (targetChar === ' ') {
          el.textContent = '\u00A0'
          return
        }

        const startTime = delay * 1000 + i * effectiveStagger * 1000
        const scrambleDuration = config.duration * 1000
        let startedAt = 0

        el.style.opacity = '0'

        const frame = (now: number) => {
          if (cancelled) return
          if (!startedAt) startedAt = now

          const elapsed = now - startedAt
          if (elapsed < startTime) {
            requestAnimationFrame(frame)
            return
          }

          el.style.opacity = '1'
          const progress = Math.min((elapsed - startTime) / scrambleDuration, 1)

          if (progress < 1) {
            // Show random character
            el.textContent = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
            requestAnimationFrame(frame)
          } else {
            // Resolve to target
            el.textContent = targetChar
          }
        }

        requestAnimationFrame(frame)
      })
    }

    if (triggerOnScroll) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startScramble()
            observer.disconnect()
          }
        },
        { rootMargin: scrollMargin }
      )
      observer.observe(containerRef.current)
      return () => {
        cancelled = true
        observer.disconnect()
      }
    } else {
      startScramble()
      return () => { cancelled = true }
    }
  }, [children, preset, delay, prefersReducedMotion, staggerOverride, config, triggerOnScroll, scrollMargin])

  // Reduced motion: show text instantly
  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLElement & HTMLDivElement>}
      className={`${className}`}
      aria-label={children}
    >
      {units.map((unit) => (
        <span
          key={unit.key}
          className={`split-unit inline-block ${unit.isSpace ? 'w-[0.3em]' : ''}`}
          data-char={unit.char}
          aria-hidden="true"
          style={
            !hasAnimated && preset !== 'scramble'
              ? { opacity: 0, ...config.from }
              : undefined
          }
        >
          {unit.isSpace ? '\u00A0' : unit.char}
        </span>
      ))}
    </Tag>
  )
}
