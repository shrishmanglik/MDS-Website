'use client'

import { useState, useRef, useId } from 'react'

interface AnimatedInputProps {
  /** Input label */
  label: string
  /** Input name for form data */
  name: string
  /** Input type */
  type?: 'text' | 'email' | 'tel' | 'url' | 'number' | 'password'
  /** Is this field required? */
  required?: boolean
  /** Validation pattern (regex string) */
  pattern?: string
  /** Validation error message */
  errorMessage?: string
  /** Auto-complete hint */
  autoComplete?: string
  /** Current value (controlled) */
  value?: string
  /** Change handler (controlled) */
  onChange?: (value: string) => void
  /** Additional CSS classes */
  className?: string
  /** Is this a textarea? */
  multiline?: boolean
  /** Rows for textarea */
  rows?: number
}

/**
 * AnimatedInput — floating labels, validation animations, and micro-interactions.
 *
 * Features:
 * - Floating label via CSS :placeholder-shown + :focus
 * - Error shake: 6-frame horizontal oscillation
 * - Valid checkmark: SVG stroke-dashoffset animation
 * - Focus ring with brand accent color
 */
export function AnimatedInput({
  label,
  name,
  type = 'text',
  required = false,
  pattern,
  errorMessage,
  autoComplete,
  value: controlledValue,
  onChange,
  className = '',
  multiline = false,
  rows = 4,
}: AnimatedInputProps) {
  const id = useId()
  const [internalValue, setInternalValue] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [showError, setShowError] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  const value = controlledValue !== undefined ? controlledValue : internalValue

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (onChange) {
      onChange(newValue)
    } else {
      setInternalValue(newValue)
    }

    // Reset error on change
    if (showError) setShowError(false)
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (!value) {
      setIsValid(null)
      return
    }

    // Validate
    const input = inputRef.current
    if (input && 'checkValidity' in input) {
      const valid = input.checkValidity()
      setIsValid(valid)
      if (!valid) {
        setShowError(true)
      }
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
    setShowError(false)
  }

  const isFloated = isFocused || value.length > 0

  const inputClasses = `
    peer w-full bg-transparent border rounded-xl px-4 pt-6 pb-2 text-text-primary text-base
    outline-none transition-all duration-200
    ${showError
      ? 'border-red-500/60 animate-shake'
      : isFocused
        ? 'border-accent-blue/50 ring-1 ring-accent-blue/20'
        : isValid
          ? 'border-emerald-500/40'
          : 'border-border-visible hover:border-border-visible/80'
    }
    ${className}
  `

  const labelClasses = `
    absolute left-4 transition-all duration-200 pointer-events-none select-none
    ${isFloated
      ? 'top-2 text-xs font-medium'
      : 'top-1/2 -translate-y-1/2 text-base'
    }
    ${showError
      ? 'text-red-400'
      : isFocused
        ? 'text-accent-blue'
        : 'text-text-tertiary'
    }
  `

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          autoComplete={autoComplete}
          rows={rows}
          className={inputClasses}
          placeholder=" "
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          pattern={pattern}
          autoComplete={autoComplete}
          className={inputClasses}
          placeholder=" "
        />
      )}

      <label htmlFor={id} className={labelClasses}>
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>

      {/* Valid checkmark */}
      {isValid === true && !isFocused && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="text-emerald-400"
          >
            <path
              d="M5 12l5 5L20 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-checkmark"
              style={{
                strokeDasharray: 30,
                strokeDashoffset: 0,
              }}
            />
          </svg>
        </div>
      )}

      {/* Error message */}
      {showError && errorMessage && (
        <p className="mt-1.5 text-xs text-red-400 animate-fade-in">
          {errorMessage}
        </p>
      )}

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 50%, 90% { transform: translateX(-3px); }
          30%, 70% { transform: translateX(3px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        @keyframes checkmark-draw {
          0% { stroke-dashoffset: 30; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-checkmark {
          animation: checkmark-draw 0.3s ease-out forwards;
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(-4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
