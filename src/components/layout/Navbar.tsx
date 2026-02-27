"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { MobileMenu } from './MobileMenu'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'glass'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/logo-small.png"
              alt="MDS"
              width={32}
              height={32}
              className="w-8 h-8 rounded-lg transition-transform duration-200 group-hover:scale-110"
            />
            <span className="hidden sm:block font-heading font-semibold text-text-primary group-hover:text-white transition-colors">
              MDS
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href + '/')

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-underline relative px-4 py-2 text-sm font-medium transition-colors focus:ring-2 focus:ring-accent-blue/50 focus:outline-none rounded-lg ${
                    isActive
                      ? 'text-text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-blue" />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <Button href="/contact" variant="cta" size="sm">
                Build Your AI With Us
              </Button>
            </div>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2.5 text-text-secondary hover:text-text-primary transition-colors focus:ring-2 focus:ring-accent-blue/50 focus:outline-none rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
