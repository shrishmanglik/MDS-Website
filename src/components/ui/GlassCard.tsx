import { type ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
  glow?: boolean
}

const PAD = { sm: 'p-4', md: 'p-6', lg: 'p-8' } as const

export function GlassCard({
  children,
  className = '',
  hover = true,
  padding = 'md',
  glow = false,
}: GlassCardProps) {
  return (
    <div
      data-glow={glow || undefined}
      className={`glass rounded-2xl backdrop-blur-md ${PAD[padding]} ${hover ? 'card-hover gradient-border-animated' : ''} ${glow ? 'glass-card-glow' : ''} ${className}`}
      style={hover ? { '--glass-hover-shadow': 'inset 0 1px 0 0 rgba(255,255,255,0.05)' } as React.CSSProperties : undefined}
    >
      {children}
    </div>
  )
}
