"use client"

import { motion } from 'framer-motion'
import { Clock, Quote, ArrowRight, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import type { CaseStudy } from '@/lib/case-studies'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function CaseStudyDetailContent({ study }: { study: CaseStudy }) {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Case Studies', href: '/case-studies' },
          { label: study.title },
        ]} />

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-widest text-accent-purple mb-4">{study.label}</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary gradient-text">{study.title}</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed mb-6">{study.subtitle}</p>

          <div className="inline-flex items-center gap-6 bg-bg-secondary border border-border-custom rounded-2xl px-8 py-4">
            <div className="text-center">
              <p className="text-3xl font-bold bg-gradient-primary gradient-text">{study.heroStat.value}</p>
              <p className="text-text-tertiary text-xs">{study.heroStat.label}</p>
            </div>
            <div className="w-px h-10 bg-border-custom" />
            <div className="text-center">
              <p className="text-text-primary font-medium text-sm flex items-center gap-1.5">
                <Clock size={14} className="text-accent-purple" /> {study.timeline}
              </p>
              <p className="text-text-tertiary text-xs">{study.industry}</p>
            </div>
          </div>
        </motion.section>

        {/* Challenge */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">The Challenge</h2>
          <p className="text-text-secondary leading-relaxed">{study.challenge}</p>
        </motion.section>

        {/* Solution */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">The Solution</h2>
          <p className="text-text-secondary leading-relaxed">{study.solution}</p>
        </motion.section>

        {/* Approach Timeline */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-8">Our Approach</h2>
          <div className="space-y-4">
            {study.approach.map((step, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex gap-4 bg-bg-secondary border border-border-custom rounded-xl p-5"
              >
                <div className="w-8 h-8 rounded-full bg-accent-purple/10 flex items-center justify-center shrink-0">
                  <span className="text-accent-purple font-bold text-sm">{i + 1}</span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Results */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-8">The Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {study.results.map((result) => (
              <motion.div
                key={result.metric}
                variants={itemVariants}
                className="bg-bg-secondary border border-green-500/20 rounded-xl p-6"
              >
                <p className="text-green-400 font-bold text-lg mb-1">{result.metric}</p>
                <p className="text-text-secondary text-sm">{result.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tech Used */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">Technology Stack</h2>
          <div className="flex flex-wrap gap-2">
            {study.techUsed.map((tech) => (
              <span key={tech} className="px-3 py-1.5 rounded-full bg-bg-tertiary border border-border-custom text-text-secondary text-xs font-medium">
                {tech}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Builder Insight */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="bg-bg-secondary border border-accent-purple/20 rounded-2xl p-8">
            <Quote size={24} className="text-accent-purple/30 mb-4" />
            <blockquote className="text-text-primary text-lg leading-relaxed mb-4 italic">
              &ldquo;{study.insight.quote}&rdquo;
            </blockquote>
            <p className="text-text-tertiary text-sm">&mdash; {study.insight.attribution}</p>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center bg-bg-secondary border border-border-custom rounded-2xl p-12"
        >
          <h2 className="font-heading text-3xl font-bold mb-4">
            <span className="bg-gradient-primary gradient-text">Want Something Like This Built?</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Every engagement starts with a free AI assessment. We&apos;ll find your biggest automation
            opportunities and show you exactly what&apos;s possible.
          </p>
          <Button href="/free-audit" variant="primary" size="lg">
            Get Your Free AI Assessment
            <ArrowRight size={18} />
          </Button>
          <p className="text-text-tertiary text-xs mt-3 flex items-center justify-center gap-1.5">
            <Shield size={12} />
            No commitment. Delivered within 48 hours.
          </p>
        </motion.section>
      </div>
    </div>
  )
}
