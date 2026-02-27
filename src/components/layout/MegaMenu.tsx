'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Code, Cpu, Database, Package, Layers, Zap } from 'lucide-react'

interface MegaMenuProps {
  activeMenu: string | null
  onClose: () => void
  onMouseEnter: () => void
}

interface MenuItem {
  icon: typeof Cpu
  title: string
  description: string
  href: string
  highlight?: boolean
}

interface MenuSection {
  items: MenuItem[]
  cta: { label: string; href: string }
}

const menuContent: Record<string, MenuSection> = {
  Services: {
    items: [
      {
        icon: Cpu,
        title: 'Custom AI Development',
        description: 'Bespoke AI systems built to your specifications',
        href: '/services',
      },
      {
        icon: Package,
        title: 'SaaS Products',
        description: 'Production-ready AI products you own completely',
        href: '/products',
      },
      {
        icon: Database,
        title: 'Enterprise Systems',
        description: 'Scalable AI infrastructure for large organizations',
        href: '/services',
      },
      {
        icon: Zap,
        title: 'Free AI Audit',
        description: '5-page report delivered in 48 hours',
        href: '/free-audit',
        highlight: true,
      },
    ],
    cta: { label: 'View all services', href: '/services' },
  },
  Products: {
    items: [
      {
        icon: Layers,
        title: 'Financial Analysis AI',
        description: 'XBRL parsing with deterministic-first architecture',
        href: '/products',
      },
      {
        icon: Code,
        title: 'Chemistry Education',
        description: 'Interactive learning powered by AI tutoring',
        href: '/products',
      },
      {
        icon: Package,
        title: 'Fashion Supply Chain',
        description: 'AI-optimized logistics and inventory management',
        href: '/products',
      },
      {
        icon: Cpu,
        title: 'Astrology Platform',
        description: 'Swiss Ephemeris meets modern AI interpretation',
        href: '/products',
      },
    ],
    cta: { label: 'Explore all products', href: '/products' },
  },
}

export function MegaMenu({ activeMenu, onClose, onMouseEnter }: MegaMenuProps) {
  const content = activeMenu ? menuContent[activeMenu] : null

  return (
    <AnimatePresence>
      {activeMenu && content && (
        <motion.div
          key={activeMenu}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-full left-0 right-0 pt-2"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onClose}
        >
          <div className="mx-auto max-w-content px-6">
            <div className="rounded-2xl border border-border-visible bg-bg-elevated/95 backdrop-blur-xl p-6 shadow-2xl shadow-black/40">
              <div className="grid grid-cols-2 gap-2">
                {content.items.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: i * 0.04,
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-200 group ${
                          item.highlight
                            ? 'bg-accent-gold/10 hover:bg-accent-gold/15 border border-accent-gold/20'
                            : 'hover:bg-bg-hover'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                            item.highlight ? 'bg-accent-gold/20' : 'bg-bg-tertiary'
                          }`}
                        >
                          <Icon
                            size={18}
                            className={item.highlight ? 'text-accent-gold' : 'text-accent-blue'}
                          />
                        </div>
                        <div>
                          <p className="text-text-primary font-medium text-sm group-hover:text-white transition-colors">
                            {item.title}
                          </p>
                          <p className="text-text-tertiary text-xs mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-border-custom">
                <Link
                  href={content.cta.href}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-accent-blue text-sm font-medium hover:gap-2.5 transition-all"
                >
                  {content.cta.label}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
