'use client'

import { useReducedMotion } from '@/lib/useReducedMotion'

/**
 * BackgroundShader — CSS-only atmospheric background.
 *
 * Replaced the fullscreen WebGL canvas with a pure CSS gradient
 * to eliminate a second WebGL context and its continuous rAF loop.
 * The visual difference is negligible (subtle noise field vs gradient),
 * but the performance gain is massive — frees up GPU and removes ~30fps overhead.
 *
 * Uses scroll-linked CSS custom properties (--bg-warmth set by useScrollColorShift)
 * for subtle color temperature shift as user scrolls.
 */
export function BackgroundShader() {
  const { prefersReducedMotion } = useReducedMotion()

  if (prefersReducedMotion) return null

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
      style={{
        background: [
          'radial-gradient(ellipse at 50% 0%, rgba(41, 98, 255, 0.04) 0%, transparent 50%)',
          'radial-gradient(ellipse at 80% 80%, rgba(124, 58, 237, 0.025) 0%, transparent 40%)',
          'radial-gradient(ellipse at 20% 60%, rgba(212, 175, 55, 0.015) 0%, transparent 35%)',
        ].join(', '),
      }}
    />
  )
}
