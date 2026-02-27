"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, DollarSign, Clock, TrendingUp, ArrowRight, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

const inputStyles =
  'w-full rounded-xl bg-bg-tertiary border border-border-custom px-4 py-3.5 text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-accent-purple focus:outline-none focus:border-accent-purple transition-colors'

export function ROICalculatorContent() {
  const [teamSize, setTeamSize] = useState('')
  const [hoursPerWeek, setHoursPerWeek] = useState('')
  const [hourlyCost, setHourlyCost] = useState('')
  const [showResults, setShowResults] = useState(false)

  const team = parseInt(teamSize) || 0
  const hours = parseInt(hoursPerWeek) || 0
  const cost = parseInt(hourlyCost) || 0

  const weeklyManualCost = team * hours * cost
  const yearlyManualCost = weeklyManualCost * 52
  const automationRate = 0.8
  const yearlySavings = yearlyManualCost * automationRate
  const monthlyHoursSaved = Math.round(team * hours * automationRate * 4.33)

  // Estimate engagement tier
  const estimatedInvestment = hours <= 10 ? 5000 : hours <= 30 ? 10000 : 25000
  const paybackMonths = yearlySavings > 0 ? Math.max(1, Math.round((estimatedInvestment / yearlySavings) * 12)) : 0
  const threeYearROI = yearlySavings > 0 ? Math.round(((yearlySavings * 3 - estimatedInvestment) / estimatedInvestment) * 100) : 0

  const handleCalculate = () => {
    if (team > 0 && hours > 0 && cost > 0) {
      setShowResults(true)
    }
  }

  const handleReset = () => {
    setTeamSize('')
    setHoursPerWeek('')
    setHourlyCost('')
    setShowResults(false)
  }

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'ROI Calculator' },
        ]} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 text-accent-purple text-sm font-semibold mb-6">
            <Calculator size={16} />
            Free Estimate
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-primary gradient-text">
              Calculate Your AI ROI
            </span>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Enter your current manual process costs. See how much AI automation could save your team every year.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-bg-secondary border border-border-custom rounded-2xl p-8"
          >
            <h2 className="font-heading text-xl font-semibold text-text-primary mb-6">
              Your Current Process
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  How many people do this task?
                </label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={teamSize}
                  onChange={(e) => { setTeamSize(e.target.value); setShowResults(false) }}
                  placeholder="e.g., 3"
                  className={inputStyles}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  Hours per week each person spends on it
                </label>
                <input
                  type="number"
                  min="1"
                  max="80"
                  value={hoursPerWeek}
                  onChange={(e) => { setHoursPerWeek(e.target.value); setShowResults(false) }}
                  placeholder="e.g., 10"
                  className={inputStyles}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  Fully-loaded hourly cost per person ($)
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={hourlyCost}
                  onChange={(e) => { setHourlyCost(e.target.value); setShowResults(false) }}
                  placeholder="e.g., 50"
                  className={inputStyles}
                />
                <p className="text-text-tertiary text-xs mt-1">
                  Include salary + benefits + overhead. Typically 1.3-1.5x base salary / 2,080 hours.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleCalculate}
                  disabled={team <= 0 || hours <= 0 || cost <= 0}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 px-6 py-3.5 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-gold text-white hover:brightness-110 hover:scale-[1.02] shadow-lg shadow-accent-purple/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Calculator size={18} />
                  Calculate ROI
                </button>
                {showResults && (
                  <button
                    onClick={handleReset}
                    className="px-4 py-3.5 rounded-xl border border-border-custom text-text-secondary hover:text-text-primary hover:border-accent-purple/30 transition-colors"
                  >
                    <RotateCcw size={18} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {showResults ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Current Cost */}
                  <div className="bg-bg-secondary border border-red-500/20 rounded-2xl p-6">
                    <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-2">Current Annual Cost</p>
                    <p className="text-3xl font-bold text-red-400">
                      ${yearlyManualCost.toLocaleString()}<span className="text-base font-normal text-text-tertiary">/year</span>
                    </p>
                    <p className="text-text-tertiary text-xs mt-1">
                      {team} people × {hours} hrs/week × ${cost}/hr × 52 weeks
                    </p>
                  </div>

                  {/* Savings Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-bg-secondary border border-green-500/20 rounded-2xl p-5">
                      <DollarSign size={20} className="text-green-400 mb-2" />
                      <p className="text-2xl font-bold text-green-400">${yearlySavings.toLocaleString()}</p>
                      <p className="text-text-tertiary text-xs">Annual savings (80% automation)</p>
                    </div>
                    <div className="bg-bg-secondary border border-accent-purple/20 rounded-2xl p-5">
                      <Clock size={20} className="text-accent-purple mb-2" />
                      <p className="text-2xl font-bold text-accent-purple">{monthlyHoursSaved.toLocaleString()} hrs</p>
                      <p className="text-text-tertiary text-xs">Hours saved per month</p>
                    </div>
                    <div className="bg-bg-secondary border border-accent-purple/20 rounded-2xl p-5">
                      <TrendingUp size={20} className="text-accent-purple mb-2" />
                      <p className="text-2xl font-bold text-accent-purple">{paybackMonths} months</p>
                      <p className="text-text-tertiary text-xs">Estimated payback period</p>
                    </div>
                    <div className="bg-bg-secondary border border-green-500/20 rounded-2xl p-5">
                      <TrendingUp size={20} className="text-green-400 mb-2" />
                      <p className="text-2xl font-bold text-green-400">{threeYearROI}%</p>
                      <p className="text-text-tertiary text-xs">3-year ROI</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="bg-bg-secondary border border-border-custom rounded-2xl p-6 text-center">
                    <p className="text-text-secondary text-sm mb-4">
                      Want a detailed breakdown specific to your business?
                    </p>
                    <Button href="/free-audit" variant="primary" size="lg">
                      Get Your Free AI Assessment
                      <ArrowRight size={18} />
                    </Button>
                    <p className="text-text-tertiary text-xs mt-3">
                      Includes custom ROI projections, implementation roadmap, and timeline.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-bg-secondary border border-border-custom rounded-2xl p-12 text-center"
                >
                  <Calculator size={48} className="text-text-tertiary/30 mx-auto mb-4" />
                  <p className="text-text-tertiary text-sm">
                    Fill in your process details to see potential savings.
                  </p>
                  <p className="text-text-tertiary text-xs mt-2">
                    We use an 80% automation rate based on typical engagement results.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-text-tertiary text-xs text-center mt-12"
        >
          Estimates are illustrative and based on an 80% automation rate. Actual results depend on process complexity.
          Investment estimates are approximate. Your free AI assessment includes precise projections for your specific workflows.
        </motion.p>
      </div>
    </div>
  )
}
