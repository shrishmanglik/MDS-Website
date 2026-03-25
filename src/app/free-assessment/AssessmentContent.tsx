'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  Search,
  Lightbulb,
  LayoutDashboard,
  DollarSign,
  Zap,
  ArrowRight,
  Loader2,
} from 'lucide-react'
import { SplitText } from '@/components/ui/SplitText'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { AnimatedInput } from '@/components/ui/AnimatedInput'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'

const benefits = [
  {
    icon: Search,
    title: 'AI Readiness Assessment',
    description:
      'We evaluate your current operations, tech stack, and data maturity to determine exactly where AI fits.',
  },
  {
    icon: Lightbulb,
    title: 'Top 3 Automation Opportunities',
    description:
      'Specific, actionable opportunities ranked by ROI potential and implementation difficulty.',
  },
  {
    icon: LayoutDashboard,
    title: 'Architecture Recommendation',
    description:
      'A high-level system design showing how AI components integrate with your existing infrastructure.',
  },
  {
    icon: DollarSign,
    title: 'Cost Estimates',
    description:
      'Realistic budget ranges for each opportunity so you can plan with confidence.',
  },
  {
    icon: Zap,
    title: 'Quick-Win Implementations',
    description:
      'At least one opportunity you can implement within 2 weeks using existing tools.',
  },
]

const businessTypes = [
  { value: '', label: 'Select your business type' },
  { value: 'ecommerce', label: 'E-commerce / Retail' },
  { value: 'saas', label: 'SaaS / Software' },
  { value: 'professional-services', label: 'Professional Services' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'fintech', label: 'Finance / Fintech' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'education', label: 'Education' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'agency', label: 'Agency / Marketing' },
  { value: 'other', label: 'Other' },
]

export function AssessmentContent() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !businessType) return

    setLoading(true)

    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'free-assessment',
          name,
          email,
          businessType,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
      }
    } catch {
      // Silently handle — form will stay visible for retry
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div variants={fadeUpVariant}>
            <Badge variant="hybrid" className="mb-6">
              Free — no strings attached
            </Badge>
          </motion.div>
          <motion.div variants={fadeUpVariant}>
            <SplitText
              as="h1"
              preset="fade-up"
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
            >
              Free AI Assessment
            </SplitText>
          </motion.div>
          <motion.p
            variants={fadeUpVariant}
            className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto"
          >
            Tell us about your business and we&apos;ll deliver a personalized AI opportunity
            report — including architecture recommendations and cost estimates.
          </motion.p>
        </motion.section>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Benefits */}
          <div className="space-y-6">
            <ScrollReveal>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-2">
                What You&apos;ll Get
              </h2>
              <p className="text-text-secondary mb-8">
                A 5-page AI opportunity report tailored to your business, delivered within
                48 hours.
              </p>
            </ScrollReveal>

            {benefits.map((benefit, i) => (
              <ScrollReveal key={benefit.title} delay={i * 0.08}>
                <motion.div
                  className="flex items-start gap-4 group"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center shrink-0 group-hover:bg-accent-blue/20 transition-colors">
                    <benefit.icon size={20} className="text-accent-blue" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-text-primary mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Right: Form */}
          <ScrollReveal delay={0.2}>
            <GlassCard padding="lg" hover={false}>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-text-primary mb-1">
                      Get Your Free Assessment
                    </h3>
                    <p className="text-sm text-text-secondary">
                      Takes 30 seconds. No credit card required.
                    </p>
                  </div>

                  {/* Business Type Select */}
                  <div className="relative">
                    <label className="block text-xs font-medium text-text-tertiary mb-1.5">
                      Business Type <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      required
                      className="w-full bg-transparent border border-border-visible rounded-xl px-4 py-3 text-text-primary text-sm outline-none transition-all duration-200 hover:border-border-visible/80 focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 12px center',
                      }}
                    >
                      {businessTypes.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name */}
                  <AnimatedInput
                    label="Full Name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={setName}
                    autoComplete="name"
                    errorMessage="Please enter your name"
                  />

                  {/* Email */}
                  <AnimatedInput
                    label="Business Email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={setEmail}
                    autoComplete="email"
                    errorMessage="Please enter a valid email address"
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={!name || !email || !businessType}
                    loading={loading}
                  >
                    Get My Free Assessment
                    <ArrowRight size={18} />
                  </Button>

                  <p className="text-xs text-text-tertiary text-center">
                    No spam. We&apos;ll only email your assessment report.
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-text-primary mb-2">
                    Assessment Requested
                  </h3>
                  <p className="text-text-secondary mb-6">
                    We&apos;ll deliver your personalized AI opportunity report to{' '}
                    <span className="text-text-primary font-medium">{email}</span>{' '}
                    within 48 hours.
                  </p>
                  <Button href="/services" variant="secondary" size="md">
                    Explore Our Services
                    <ArrowRight size={16} />
                  </Button>
                </motion.div>
              )}
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
