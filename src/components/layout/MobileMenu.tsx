"use client"

import { useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Link from 'next/link'
import { NAV_LINKS } from '@/lib/constants'
import { Button } from '@/components/ui/Button'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Menu item spring animation — staggered reveal with spring physics.
 * Each item slides in from the right with a spring curve.
 */
const menuItemVariants = {
  hidden: { opacity: 0, x: 40, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.1 + i * 0.06,
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
      mass: 0.8,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: 20,
    transition: {
      delay: (NAV_LINKS.length - i) * 0.03,
      duration: 0.2,
    },
  }),
}

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + NAV_LINKS.length * 0.06 + 0.1,
      type: 'spring' as const,
      stiffness: 200,
      damping: 20,
    },
  },
  exit: { opacity: 0, y: 10, transition: { duration: 0.15 } },
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  const stableOnClose = useCallback(() => onCloseRef.current(), [])

  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') stableOnClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, stableOnClose])

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
      const closeBtn = menuRef.current?.querySelector('button')
      if (closeBtn) (closeBtn as HTMLElement).focus()
    }
    return () => {
      if (!isOpen && previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !menuRef.current) return

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusableEls = menuRef.current!.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
      const first = focusableEls[0] as HTMLElement
      const last = focusableEls[focusableEls.length - 1] as HTMLElement

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleTabKey)
    return () => document.removeEventListener('keydown', handleTabKey)
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Backdrop — gradient overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-gradient-to-br from-black/80 via-bg-primary/90 to-accent-purple/10 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.div
            ref={menuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute right-0 top-0 h-full w-[85vw] max-w-sm bg-bg-secondary/95 backdrop-blur-xl border-l border-border-custom p-6 flex flex-col"
          >
            {/* Close button */}
            <div className="flex justify-end mb-8">
              <motion.button
                onClick={onClose}
                className="p-2.5 text-text-secondary hover:text-text-primary transition-colors focus:ring-2 focus:ring-accent-purple focus:outline-none rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close menu"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Nav links — spring staggered */}
            <nav className="flex flex-col gap-1 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="text-lg font-medium text-text-secondary hover:text-text-primary py-3 px-4 rounded-xl hover:bg-bg-hover transition-all duration-200 focus:ring-2 focus:ring-accent-purple focus:outline-none block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* CTA — appears last with spring bounce */}
              <motion.div
                className="mt-auto pt-6 border-t border-border-custom"
                variants={ctaVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Button
                  href="/contact"
                  variant="cta"
                  size="lg"
                  className="w-full"
                >
                  Build Your AI With Us
                </Button>
                <p className="text-text-tertiary text-xs text-center mt-3">
                  Free consultation · No commitment
                </p>
              </motion.div>
            </nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
