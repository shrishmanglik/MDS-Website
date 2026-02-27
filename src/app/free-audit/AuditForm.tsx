"use client"

import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardCheck, ArrowRight, Route, BarChart3, FileCheck, Shield, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { submitForm } from '@/lib/forms/submitForm'
import { FormSuccess } from '@/components/forms/FormSuccess'

const SLOTS_CLAIMED = 7
const SLOTS_TOTAL = 10

const deliverables = [
  {
    icon: FileCheck,
    title: 'AI Opportunity Report (5-page PDF)',
    description: 'Detailed analysis identifying 5-7 automation opportunities, ranked by impact and feasibility',
  },
  {
    icon: Route,
    title: 'Implementation Roadmap',
    description: 'A prioritized, week-by-week plan showing exactly which processes to automate first',
  },
  {
    icon: BarChart3,
    title: 'ROI Calculator',
    description: 'Custom calculations showing projected cost savings, time recovered, and payback period',
  },
  {
    icon: Shield,
    title: '100% Confidential',
    description: 'Your business data is analyzed privately and never shared. Report delivered within 48 hours',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const inputStyles =
  'w-full rounded-xl bg-bg-tertiary border border-border-custom px-4 py-3.5 text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-accent-purple focus:outline-none focus:border-accent-purple transition-colors min-h-[44px]'

const automationTypes = [
  'Data Entry & Processing',
  'Document Processing',
  'Customer Support',
  'HR & Recruiting',
  'Financial Operations',
  'Other',
]

export function AuditForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    automation_type: '',
    name: '',
    email: '',
    company: '',
    team_size: '',
    notes: '',
  })
  const [submittingStep1, setSubmittingStep1] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleStep1 = async (e: FormEvent) => {
    e.preventDefault()
    setSubmittingStep1(true)
    setError('')
    try {
      // Submit step 1 to capture the lead immediately
      await submitForm({
        form_name: 'AI Assessment — Step 1',
        subject: 'New AI Assessment Lead — MDS Website',
        name: formData.name,
        email: formData.email,
        automation_type: formData.automation_type,
      })
      setStep(2)
    } catch {
      // Even if submission fails, move to step 2
      setStep(2)
    } finally {
      setSubmittingStep1(false)
    }
  }

  const handleStep2 = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const result = await submitForm({
      form_name: 'AI Assessment — Complete',
      subject: 'New AI Assessment Request — MDS Website',
      ...formData,
    })
    if (result.success) {
      setSubmitted(true)
    } else {
      setError(result.message)
    }
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <FormSuccess
        headline="Your Assessment Request is Confirmed!"
        message="We'll deliver your 5-page AI Opportunity Report within 48 hours. Check your inbox for a confirmation email."
        nextSteps={[
          { title: 'Assessment Report (within 48 hours)', description: '5-page PDF with automation opportunities, ROI projections, and roadmap' },
          { title: 'Discovery Call Invitation', description: "If there's a fit, we'll invite you to a 30-minute call to discuss findings" },
          { title: 'Custom Proposal', description: 'Clear scope, timeline, and investment — you decide if and when to proceed' },
        ]}
        waitLinks={[
          { label: 'See Our Case Studies', href: '/case-studies' },
          { label: 'Calculate Your ROI', href: '/roi-calculator' },
        ]}
      />
    )
  }

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary gradient-text">
              Get Your Free AI Assessment
            </span>
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto mb-3">
            Get a 5-page AI Opportunity Report with automation roadmap, ROI projections,
            and implementation timeline &mdash; delivered within 48 hours. No strings attached.
          </p>
          <p className="text-text-tertiary text-sm max-w-xl mx-auto">
            Want deeper analysis? This assessment is the first step toward our{' '}
            <Link href="/services" className="text-accent-purple hover:underline">paid AI Audit</Link>
            {' '}&mdash; but the report alone is often enough to get started.
          </p>
        </motion.div>

        {/* Urgency — Audit Slots */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-md mx-auto mb-12 bg-bg-secondary border border-border-custom rounded-2xl p-6 text-center"
        >
          <p className="text-text-primary font-heading font-semibold text-sm mb-2">
            February 2026 Assessment Capacity
          </p>
          <p className="text-text-tertiary text-xs mb-3">
            We limit free assessments to {SLOTS_TOTAL} per month to ensure depth and quality.
          </p>
          <div className="w-full bg-bg-tertiary rounded-full h-2.5 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(SLOTS_CLAIMED / SLOTS_TOTAL) * 100}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-gradient-to-r from-accent-blue to-accent-gold h-2.5 rounded-full"
            />
          </div>
          <p className="text-accent-purple text-xs font-medium">
            {SLOTS_CLAIMED} of {SLOTS_TOTAL} slots claimed this month
          </p>
        </motion.div>

        {/* Deliverables Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto"
        >
          {deliverables.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="bg-bg-secondary border border-border-custom rounded-2xl p-5 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center mx-auto mb-3">
                <item.icon size={24} className="text-accent-purple" />
              </div>
              <h3 className="font-heading text-sm font-semibold text-text-primary mb-1">
                {item.title}
              </h3>
              <p className="text-text-tertiary text-xs leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* 2-Step Form */}
        <div className="max-w-xl mx-auto">
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className={`flex items-center gap-2 text-sm font-medium ${step >= 1 ? 'text-accent-purple' : 'text-text-tertiary'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-accent-purple text-white' : 'bg-bg-tertiary text-text-tertiary'}`}>1</span>
              Basics
            </div>
            <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-accent-purple' : 'bg-bg-tertiary'}`} />
            <div className={`flex items-center gap-2 text-sm font-medium ${step >= 2 ? 'text-accent-purple' : 'text-text-tertiary'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-accent-purple text-white' : 'bg-bg-tertiary text-text-tertiary'}`}>2</span>
              Details
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-bg-secondary border border-border-custom rounded-2xl p-8">
                  <form onSubmit={handleStep1} className="space-y-5">
                    {/* Honeypot */}
                    <input type="text" name="_honeypot" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                    <div>
                      <label htmlFor="automation-type" className="block text-sm font-medium text-text-secondary mb-1.5">
                        What type of work do you want to automate? <span className="text-accent-purple">*</span>
                      </label>
                      <select
                        id="automation-type"
                        required
                        value={formData.automation_type}
                        onChange={(e) => setFormData({ ...formData, automation_type: e.target.value })}
                        className={inputStyles}
                      >
                        <option value="" disabled>Select a category</option>
                        {automationTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1.5">
                        Your name <span className="text-accent-purple">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Smith"
                        className={inputStyles}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1.5">
                        Work email <span className="text-accent-purple">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@company.com"
                        className={inputStyles}
                      />
                    </div>

                    <div aria-live="polite">
                      {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={submittingStep1}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:ring-2 focus:ring-accent-purple focus:outline-none px-8 py-4 text-lg bg-gradient-to-r from-accent-blue via-accent-purple to-accent-gold text-white hover:brightness-110 hover:scale-[1.02] shadow-lg shadow-accent-purple/25 hover:shadow-xl hover:shadow-accent-purple/35 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submittingStep1 ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>
                          Get My Free Assessment
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>

                    <p className="text-text-tertiary text-xs text-center">
                      No commitment. No credit card. Your data stays private.
                    </p>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-bg-secondary border border-border-custom rounded-2xl p-8">
                  <p className="text-text-secondary text-sm mb-6">
                    Almost done &mdash; a few more details help us personalize your 5-page report.
                  </p>
                  <form onSubmit={handleStep2} className="space-y-5">
                    {/* Honeypot */}
                    <input type="text" name="_honeypot" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-text-secondary mb-1.5">
                        Company / Organization
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Inc."
                        className={inputStyles}
                      />
                    </div>

                    <div>
                      <label htmlFor="team-size" className="block text-sm font-medium text-text-secondary mb-1.5">
                        Team size
                      </label>
                      <select
                        id="team-size"
                        value={formData.team_size}
                        onChange={(e) => setFormData({ ...formData, team_size: e.target.value })}
                        className={inputStyles}
                      >
                        <option value="" disabled>Select size</option>
                        <option value="1-10">1-10</option>
                        <option value="11-50">11-50</option>
                        <option value="51-200">51-200</option>
                        <option value="200+">200+</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-text-secondary mb-1.5">
                        Anything else you&apos;d like us to know? <span className="text-text-tertiary text-xs">(optional)</span>
                      </label>
                      <textarea
                        id="notes"
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="e.g., We process 500+ invoices monthly..."
                        className={`${inputStyles} resize-none`}
                      />
                    </div>

                    <div aria-live="polite">
                      {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:ring-2 focus:ring-accent-purple focus:outline-none px-8 py-4 text-lg bg-gradient-to-r from-accent-blue via-accent-purple to-accent-gold text-white hover:brightness-110 hover:scale-[1.02] shadow-lg shadow-accent-purple/25 hover:shadow-xl hover:shadow-accent-purple/35 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>
                          <ClipboardCheck size={20} />
                          Submit
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>

                    <p className="text-text-tertiary text-xs text-center flex items-center justify-center gap-1.5">
                      <Shield size={12} />
                      Your data is confidential. We never share your information.{' '}
                      <Link href="/privacy" className="text-accent-purple hover:underline">Privacy Policy</Link>
                    </p>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
