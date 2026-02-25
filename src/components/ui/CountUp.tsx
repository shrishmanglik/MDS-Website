"use client"

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'

interface CountUpProps {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function CountUp({ end, prefix = '', suffix = '', duration = 1.5, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const { prefersReducedMotion } = useReducedMotion()
  const [display, setDisplay] = useState(prefersReducedMotion ? end : 0)

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      setDisplay(end)
      return
    }

    const startTime = performance.now()
    let rafId: number

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * end))

      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [isInView, end, duration, prefersReducedMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  )
}
