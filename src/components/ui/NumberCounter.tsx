"use client"

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

interface NumberCounterProps {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
  className?: string
}

export function NumberCounter({ end, prefix = '', suffix = '', duration = 2, decimals = 0, className = '' }: NumberCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!isInView || hasStarted.current) return
    hasStarted.current = true

    const startTime = Date.now()

    function update() {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * end)

      if (progress < 1) {
        requestAnimationFrame(update)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(update)
  }, [isInView, end, duration])

  return (
    <span ref={ref} className={`font-mono tabular-nums ${className}`}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  )
}
