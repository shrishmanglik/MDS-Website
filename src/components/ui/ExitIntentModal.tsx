"use client"

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false)

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger when mouse moves toward top of viewport
    if (e.clientY > 10) return

    // Only trigger once per session
    if (sessionStorage.getItem('mds-exit-shown')) return

    sessionStorage.setItem('mds-exit-shown', '1')
    setIsOpen(true)
  }, [])

  useEffect(() => {
    // Don't show on mobile (no mouse leave) or if already shown
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('mds-exit-shown')) return

    // Delay listener to avoid triggering on page load
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 5000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseLeave])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
          >
            <div
              className="relative bg-bg-secondary border border-border-custom rounded-2xl p-8 md:p-10 max-w-md w-full pointer-events-auto shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="exit-modal-title"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-text-tertiary hover:text-text-primary transition-colors rounded-lg focus:ring-2 focus:ring-accent-blue focus:outline-none"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-accent-blue mb-4">
                  Before you go
                </p>
                <h2
                  id="exit-modal-title"
                  className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-3"
                >
                  Get a Free{' '}
                  <span className="gradient-text">AI Assessment</span>
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  Discover where AI can reduce costs and accelerate your operations.
                  Personalized report delivered in 48 hours. No commitment.
                </p>

                <Button href="/free-audit" variant="primary" size="lg" className="w-full mb-3">
                  Get Your Free Assessment
                  <ArrowRight size={16} aria-hidden="true" />
                </Button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="text-text-tertiary text-xs hover:text-text-secondary transition-colors"
                >
                  No thanks, I&apos;ll keep browsing
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
