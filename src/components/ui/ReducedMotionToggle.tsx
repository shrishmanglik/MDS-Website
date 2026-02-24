'use client'

import { useReducedMotion } from '@/lib/useReducedMotion'

export function ReducedMotionToggle() {
  const { prefersReducedMotion, toggleReducedMotion } = useReducedMotion()

  return (
    <button
      onClick={toggleReducedMotion}
      aria-pressed={prefersReducedMotion}
      className="text-sm text-text-tertiary hover:text-text-secondary transition-colors"
    >
      {prefersReducedMotion ? 'Enable motion' : 'Reduce motion'}
    </button>
  )
}
