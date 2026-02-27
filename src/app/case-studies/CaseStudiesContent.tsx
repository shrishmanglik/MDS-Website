"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Clock, TrendingUp } from 'lucide-react'
import { caseStudies } from '@/lib/case-studies'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Button } from '@/components/ui/Button'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function CaseStudiesContent() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Case Studies' },
        ]} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-primary gradient-text">
              What We Build.
            </span>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Capability demonstrations showing what our AI systems can do.
            Each project represents a real system we designed, built, and tested.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 mb-16"
        >
          {caseStudies.map((study) => (
            <motion.div key={study.slug} variants={itemVariants}>
              <Link href={`/case-studies/${study.slug}`} className="block group">
                <div className="bg-bg-secondary border border-border-custom rounded-2xl p-8 md:p-10 hover:border-accent-purple/30 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start gap-8">
                    {/* Hero stat */}
                    <div className="shrink-0 md:w-48 text-center md:text-left">
                      <p className="text-5xl md:text-6xl font-bold bg-gradient-primary gradient-text mb-1">
                        {study.heroStat.value}
                      </p>
                      <p className="text-text-tertiary text-xs">{study.heroStat.label}</p>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p className="text-xs font-semibold tracking-widest text-accent-purple mb-2">{study.label}</p>
                      <h2 className="font-heading text-xl md:text-2xl font-bold text-text-primary mb-2 group-hover:text-white transition-colors">
                        {study.title}
                      </h2>
                      <p className="text-text-secondary text-sm leading-relaxed mb-4">{study.subtitle}</p>

                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className="inline-flex items-center gap-1.5 text-xs text-text-tertiary">
                          <Clock size={12} /> {study.timeline}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-text-tertiary">
                          <TrendingUp size={12} /> {study.results[0].metric}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-purple group-hover:gap-2.5 transition-all">
                        Read full case study
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center bg-bg-secondary border border-border-custom rounded-2xl p-12"
        >
          <h2 className="font-heading text-3xl font-bold mb-4">
            <span className="bg-gradient-primary gradient-text">Want Something Like This Built?</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8">
            Every engagement starts with a free AI assessment. We&apos;ll analyze your operations and show you exactly what&apos;s possible.
          </p>
          <Button href="/free-audit" variant="primary" size="lg">
            Get Your Free AI Assessment
            <ArrowRight size={18} />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
