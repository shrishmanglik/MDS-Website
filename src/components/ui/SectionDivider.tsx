interface SectionDividerProps {
  className?: string
  variant?: 'gold' | 'blue' | 'subtle'
}

const GRADIENTS = {
  gold: 'from-transparent via-[rgba(212,175,55,0.25)] to-transparent',
  blue: 'from-transparent via-[rgba(41,98,255,0.25)] to-transparent',
  subtle: 'from-transparent via-border-visible to-transparent',
} as const

export function SectionDivider({ className = '', variant = 'gold' }: SectionDividerProps) {
  return (
    <div className={`relative h-px w-full max-w-content mx-auto ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-r ${GRADIENTS[variant]}`} />
    </div>
  )
}
