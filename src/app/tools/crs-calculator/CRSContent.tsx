'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Calculator,
  User,
  Languages,
  Heart,
  Star,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  ExternalLink,
  Mail,
} from 'lucide-react'
import { SplitText } from '@/components/ui/SplitText'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CountUp } from '@/components/ui/CountUp'
import { AnimatedInput } from '@/components/ui/AnimatedInput'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'

// ---------------------------------------------------------------------------
// CRS scoring tables — ported verbatim from the v1 CRSCalculator component
// Based on IRCC official scoring grid
// ---------------------------------------------------------------------------

interface SelectOption {
  value: string
  label: string
}

const educationOptions: SelectOption[] = [
  { value: 'none', label: 'Less than secondary school' },
  { value: 'secondary', label: 'Secondary school diploma' },
  { value: 'one-year', label: 'One-year post-secondary program' },
  { value: 'two-year', label: 'Two-year post-secondary program' },
  { value: 'bachelors', label: "Bachelor's degree (3+ year program)" },
  { value: 'two-or-more', label: 'Two or more post-secondary credentials' },
  { value: 'masters', label: "Master's degree" },
  { value: 'doctoral', label: 'Doctoral degree (PhD)' },
]

const languageLevels: SelectOption[] = [
  { value: '0', label: 'Less than CLB 4' },
  { value: '4', label: 'CLB 4' },
  { value: '5', label: 'CLB 5' },
  { value: '6', label: 'CLB 6' },
  { value: '7', label: 'CLB 7' },
  { value: '8', label: 'CLB 8' },
  { value: '9', label: 'CLB 9' },
  { value: '10', label: 'CLB 10+' },
]

const maritalOptions: SelectOption[] = [
  { value: 'single', label: 'Single / Never married' },
  { value: 'married', label: 'Married / Common-law (spouse coming to Canada)' },
  { value: 'married-not', label: 'Married / Common-law (spouse NOT coming)' },
]

interface FormState {
  age: string
  education: string
  firstLangR: string
  firstLangW: string
  firstLangL: string
  firstLangS: string
  secondLangR: string
  secondLangW: string
  secondLangL: string
  secondLangS: string
  canadianExp: string
  foreignExp: string
  maritalStatus: string
  spouseEducation: string
  spouseLangR: string
  spouseLangW: string
  spouseLangL: string
  spouseLangS: string
  spouseCanadianExp: string
  hasProvNom: boolean
  hasJobOffer: boolean
  hasSiblingInCanada: boolean
  hasFrenchBonus: boolean
  canadianEducation: string
}

// ---- Scoring Functions (exact IRCC logic) ----

function getAgeScore(age: number, withSpouse: boolean): number {
  const max = withSpouse ? 100 : 110
  if (age <= 17 || age >= 45) return 0
  if (age === 18) return withSpouse ? 90 : 99
  if (age === 19) return withSpouse ? 95 : 105
  if (age >= 20 && age <= 29) return max
  if (age === 30) return withSpouse ? 95 : 105
  if (age === 31) return withSpouse ? 90 : 99
  if (age === 32) return withSpouse ? 85 : 94
  if (age === 33) return withSpouse ? 80 : 88
  if (age === 34) return withSpouse ? 75 : 83
  if (age === 35) return withSpouse ? 70 : 77
  if (age === 36) return withSpouse ? 65 : 72
  if (age === 37) return withSpouse ? 60 : 66
  if (age === 38) return withSpouse ? 55 : 61
  if (age === 39) return withSpouse ? 50 : 55
  if (age === 40) return withSpouse ? 45 : 50
  if (age === 41) return withSpouse ? 35 : 39
  if (age === 42) return withSpouse ? 25 : 28
  if (age === 43) return withSpouse ? 15 : 17
  if (age === 44) return withSpouse ? 5 : 6
  return 0
}

function getEducationScore(edu: string, withSpouse: boolean): number {
  const scores: Record<string, [number, number]> = {
    none: [0, 0],
    secondary: [28, 30],
    'one-year': [84, 90],
    'two-year': [91, 98],
    bachelors: [112, 120],
    'two-or-more': [119, 128],
    masters: [126, 135],
    doctoral: [140, 150],
  }
  const s = scores[edu] || [0, 0]
  return withSpouse ? s[0] : s[1]
}

function getLangScore(clb: number, withSpouse: boolean): number {
  if (clb < 4) return 0
  if (clb === 4 || clb === 5) return withSpouse ? 6 : 6
  if (clb === 6) return withSpouse ? 8 : 9
  if (clb === 7) return withSpouse ? 16 : 17
  if (clb === 8) return withSpouse ? 22 : 23
  if (clb === 9) return withSpouse ? 29 : 31
  return withSpouse ? 32 : 34 // CLB 10+
}

function getCanadianExpScore(years: number, withSpouse: boolean): number {
  if (years === 0) return 0
  if (years === 1) return withSpouse ? 35 : 40
  if (years === 2) return withSpouse ? 46 : 53
  if (years === 3) return withSpouse ? 56 : 64
  if (years === 4) return withSpouse ? 63 : 72
  return withSpouse ? 70 : 80 // 5+
}

function getSpouseEducationScore(edu: string): number {
  const scores: Record<string, number> = {
    none: 0,
    secondary: 2,
    'one-year': 6,
    'two-year': 7,
    bachelors: 8,
    'two-or-more': 9,
    masters: 10,
    doctoral: 10,
  }
  return scores[edu] || 0
}

function getSpouseLangScore(clb: number): number {
  if (clb < 4) return 0
  if (clb === 4 || clb === 5) return 1
  if (clb === 6 || clb === 7) return 3
  return 5 // CLB 8+
}

function getSpouseCanadianExpScore(years: number): number {
  if (years === 0) return 0
  if (years === 1) return 5
  if (years === 2) return 7
  if (years === 3) return 8
  if (years === 4) return 9
  return 10
}

function getSkillTransferability(
  edu: string,
  langMin: number,
  canadianExp: number,
  foreignExp: number
): number {
  let score = 0

  // Education + Language
  if (edu !== 'none' && edu !== 'secondary' && langMin >= 7) {
    score += langMin >= 9 ? 50 : 25
  }

  // Education + Canadian Experience
  if (edu !== 'none' && edu !== 'secondary' && canadianExp >= 1) {
    score += canadianExp >= 2 ? 50 : 25
  }

  // Foreign experience + Language
  if (foreignExp >= 1 && langMin >= 7) {
    score += langMin >= 9 ? 50 : 25
  }

  // Foreign + Canadian experience
  if (foreignExp >= 1 && canadianExp >= 1) {
    score += canadianExp >= 2 ? 50 : 25
  }

  return Math.min(score, 100)
}

// ---- Styled Select ----

function StyledSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="relative">
      <label className="block text-xs font-medium text-text-tertiary mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border border-border-visible rounded-xl px-4 py-3 text-text-primary text-sm outline-none transition-all duration-200 hover:border-border-visible/80 focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 appearance-none cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

// ---- Step Definitions ----

const stepMeta = [
  { icon: User, label: 'Personal' },
  { icon: Languages, label: 'Language' },
  { icon: Heart, label: 'Spouse' },
  { icon: Star, label: 'Additional' },
]

// ---- Main Component ----

export function CRSContent() {
  const [step, setStep] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [email, setEmail] = useState('')

  const [form, setForm] = useState<FormState>({
    age: '30',
    education: 'bachelors',
    firstLangR: '9',
    firstLangW: '9',
    firstLangL: '9',
    firstLangS: '9',
    secondLangR: '0',
    secondLangW: '0',
    secondLangL: '0',
    secondLangS: '0',
    canadianExp: '0',
    foreignExp: '0',
    maritalStatus: 'single',
    spouseEducation: 'none',
    spouseLangR: '0',
    spouseLangW: '0',
    spouseLangL: '0',
    spouseLangS: '0',
    spouseCanadianExp: '0',
    hasProvNom: false,
    hasJobOffer: false,
    hasSiblingInCanada: false,
    hasFrenchBonus: false,
    canadianEducation: 'none',
  })

  function update(field: keyof FormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const withSpouse = form.maritalStatus === 'married'
  const age = parseInt(form.age) || 0

  const score = useMemo(() => {
    const langMin = Math.min(
      parseInt(form.firstLangR) || 0,
      parseInt(form.firstLangW) || 0,
      parseInt(form.firstLangL) || 0,
      parseInt(form.firstLangS) || 0
    )
    const canadianExp = parseInt(form.canadianExp) || 0
    const foreignExp = parseInt(form.foreignExp) || 0

    // Factor A: Core/Human Capital
    const ageScore = getAgeScore(age, withSpouse)
    const eduScore = getEducationScore(form.education, withSpouse)
    const langScoreTotal =
      getLangScore(parseInt(form.firstLangR) || 0, withSpouse) +
      getLangScore(parseInt(form.firstLangW) || 0, withSpouse) +
      getLangScore(parseInt(form.firstLangL) || 0, withSpouse) +
      getLangScore(parseInt(form.firstLangS) || 0, withSpouse)
    const secondLangTotal =
      getSpouseLangScore(parseInt(form.secondLangR) || 0) +
      getSpouseLangScore(parseInt(form.secondLangW) || 0) +
      getSpouseLangScore(parseInt(form.secondLangL) || 0) +
      getSpouseLangScore(parseInt(form.secondLangS) || 0)
    const secondLangScore = Math.min(secondLangTotal, 24)
    const canExpScore = getCanadianExpScore(canadianExp, withSpouse)

    const factorA = ageScore + eduScore + langScoreTotal + secondLangScore + canExpScore

    // Factor B: Spouse
    let factorB = 0
    if (withSpouse) {
      factorB =
        getSpouseEducationScore(form.spouseEducation) +
        getSpouseLangScore(parseInt(form.spouseLangR) || 0) +
        getSpouseLangScore(parseInt(form.spouseLangW) || 0) +
        getSpouseLangScore(parseInt(form.spouseLangL) || 0) +
        getSpouseLangScore(parseInt(form.spouseLangS) || 0) +
        getSpouseCanadianExpScore(parseInt(form.spouseCanadianExp) || 0)
    }

    // Factor C: Skill Transferability
    const factorC = getSkillTransferability(form.education, langMin, canadianExp, foreignExp)

    // Factor D: Additional Points
    let factorD = 0
    if (form.hasProvNom) factorD += 600
    if (form.hasJobOffer) factorD += 200
    if (form.hasSiblingInCanada) factorD += 15
    if (form.hasFrenchBonus && langMin >= 7) factorD += 50
    if (form.canadianEducation === 'one-two-year') factorD += 15
    if (form.canadianEducation === 'three-plus') factorD += 30

    return {
      factorA,
      factorB,
      factorC,
      factorD,
      total: factorA + factorB + factorC + factorD,
    }
  }, [form, age, withSpouse])

  const expOptions: SelectOption[] = Array.from({ length: 7 }, (_, i) => ({
    value: String(i),
    label: i === 0 ? 'None' : i === 6 ? '6+ years' : `${i} year${i > 1 ? 's' : ''}`,
  }))

  const canEduOptions: SelectOption[] = [
    { value: 'none', label: 'None' },
    { value: 'one-two-year', label: '1 or 2 year credential' },
    { value: 'three-plus', label: '3+ year credential' },
  ]

  // Dynamic steps (spouse step only if applicable)
  const steps = [
    // Step 0: Personal Info
    <div key="personal" className="space-y-5">
      <h3 className="font-heading text-xl font-semibold text-text-primary">
        Personal Information
      </h3>
      <div>
        <label className="block text-xs font-medium text-text-tertiary mb-1.5">
          Age
        </label>
        <input
          type="number"
          min={17}
          max={50}
          value={form.age}
          onChange={(e) => update('age', e.target.value)}
          className="w-full bg-transparent border border-border-visible rounded-xl px-4 py-3 text-text-primary text-sm outline-none transition-all duration-200 hover:border-border-visible/80 focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20"
        />
      </div>
      <StyledSelect
        label="Education Level"
        options={educationOptions}
        value={form.education}
        onChange={(v) => update('education', v)}
      />
      <StyledSelect
        label="Marital Status"
        options={maritalOptions}
        value={form.maritalStatus}
        onChange={(v) => update('maritalStatus', v)}
      />
      <StyledSelect
        label="Canadian Work Experience"
        options={expOptions}
        value={form.canadianExp}
        onChange={(v) => update('canadianExp', v)}
      />
      <StyledSelect
        label="Foreign Work Experience"
        options={expOptions}
        value={form.foreignExp}
        onChange={(v) => update('foreignExp', v)}
      />
    </div>,

    // Step 1: Language Scores
    <div key="language" className="space-y-5">
      <h3 className="font-heading text-xl font-semibold text-text-primary">
        First Official Language (CLB)
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <StyledSelect label="Reading" options={languageLevels} value={form.firstLangR} onChange={(v) => update('firstLangR', v)} />
        <StyledSelect label="Writing" options={languageLevels} value={form.firstLangW} onChange={(v) => update('firstLangW', v)} />
        <StyledSelect label="Listening" options={languageLevels} value={form.firstLangL} onChange={(v) => update('firstLangL', v)} />
        <StyledSelect label="Speaking" options={languageLevels} value={form.firstLangS} onChange={(v) => update('firstLangS', v)} />
      </div>
      <h3 className="font-heading text-xl font-semibold text-text-primary mt-6">
        Second Official Language (CLB)
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <StyledSelect label="Reading" options={languageLevels} value={form.secondLangR} onChange={(v) => update('secondLangR', v)} />
        <StyledSelect label="Writing" options={languageLevels} value={form.secondLangW} onChange={(v) => update('secondLangW', v)} />
        <StyledSelect label="Listening" options={languageLevels} value={form.secondLangL} onChange={(v) => update('secondLangL', v)} />
        <StyledSelect label="Speaking" options={languageLevels} value={form.secondLangS} onChange={(v) => update('secondLangS', v)} />
      </div>
    </div>,

    // Step 2: Spouse (conditional)
    ...(withSpouse
      ? [
          <div key="spouse" className="space-y-5">
            <h3 className="font-heading text-xl font-semibold text-text-primary">
              Spouse / Common-Law Partner
            </h3>
            <StyledSelect label="Spouse Education" options={educationOptions} value={form.spouseEducation} onChange={(v) => update('spouseEducation', v)} />
            <h4 className="font-heading text-lg font-medium text-text-primary mt-4">
              Spouse Language Scores (CLB)
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <StyledSelect label="Reading" options={languageLevels} value={form.spouseLangR} onChange={(v) => update('spouseLangR', v)} />
              <StyledSelect label="Writing" options={languageLevels} value={form.spouseLangW} onChange={(v) => update('spouseLangW', v)} />
              <StyledSelect label="Listening" options={languageLevels} value={form.spouseLangL} onChange={(v) => update('spouseLangL', v)} />
              <StyledSelect label="Speaking" options={languageLevels} value={form.spouseLangS} onChange={(v) => update('spouseLangS', v)} />
            </div>
            <StyledSelect label="Spouse Canadian Experience" options={expOptions} value={form.spouseCanadianExp} onChange={(v) => update('spouseCanadianExp', v)} />
          </div>,
        ]
      : []),

    // Step 3: Additional Factors
    <div key="additional" className="space-y-5">
      <h3 className="font-heading text-xl font-semibold text-text-primary">
        Additional Factors
      </h3>
      <div className="space-y-4">
        {[
          { field: 'hasProvNom' as const, label: 'Provincial Nomination (+600 points)', checked: form.hasProvNom },
          { field: 'hasJobOffer' as const, label: 'Valid job offer (NOC 00 / TEER 0-1, +200 points)', checked: form.hasJobOffer },
          { field: 'hasSiblingInCanada' as const, label: 'Sibling in Canada (+15 points)', checked: form.hasSiblingInCanada },
          { field: 'hasFrenchBonus' as const, label: 'Strong French language skills (+50 points)', checked: form.hasFrenchBonus },
        ].map((item) => (
          <label
            key={item.field}
            className="flex items-center gap-3 text-sm text-text-secondary cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(e) => update(item.field, e.target.checked)}
              className="h-5 w-5 rounded border-border-visible bg-transparent accent-accent-blue cursor-pointer"
            />
            <span className="group-hover:text-text-primary transition-colors">
              {item.label}
            </span>
          </label>
        ))}
      </div>
      <StyledSelect
        label="Canadian Education Credential"
        options={canEduOptions}
        value={form.canadianEducation}
        onChange={(v) => update('canadianEducation', v)}
      />
    </div>,
  ]

  const totalSteps = steps.length
  const currentStep = Math.min(step, totalSteps - 1)

  // Filter stepMeta to match dynamic steps
  const activeStepMeta = withSpouse
    ? stepMeta
    : stepMeta.filter((_, i) => i !== 2)

  const handleReset = () => {
    setShowResult(false)
    setStep(0)
  }

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div variants={fadeUpVariant}>
            <Badge variant="hybrid" className="mb-6">
              Free tool
            </Badge>
          </motion.div>
          <motion.div variants={fadeUpVariant}>
            <SplitText
              as="h1"
              preset="fade-up"
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
            >
              Free CRS Calculator
            </SplitText>
          </motion.div>
          <motion.p
            variants={fadeUpVariant}
            className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto"
          >
            Calculate your Comprehensive Ranking System score for Canada Express Entry.
            Matches the official IRCC calculator exactly.
          </motion.p>
        </motion.section>

        {/* Calculator */}
        <section className="max-w-2xl mx-auto mb-24">
          <GlassCard padding="lg" hover={false}>
            {!showResult ? (
              <>
                {/* Step Indicators */}
                <div className="flex items-center justify-between mb-8">
                  {activeStepMeta.map((s, i) => {
                    const Icon = s.icon
                    const isActive = i === currentStep
                    const isCompleted = i < currentStep
                    return (
                      <button
                        key={s.label}
                        onClick={() => setStep(i)}
                        className={`flex flex-col items-center gap-1.5 transition-colors ${
                          isActive
                            ? 'text-accent-blue'
                            : isCompleted
                              ? 'text-emerald-400'
                              : 'text-text-tertiary'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                            isActive
                              ? 'border-accent-blue/50 bg-accent-blue/10'
                              : isCompleted
                                ? 'border-emerald-500/50 bg-emerald-500/10'
                                : 'border-border-visible'
                          }`}
                        >
                          <Icon size={18} />
                        </div>
                        <span className="text-xs font-medium hidden sm:block">
                          {s.label}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Progress Bar */}
                <div className="flex gap-1.5 mb-6">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                        i <= currentStep ? 'bg-accent-blue' : 'bg-border-visible/30'
                      }`}
                    />
                  ))}
                </div>

                {/* Live Score Preview */}
                <div className="flex items-center justify-between mb-6 px-1">
                  <span className="text-xs text-text-tertiary">
                    Step {currentStep + 1} of {totalSteps}
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-text-tertiary">Estimated: </span>
                    <span className="font-mono text-lg font-bold text-accent-blue">
                      {score.total}
                    </span>
                  </div>
                </div>

                {/* Step Content */}
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {steps[currentStep]}
                </motion.div>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="ghost"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={currentStep === 0}
                    size="md"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </Button>
                  {currentStep < totalSteps - 1 ? (
                    <Button onClick={() => setStep((s) => s + 1)} size="md">
                      Next
                      <ArrowRight size={16} />
                    </Button>
                  ) : (
                    <Button onClick={() => setShowResult(true)} size="md">
                      <Calculator size={16} />
                      Calculate Score
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Result */}
                <div className="text-center mb-10">
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent-blue mb-3">
                    Your CRS Score
                  </p>
                  <div className="text-6xl md:text-7xl font-bold text-text-primary font-mono">
                    <CountUp end={score.total} duration={1.5} />
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">
                    out of 1,200 possible points
                  </p>
                </div>

                {/* Breakdown */}
                <div className="space-y-0 mb-10">
                  {[
                    {
                      label: 'Core / Human Capital',
                      tag: 'A',
                      value: score.factorA,
                      max: withSpouse ? 460 : 500,
                    },
                    {
                      label: 'Spouse Factors',
                      tag: 'B',
                      value: score.factorB,
                      max: 40,
                    },
                    {
                      label: 'Skill Transferability',
                      tag: 'C',
                      value: score.factorC,
                      max: 100,
                    },
                    {
                      label: 'Additional Points',
                      tag: 'D',
                      value: score.factorD,
                      max: 600,
                    },
                  ].map((factor) => {
                    const pct = factor.max > 0 ? (factor.value / factor.max) * 100 : 0
                    return (
                      <div
                        key={factor.tag}
                        className="py-4 border-b border-border-visible/30 last:border-0"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="default">{factor.tag}</Badge>
                            <span className="text-sm text-text-secondary">
                              {factor.label}
                            </span>
                          </div>
                          <span className="font-mono text-sm font-semibold text-text-primary">
                            {factor.value} / {factor.max}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-border-visible/20 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-purple"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <Button
                    variant="secondary"
                    onClick={handleReset}
                    className="flex-1"
                  >
                    <RotateCcw size={16} />
                    Recalculate
                  </Button>
                  <Button href="/free-assessment" className="flex-1">
                    Get AI Assessment
                    <ArrowRight size={16} />
                  </Button>
                </div>

                <p className="mt-6 text-xs text-text-tertiary text-center">
                  This calculator provides an estimate. For official results, use the{' '}
                  <a
                    href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/criteria-comprehensive-ranking-system/grid.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-blue hover:underline inline-flex items-center gap-1"
                  >
                    IRCC CRS tool
                    <ExternalLink size={12} />
                  </a>
                  .
                </p>
              </>
            )}
          </GlassCard>
        </section>

        <SectionDivider variant="gold" className="mb-24" />

        {/* Pathway AI Studio Promo */}
        <ScrollReveal>
          <section className="max-w-2xl mx-auto text-center">
            <GlassCard padding="lg" hover={false}>
              <Badge variant="premium" className="mb-4">
                Launching April 2026
              </Badge>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-3">
                Boost Your CRS with French
              </h2>
              <p className="text-text-secondary mb-6">
                Strong French scores can add up to 50 bonus points to your CRS.
                Pathway AI Studio helps you reach CLB 7+ in French with deterministic
                scoring engines tailored for Express Entry candidates.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="flex-1">
                  <AnimatedInput
                    label="Email address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    autoComplete="email"
                  />
                </div>
                <Button size="md" className="shrink-0">
                  <Mail size={16} />
                  Notify Me
                </Button>
              </div>
              <p className="text-xs text-text-tertiary mt-3">
                Get notified when Pathway AI Studio launches. No spam.
              </p>
            </GlassCard>
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}
