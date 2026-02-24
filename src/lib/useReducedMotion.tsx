'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

interface ReducedMotionContextValue {
  prefersReducedMotion: boolean
  toggleReducedMotion: () => void
}

const ReducedMotionContext = createContext<ReducedMotionContextValue>({
  prefersReducedMotion: false,
  toggleReducedMotion: () => {},
})

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Lax`
}

export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [manualOverride, setManualOverride] = useState<boolean | null>(null)

  // Initialize from cookie + OS preference on mount
  useEffect(() => {
    const cookieValue = getCookie('reduced-motion')
    if (cookieValue !== null) {
      const manual = cookieValue === '1'
      setManualOverride(manual)
      setPrefersReducedMotion(manual)
    } else {
      const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mql.matches)
    }
  }, [])

  // Listen for OS-level changes (only applies when no manual override)
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => {
      if (manualOverride === null) {
        setPrefersReducedMotion(e.matches)
      }
    }
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [manualOverride])

  // Sync data attribute on <html> for CSS targeting
  useEffect(() => {
    document.documentElement.dataset.reducedMotion = String(prefersReducedMotion)
  }, [prefersReducedMotion])

  const toggleReducedMotion = useCallback(() => {
    setPrefersReducedMotion(prev => {
      const next = !prev
      setManualOverride(next)
      setCookie('reduced-motion', next ? '1' : '0')
      return next
    })
  }, [])

  return (
    <ReducedMotionContext.Provider value={{ prefersReducedMotion, toggleReducedMotion }}>
      {children}
    </ReducedMotionContext.Provider>
  )
}

export function useReducedMotion() {
  return useContext(ReducedMotionContext)
}
