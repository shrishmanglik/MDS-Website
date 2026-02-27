"use client"

import { useCallback, useRef } from 'react'
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
  /** Enable click ripple effect */
  ripple?: boolean
}

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const variantStyles = {
  primary:
    'bg-gradient-to-r from-accent-blue via-accent-purple to-accent-gold text-white font-semibold hover:brightness-110 hover:shadow-lg hover:shadow-accent-blue/20',
  secondary:
    'border border-border-visible bg-bg-secondary text-text-primary hover:text-white hover:border-accent-blue/40 hover:bg-bg-tertiary',
  ghost:
    'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-hover',
  cta:
    'bg-cta-primary text-bg-primary font-semibold hover:bg-cta-hover hover:shadow-lg hover:shadow-cta-primary/20',
}

const rippleColors: Record<string, string> = {
  primary: 'rgba(255, 255, 255, 0.25)',
  secondary: 'rgba(41, 98, 255, 0.15)',
  ghost: 'rgba(255, 255, 255, 0.1)',
  cta: 'rgba(0, 0, 0, 0.15)',
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
  ripple = true,
}: ButtonProps) {
  const buttonRef = useRef<HTMLElement>(null)

  // Click ripple — pure DOM, no React state
  const handleRipple = useCallback(
    (e: React.MouseEvent) => {
      if (!ripple || !buttonRef.current) return

      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const maxDist = Math.max(
        Math.hypot(x, y),
        Math.hypot(rect.width - x, y),
        Math.hypot(x, rect.height - y),
        Math.hypot(rect.width - x, rect.height - y)
      )
      const size = maxDist * 2

      const span = document.createElement('span')
      span.style.cssText = `
        position:absolute; border-radius:50%; pointer-events:none;
        background:${rippleColors[variant] || rippleColors.primary};
        width:${size}px; height:${size}px;
        left:${x - size / 2}px; top:${y - size / 2}px;
        transform:scale(0); opacity:1;
        animation:btn-ripple 500ms cubic-bezier(0.16,1,0.3,1) forwards;
        z-index:0;
      `
      buttonRef.current.appendChild(span)
      setTimeout(() => span.remove(), 500)
    },
    [ripple, variant]
  )

  const baseStyles = `relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 btn-press focus:ring-2 focus:ring-accent-blue/50 focus:outline-none active:scale-[0.97] ${
    sizeStyles[size]
  } ${variantStyles[variant]} ${
    disabled || loading ? 'pointer-events-none opacity-70' : ''
  } ${className}`

  const content = loading ? (
    <Loader2 className="animate-spin" size={16} />
  ) : (
    <span className="relative z-[1]">{children}</span>
  )

  if (href) {
    if (href.startsWith('http') || href.startsWith('#') || target === '_blank') {
      return (
        <a
          ref={buttonRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          className={baseStyles}
          target={target}
          rel={rel}
          onClick={handleRipple}
        >
          {content}
        </a>
      )
    }
    return (
      <Link
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseStyles}
        onClick={handleRipple}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={(e) => {
        handleRipple(e)
        onClick?.()
      }}
      disabled={disabled || loading}
      className={baseStyles}
    >
      {content}
    </button>
  )
}
