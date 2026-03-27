'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calculator, FlaskConical, Languages, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SplitText } from '@/components/ui/SplitText'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'

const tools = [
  {
    name: 'CRS Calculator',
    description:
      'Calculate your Express Entry CRS score instantly. Matches IRCC methodology exactly. No guessing, no AI approximation.',
    href: '/tools/crs-calculator',
    icon: Calculator,
    badge: '110K+ monthly searches',
    featured: true,
    status: 'live' as const,
  },
  {
    name: 'TEF Score Estimator',
    description:
      'Estimate your TEF Canada scores and see CLB levels for Express Entry. Convert TEF section scores to Canadian Language Benchmarks instantly.',
    href: '/tools/tef-score-estimator',
    icon: Languages,
    badge: 'TEF Canada to CLB',
    featured: true,
    status: 'live' as const,
  },
  {
    name: 'Equation Balancer',
    description:
      'Balance any chemical equation deterministically. Built on the ChemAI engine.',
    href: '#',
    icon: FlaskConical,
    badge: null,
    featured: false,
    status: 'coming-soon' as const,
  },
  {
    name: 'Free Kundli Generator',
    description:
      'Generate a Vedic birth chart (Kundli) with planetary positions, nakshatras, and North Indian Rashi chart. Powered by the JyotishAI engine.',
    href: '/tools/kundli-generator',
    icon: Star,
    badge: '74K+ monthly searches',
    featured: true,
    status: 'live' as const,
  },
]

export function ToolsContent() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools' },
          ]}
        />

        {/* Hero */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16 text-center"
        >
          <motion.div variants={fadeUpVariant}>
            <SplitText as="h1" preset="blur-in" className="text-text-primary mb-6">
              Free Tools
            </SplitText>
          </motion.div>
          <motion.p
            variants={fadeUpVariant}
            className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-xl mx-auto"
          >
            No sign-up required. No AI fees. Ever.
          </motion.p>
        </motion.section>

        {/* Tool Cards */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="grid grid-cols-1 gap-6">
            {tools.map((tool) => (
              <motion.div key={tool.name} variants={fadeUpVariant}>
                <GlassCard
                  padding="lg"
                  className={tool.featured ? 'border-accent-blue/30' : ''}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                          tool.featured
                            ? 'bg-accent-blue/10'
                            : 'bg-bg-tertiary'
                        }`}
                      >
                        <tool.icon
                          size={28}
                          className={
                            tool.featured
                              ? 'text-accent-blue'
                              : 'text-text-tertiary'
                          }
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading text-xl font-semibold text-text-primary">
                          {tool.name}
                        </h3>
                        <StatusBadge status={tool.status} />
                      </div>
                      {tool.badge && (
                        <Badge variant="premium" className="mb-3">
                          {tool.badge}
                        </Badge>
                      )}
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      {tool.status === 'live' ? (
                        <Button href={tool.href} variant="primary" size="md">
                          Try Now
                          <ArrowRight size={14} />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="md" disabled>
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
