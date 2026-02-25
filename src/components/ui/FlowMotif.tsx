"use client"

import { useReducedMotion } from '@/lib/useReducedMotion'

/**
 * Ownable visual motif — a subtle deterministic flow pattern (nodes + edges)
 * rendered as an SVG. Can be placed as a decorative background in sections.
 * Animates gently with CSS, respects reduced motion.
 */
export function FlowMotif({ className = '' }: { className?: string }) {
  const { prefersReducedMotion } = useReducedMotion()

  return (
    <svg
      className={`flow-motif ${className}`}
      viewBox="0 0 400 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Connecting lines */}
      <line x1="60" y1="60" x2="140" y2="40" stroke="url(#flow-grad)" strokeWidth="1" opacity="0.2">
        {!prefersReducedMotion && (
          <animate attributeName="opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite" />
        )}
      </line>
      <line x1="140" y1="40" x2="220" y2="70" stroke="url(#flow-grad)" strokeWidth="1" opacity="0.2">
        {!prefersReducedMotion && (
          <animate attributeName="opacity" values="0.1;0.3;0.1" dur="4s" begin="0.5s" repeatCount="indefinite" />
        )}
      </line>
      <line x1="220" y1="70" x2="300" y2="50" stroke="url(#flow-grad)" strokeWidth="1" opacity="0.2">
        {!prefersReducedMotion && (
          <animate attributeName="opacity" values="0.1;0.3;0.1" dur="4s" begin="1s" repeatCount="indefinite" />
        )}
      </line>
      <line x1="300" y1="50" x2="370" y2="60" stroke="url(#flow-grad)" strokeWidth="1" opacity="0.2">
        {!prefersReducedMotion && (
          <animate attributeName="opacity" values="0.1;0.3;0.1" dur="4s" begin="1.5s" repeatCount="indefinite" />
        )}
      </line>

      {/* Secondary connections */}
      <line x1="80" y1="90" x2="180" y2="80" stroke="url(#flow-grad)" strokeWidth="0.5" opacity="0.1" />
      <line x1="180" y1="80" x2="260" y2="30" stroke="url(#flow-grad)" strokeWidth="0.5" opacity="0.1" />
      <line x1="260" y1="30" x2="340" y2="85" stroke="url(#flow-grad)" strokeWidth="0.5" opacity="0.1" />

      {/* Nodes — primary pipeline */}
      <circle cx="60" cy="60" r="4" fill="#5B7FFF" opacity="0.6">
        {!prefersReducedMotion && (
          <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" />
        )}
      </circle>
      <circle cx="140" cy="40" r="5" fill="#7B9CFF" opacity="0.5">
        {!prefersReducedMotion && (
          <animate attributeName="r" values="4;6;4" dur="3s" begin="0.3s" repeatCount="indefinite" />
        )}
      </circle>
      <circle cx="220" cy="70" r="6" fill="#A855F7" opacity="0.5">
        {!prefersReducedMotion && (
          <animate attributeName="r" values="5;7;5" dur="3s" begin="0.6s" repeatCount="indefinite" />
        )}
      </circle>
      <circle cx="300" cy="50" r="5" fill="#FF9F43" opacity="0.4">
        {!prefersReducedMotion && (
          <animate attributeName="r" values="4;6;4" dur="3s" begin="0.9s" repeatCount="indefinite" />
        )}
      </circle>
      <circle cx="370" cy="60" r="4" fill="#10b981" opacity="0.5">
        {!prefersReducedMotion && (
          <animate attributeName="r" values="3;5;3" dur="3s" begin="1.2s" repeatCount="indefinite" />
        )}
      </circle>

      {/* Secondary nodes */}
      <circle cx="80" cy="90" r="2" fill="#5B7FFF" opacity="0.3" />
      <circle cx="180" cy="80" r="2.5" fill="#7B9CFF" opacity="0.25" />
      <circle cx="260" cy="30" r="2" fill="#A855F7" opacity="0.25" />
      <circle cx="340" cy="85" r="2.5" fill="#FF9F43" opacity="0.2" />

      {/* Gradient definition */}
      <defs>
        <linearGradient id="flow-grad" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5B7FFF" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#FF9F43" />
        </linearGradient>
      </defs>
    </svg>
  )
}
