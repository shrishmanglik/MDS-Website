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

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            ref={menuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute right-0 top-0 h-full w-[80vw] max-w-sm bg-bg-secondary border-l border-border-custom p-6"
          >
            <div className="flex justify-end mb-8">
              <button
                onClick={onClose}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors focus:ring-2 focus:ring-accent-mid focus:outline-none rounded-lg"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="text-lg font-medium text-text-secondary hover:text-text-primary py-3 px-4 rounded-xl hover:bg-bg-hover transition-colors focus:ring-2 focus:ring-accent-mid focus:outline-none"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 pt-6 border-t border-border-custom">
                <Button
                  href="/contact"
                  variant="cta"
                  size="lg"
                  className="w-full"
                >
                  Start a Project
                </Button>
              </div>
            </nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
