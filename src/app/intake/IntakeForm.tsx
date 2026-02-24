"use client"

import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Shield,
  Plus,
  Trash2,
} from 'lucide-react'
import Link from 'next/link'
import { WEB3FORMS_KEY } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import {
  type IntakeFormData,
  type IntakeEntity,
  INITIAL_FORM_DATA,
  APP_TYPES,
  BUDGET_TIERS,
  DEPLOYMENT_TARGETS,
  INTEGRATIONS,
} from '@/lib/intake'

const inputStyles =
  'w-full rounded-xl bg-bg-tertiary border border-border-custom px-4 py-3.5 text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-accent-mid focus:outline-none focus:border-accent-mid transition-colors min-h-[44px]'

const STEPS = ['Contact', 'Project', 'Scope', 'Integrations'] as const

// --- Local sub-components ---

function RadioCardGroup({
  options,
  value,
  onChange,
}: {
  options: readonly { value: string; label: string; price: string; description: string }[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={`relative block rounded-2xl border p-5 cursor-pointer transition-all duration-200 ${
            value === opt.value
              ? 'border-accent-start ring-1 ring-accent-start/20 bg-accent-start/5'
              : 'border-border-custom bg-bg-secondary hover:border-border-visible'
          }`}
        >
          <input
            type="radio"
            name="budgetTier"
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="sr-only"
          />
          <p className="font-heading text-base font-semibold text-text-primary mb-1">{opt.label}</p>
          <p className="font-mono text-sm text-accent-mid mb-2">{opt.price}</p>
          <p className="text-text-tertiary text-xs leading-relaxed">{opt.description}</p>
          {value === opt.value && (
            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-accent-start flex items-center justify-center">
              <Check size={12} className="text-white" />
            </div>
          )}
        </label>
      ))}
    </div>
  )
}

function CheckboxCardGroup({
  options,
  selected,
  onChange,
}: {
  options: readonly string[]
  selected: string[]
  onChange: (selected: string[]) => void
}) {
  const toggle = (opt: string) => {
    onChange(
      selected.includes(opt)
        ? selected.filter((s) => s !== opt)
        : [...selected, opt]
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {options.map((opt) => {
        const checked = selected.includes(opt)
        return (
          <label
            key={opt}
            className={`flex items-center gap-2 rounded-xl border px-4 py-3 cursor-pointer transition-all duration-200 text-sm ${
              checked
                ? 'border-accent-mid bg-accent-mid/5 text-text-primary'
                : 'border-border-custom bg-bg-tertiary text-text-secondary hover:border-border-visible'
            }`}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggle(opt)}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                checked ? 'bg-accent-mid' : 'border border-border-custom bg-bg-tertiary'
              }`}
            >
              {checked && <Check size={10} className="text-white" />}
            </div>
            {opt}
          </label>
        )
      })}
    </div>
  )
}

function DynamicEntityList({
  entities,
  onChange,
}: {
  entities: IntakeEntity[]
  onChange: (entities: IntakeEntity[]) => void
}) {
  const updateEntity = (index: number, field: keyof IntakeEntity, value: string) => {
    const updated = [...entities]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const addEntity = () => {
    if (entities.length < 10) {
      onChange([...entities, { name: '', description: '' }])
    }
  }

  const removeEntity = (index: number) => {
    if (entities.length > 1) {
      onChange(entities.filter((_, i) => i !== index))
    }
  }

  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {entities.map((entity, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              type="text"
              value={entity.name}
              onChange={(e) => updateEntity(i, 'name', e.target.value)}
              placeholder="e.g., Users, Invoices, Products"
              className={`${inputStyles} sm:w-1/3`}
            />
            <input
              type="text"
              value={entity.description}
              onChange={(e) => updateEntity(i, 'description', e.target.value)}
              placeholder="Key fields or brief description"
              className={`${inputStyles} flex-1`}
            />
            <button
              type="button"
              onClick={() => removeEntity(i)}
              disabled={entities.length <= 1}
              className="self-center p-2 rounded-lg text-text-tertiary hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Remove entity"
            >
              <Trash2 size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {entities.length < 10 && (
        <button
          type="button"
          onClick={addEntity}
          className="inline-flex items-center gap-1.5 text-sm text-accent-mid hover:text-accent-start transition-colors font-medium"
        >
          <Plus size={14} />
          Add Resource
        </button>
      )}
    </div>
  )
}

// --- Main Form Component ---

export function IntakeForm() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [formData, setFormData] = useState<IntakeFormData>(INITIAL_FORM_DATA)
  const [submittingStep1, setSubmittingStep1] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const goForward = () => {
    setDirection(1)
    setStep((s) => s + 1)
  }

  const goBack = () => {
    setDirection(-1)
    setStep((s) => s - 1)
    setError('')
  }

  const handleStep1 = async (e: FormEvent) => {
    e.preventDefault()
    setSubmittingStep1(true)
    setError('')
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          form_name: 'Project Intake \u2014 Step 1',
          subject: 'New Project Intake Lead \u2014 MDS Website',
          name: formData.name,
          email: formData.email,
          company: formData.company || '(not provided)',
        }),
      })
    } catch {
      // Even if partial submit fails, advance
    } finally {
      setSubmittingStep1(false)
      goForward()
    }
  }

  const handleStep2Next = () => {
    if (!formData.appType) {
      setError('Please select an app type.')
      return
    }
    if (formData.appType === 'Other' && !formData.appTypeOther.trim()) {
      setError('Please describe your app type.')
      return
    }
    if (!formData.budgetTier) {
      setError('Please select a budget tier.')
      return
    }
    setError('')
    goForward()
  }

  const handleStep3Next = () => {
    const hasEntity = formData.entities.some((e) => e.name.trim())
    if (!hasEntity) {
      setError('Please add at least one resource or entity.')
      return
    }
    if (!formData.deploymentTarget) {
      setError('Please select a deployment target.')
      return
    }
    setError('')
    goForward()
  }

  const handleFinalSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const entitiesStr = formData.entities
        .filter((e) => e.name.trim())
        .map((e) => (e.description ? `${e.name}: ${e.description}` : e.name))
        .join('\n')

      const integrationsStr = formData.integrations
        .map((i) => (i === 'Other' ? formData.integrationsOther || 'Other' : i))
        .join(', ')

      const appTypeStr =
        formData.appType === 'Other' ? formData.appTypeOther : formData.appType

      const tierLabel =
        BUDGET_TIERS.find((t) => t.value === formData.budgetTier)?.label || formData.budgetTier

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          form_name: 'Project Intake \u2014 Complete',
          subject: `New Project Intake: ${appTypeStr} (${tierLabel}) \u2014 MDS Website`,
          name: formData.name,
          email: formData.email,
          company: formData.company || '(not provided)',
          app_type: appTypeStr,
          budget_tier: `${tierLabel} (${BUDGET_TIERS.find((t) => t.value === formData.budgetTier)?.price})`,
          entities: entitiesStr,
          deployment_target: formData.deploymentTarget,
          integrations: integrationsStr || '(none selected)',
          notes: formData.notes || '(none)',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // --- Success State ---
  if (submitted) {
    return (
      <div className="pt-24 pb-16 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-green-500" />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-primary gradient-text">
              Your Project Brief is Submitted!
            </span>
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed mb-6">
            We&apos;ll review your requirements and respond with a scoping document
            within 48 hours. Check your inbox for a confirmation.
          </p>

          <div className="bg-bg-secondary border border-border-custom rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-heading text-lg font-semibold text-text-primary mb-4">What Happens Next</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent-mid/10 flex items-center justify-center shrink-0 text-xs font-bold text-accent-mid">1</span>
                <div>
                  <p className="text-text-primary text-sm font-medium">Requirements Review (within 48 hours)</p>
                  <p className="text-text-tertiary text-xs">We analyze your project brief and prepare initial architecture notes</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent-mid/10 flex items-center justify-center shrink-0 text-xs font-bold text-accent-mid">2</span>
                <div>
                  <p className="text-text-primary text-sm font-medium">Scoping Call (15 minutes)</p>
                  <p className="text-text-tertiary text-xs">Quick call to clarify requirements and discuss approach</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent-mid/10 flex items-center justify-center shrink-0 text-xs font-bold text-accent-mid">3</span>
                <div>
                  <p className="text-text-primary text-sm font-medium">Fixed-Price Proposal</p>
                  <p className="text-text-tertiary text-xs">Detailed scope, timeline, architecture, and investment &mdash; you decide when to proceed</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="text-text-secondary text-sm space-y-3 mb-8">
            <p>While you wait:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/case-studies" className="text-accent-mid hover:text-accent-end transition-colors">
                See Our Case Studies &rarr;
              </Link>
              <Link href="/products" className="text-accent-mid hover:text-accent-end transition-colors">
                Explore Our Products &rarr;
              </Link>
            </div>
          </div>
          <Button href="/" variant="secondary" size="lg">
            Back to Homepage
          </Button>
        </motion.div>
      </div>
    )
  }

  // --- Form Steps ---
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Build With Us', href: '/build' },
          { label: 'Project Intake' },
        ]} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary gradient-text">
              Tell Us What You&apos;re Building
            </span>
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto mb-2">
            Structured project brief. We&apos;ll respond with a scoping document within 48 hours.
          </p>
          <p className="text-text-tertiary text-sm">
            Not sure yet?{' '}
            <Link href="/free-audit" className="text-accent-mid hover:underline">
              Start with a free assessment instead.
            </Link>
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8 max-w-md mx-auto">
          {STEPS.map((label, i) => {
            const stepNum = i + 1
            const active = step >= stepNum
            return (
              <div key={label} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 text-xs font-medium ${active ? 'text-accent-mid' : 'text-text-tertiary'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    active ? 'bg-accent-mid text-white' : 'bg-bg-tertiary text-text-tertiary'
                  }`}>
                    {step > stepNum ? <Check size={12} /> : stepNum}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-6 sm:w-10 h-0.5 transition-colors ${step > stepNum ? 'bg-accent-mid' : 'bg-bg-tertiary'}`} />
                )}
              </div>
            )
          })}
        </div>

        {/* Form Card */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait" initial={false}>
            {/* Step 1: Contact Info */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-bg-secondary border border-border-custom rounded-2xl p-8">
                  <h2 className="font-heading text-lg font-semibold text-text-primary mb-6">
                    Who are you?
                  </h2>
                  <form onSubmit={handleStep1} className="space-y-5">
                    <div>
                      <label htmlFor="intake-name" className="block text-sm font-medium text-text-secondary mb-1.5">
                        Your name <span className="text-accent-mid">*</span>
                      </label>
                      <input
                        id="intake-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Smith"
                        className={inputStyles}
                      />
                    </div>
                    <div>
                      <label htmlFor="intake-email" className="block text-sm font-medium text-text-secondary mb-1.5">
                        Work email <span className="text-accent-mid">*</span>
                      </label>
                      <input
                        id="intake-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@company.com"
                        className={inputStyles}
                      />
                    </div>
                    <div>
                      <label htmlFor="intake-company" className="block text-sm font-medium text-text-secondary mb-1.5">
                        Company / Organization
                      </label>
                      <input
                        id="intake-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Inc."
                        className={inputStyles}
                      />
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <button
                      type="submit"
                      disabled={submittingStep1}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:ring-2 focus:ring-accent-mid focus:outline-none px-8 py-4 text-base bg-gradient-to-r from-accent-start via-accent-mid to-accent-end text-white hover:brightness-110 hover:scale-[1.02] shadow-lg shadow-accent-mid/25 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submittingStep1 ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>
                          Next: Project Details
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Step 2: Project Basics */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-bg-secondary border border-border-custom rounded-2xl p-8">
                  <h2 className="font-heading text-lg font-semibold text-text-primary mb-6">
                    What are you building?
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="intake-apptype" className="block text-sm font-medium text-text-secondary mb-1.5">
                        Type of application <span className="text-accent-mid">*</span>
                      </label>
                      <select
                        id="intake-apptype"
                        value={formData.appType}
                        onChange={(e) => setFormData({ ...formData, appType: e.target.value })}
                        className={inputStyles}
                      >
                        <option value="" disabled>Select app type</option>
                        {APP_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    {formData.appType === 'Other' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <label htmlFor="intake-apptype-other" className="block text-sm font-medium text-text-secondary mb-1.5">
                          Describe your app type <span className="text-accent-mid">*</span>
                        </label>
                        <input
                          id="intake-apptype-other"
                          type="text"
                          value={formData.appTypeOther}
                          onChange={(e) => setFormData({ ...formData, appTypeOther: e.target.value })}
                          placeholder="e.g., Chrome extension, Slack bot, IoT dashboard"
                          className={inputStyles}
                        />
                      </motion.div>
                    )}

                    <div>
                      <p className="text-sm font-medium text-text-secondary mb-3">
                        Budget tier <span className="text-accent-mid">*</span>
                      </p>
                      <RadioCardGroup
                        options={BUDGET_TIERS}
                        value={formData.budgetTier}
                        onChange={(v) => setFormData({ ...formData, budgetTier: v })}
                      />
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <div className="flex justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={goBack}
                        className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                      >
                        <ArrowLeft size={16} />
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleStep2Next}
                        className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:ring-2 focus:ring-accent-mid focus:outline-none px-8 py-3.5 text-base bg-gradient-to-r from-accent-start via-accent-mid to-accent-end text-white hover:brightness-110 hover:scale-[1.02] shadow-lg shadow-accent-mid/25"
                      >
                        Next: Scope
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Scope & Entities */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-bg-secondary border border-border-custom rounded-2xl p-8">
                  <h2 className="font-heading text-lg font-semibold text-text-primary mb-2">
                    Define the scope
                  </h2>
                  <p className="text-text-tertiary text-sm mb-6">
                    List the core resources or entities your system needs to handle.
                  </p>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-3">
                        Resources / Entities <span className="text-accent-mid">*</span>
                      </label>
                      <DynamicEntityList
                        entities={formData.entities}
                        onChange={(entities) => setFormData({ ...formData, entities })}
                      />
                    </div>

                    <div>
                      <label htmlFor="intake-deploy" className="block text-sm font-medium text-text-secondary mb-1.5">
                        Deployment target <span className="text-accent-mid">*</span>
                      </label>
                      <select
                        id="intake-deploy"
                        value={formData.deploymentTarget}
                        onChange={(e) => setFormData({ ...formData, deploymentTarget: e.target.value })}
                        className={inputStyles}
                      >
                        <option value="" disabled>Select deployment target</option>
                        {DEPLOYMENT_TARGETS.map((target) => (
                          <option key={target} value={target}>{target}</option>
                        ))}
                      </select>
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <div className="flex justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={goBack}
                        className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                      >
                        <ArrowLeft size={16} />
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleStep3Next}
                        className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:ring-2 focus:ring-accent-mid focus:outline-none px-8 py-3.5 text-base bg-gradient-to-r from-accent-start via-accent-mid to-accent-end text-white hover:brightness-110 hover:scale-[1.02] shadow-lg shadow-accent-mid/25"
                      >
                        Next: Integrations
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Integrations & Notes */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-bg-secondary border border-border-custom rounded-2xl p-8">
                  <h2 className="font-heading text-lg font-semibold text-text-primary mb-6">
                    Integrations &amp; final details
                  </h2>
                  <form onSubmit={handleFinalSubmit} className="space-y-6">
                    <div>
                      <p className="text-sm font-medium text-text-secondary mb-3">
                        What integrations do you need?
                      </p>
                      <CheckboxCardGroup
                        options={INTEGRATIONS}
                        selected={formData.integrations}
                        onChange={(integrations) => setFormData({ ...formData, integrations })}
                      />
                    </div>

                    {formData.integrations.includes('Other') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <label htmlFor="intake-integrations-other" className="block text-sm font-medium text-text-secondary mb-1.5">
                          Describe other integrations
                        </label>
                        <input
                          id="intake-integrations-other"
                          type="text"
                          value={formData.integrationsOther}
                          onChange={(e) => setFormData({ ...formData, integrationsOther: e.target.value })}
                          placeholder="e.g., Twilio, Salesforce, custom API"
                          className={inputStyles}
                        />
                      </motion.div>
                    )}

                    <div>
                      <label htmlFor="intake-notes" className="block text-sm font-medium text-text-secondary mb-1.5">
                        Anything else we should know? <span className="text-text-tertiary text-xs">(optional)</span>
                      </label>
                      <textarea
                        id="intake-notes"
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Timeline constraints, existing tech stack, specific requirements..."
                        className={`${inputStyles} resize-none`}
                      />
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <div className="flex justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={goBack}
                        className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                      >
                        <ArrowLeft size={16} />
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:ring-2 focus:ring-accent-mid focus:outline-none px-8 py-4 text-base bg-gradient-to-r from-accent-start via-accent-mid to-accent-end text-white hover:brightness-110 hover:scale-[1.02] shadow-lg shadow-accent-mid/25 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <Loader2 className="animate-spin" size={20} />
                        ) : (
                          <>
                            Submit Project Brief
                            <ArrowRight size={18} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Privacy note */}
          <p className="text-text-tertiary text-xs text-center mt-6 flex items-center justify-center gap-1.5">
            <Shield size={12} />
            Your data is confidential. We never share your information.{' '}
            <Link href="/privacy" className="text-accent-mid hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
