"use client"

import Link from 'next/link'
import { Loader2 } from 'lucide-react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'cta'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  href?: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
  type?: 'button' | 'submit'
  target?: string
  rel?: string
}

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const variantStyles = {
  primary:
    'bg-gradient-to-r from-accent-start via-accent-mid to-accent-end text-white font-semibold hover:brightness-110 hover:shadow-lg hover:shadow-accent-primary/20',
  secondary:
    'border border-border-visible bg-bg-secondary text-text-primary hover:text-white hover:border-accent-primary/40 hover:bg-bg-tertiary',
  ghost:
    'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-hover',
  cta:
    'bg-cta-primary text-bg-primary font-semibold hover:bg-cta-hover hover:shadow-lg hover:shadow-cta-primary/20',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  onClick,
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  target,
  rel,
}: ButtonProps) {
  const baseStyles = `inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 btn-press focus:ring-2 focus:ring-accent-primary/50 focus:outline-none ${
    sizeStyles[size]
  } ${variantStyles[variant]} ${
    disabled || loading ? 'pointer-events-none opacity-70' : ''
  } ${className}`

  const content = loading ? (
    <Loader2 className="animate-spin" size={16} />
  ) : (
    children
  )

  if (href) {
    if (href.startsWith('http') || href.startsWith('#') || target === '_blank') {
      return (
        <a href={href} className={baseStyles} target={target} rel={rel}>
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={baseStyles}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} className={baseStyles}>
      {content}
    </button>
  )
}
