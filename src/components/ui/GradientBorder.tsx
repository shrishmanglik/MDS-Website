import { type ReactNode } from 'react'

interface GradientBorderProps {
  children: ReactNode
  className?: string
  hoverOnly?: boolean
}

export function GradientBorder({
  children,
  className = '',
  hoverOnly = true,
}: GradientBorderProps) {
  return (
    <div className={`relative group ${className}`}>
      <div
        className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-gold blur-[0.5px] transition-opacity duration-300 ${
          hoverOnly ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
        }`}
      />
      <div className="relative bg-bg-elevated rounded-2xl border border-border-custom group-hover:border-transparent transition-colors">
        {children}
      </div>
    </div>
  )
}
