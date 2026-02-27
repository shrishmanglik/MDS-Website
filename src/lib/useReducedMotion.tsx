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
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Lax`
}

function getInitialMotionState(): { reduced: boolean; manual: boolean | null } {
  if (typeof window === 'undefined') return { reduced: false, manual: null }
  const cookieValue = getCookie('reduced-motion')
  if (cookieValue !== null) {
    const manual = cookieValue === '1'
    return { reduced: manual, manual }
  }
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
  return { reduced: mql.matches, manual: null }
}

export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const [{ prefersReducedMotion }, setState] = useState(() => {
    const init = getInitialMotionState()
    return { prefersReducedMotion: init.reduced, manualOverride: init.manual }
  })

  // Listen for OS-level changes (only applies when no manual override)
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => {
      setState(prev => {
        if (prev.manualOverride !== null) return prev
        return { ...prev, prefersReducedMotion: e.matches }
      })
    }
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  // Sync data attribute on <html> for CSS targeting
  useEffect(() => {
    document.documentElement.dataset.reducedMotion = String(prefersReducedMotion)
  }, [prefersReducedMotion])

  const toggleReducedMotion = useCallback(() => {
    setState(prev => {
      const next = !prev.prefersReducedMotion
      setCookie('reduced-motion', next ? '1' : '0')
      return { prefersReducedMotion: next, manualOverride: next }
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
