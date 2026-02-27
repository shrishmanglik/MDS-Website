import { type ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

const PAD = { sm: 'p-4', md: 'p-6', lg: 'p-8' } as const

export function GlassCard({
  children,
  className = '',
  hover = true,
  padding = 'md',
}: GlassCardProps) {
  return (
    <div
      className={`glass rounded-2xl ${PAD[padding]} ${hover ? 'card-hover' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
