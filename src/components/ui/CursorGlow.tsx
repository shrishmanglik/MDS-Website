'use client'

import { useEffect } from 'react'

export function CursorGlow() {
  useEffect(() => {
    // Only enable on desktop (pointer: fine)
    const mql = window.matchMedia('(pointer: fine)')
    if (!mql.matches) return

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return null
}
