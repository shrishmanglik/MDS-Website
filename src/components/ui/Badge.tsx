interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'offline' | 'ai' | 'premium' | 'hybrid'
  className?: string
}

const variantStyles: Record<string, string> = {
  default: 'bg-bg-tertiary text-text-secondary',
  offline: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  ai: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
  premium: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  hybrid: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  )
}
