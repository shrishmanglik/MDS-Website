"use client"

import { Check } from 'lucide-react'

interface FormProgressProps {
  steps: readonly string[]
  currentStep: number
}

export function FormProgress({ steps, currentStep }: FormProgressProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8 max-w-md mx-auto">
      {steps.map((label, i) => {
        const stepNum = i + 1
        const active = currentStep >= stepNum
        return (
          <div key={label} className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 text-xs font-medium ${active ? 'text-accent-purple' : 'text-text-tertiary'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                active ? 'bg-accent-purple text-white' : 'bg-bg-tertiary text-text-tertiary'
              }`}>
                {currentStep > stepNum ? <Check size={12} /> : stepNum}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-6 sm:w-10 h-0.5 transition-colors ${currentStep > stepNum ? 'bg-accent-purple' : 'bg-bg-tertiary'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
