'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'

interface BarChartProps {
  /** Data points with label, value, and optional color */
  data: Array<{
    label: string
    value: number
    color?: string
  }>
  /** Maximum value for scale (auto-calculated if not provided) */
  maxValue?: number
  /** Show value labels on bars */
  showValues?: boolean
  /** Value formatter */
  formatValue?: (value: number) => string
  /** Additional CSS classes */
  className?: string
}

/**
 * AnimatedBarChart — SVG bar chart with Framer Motion staggered reveal.
 * Bars grow from bottom when scrolled into view.
 */
export function AnimatedBarChart({
  data,
  maxValue: maxOverride,
  showValues = true,
  formatValue = (v) => String(v),
  className = '',
}: BarChartProps) {
  const { prefersReducedMotion } = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const max = maxOverride || Math.max(...data.map((d) => d.value)) * 1.15
  const barWidth = 100 / data.length
  const chartHeight = 200
  const labelHeight = 40

  const defaultColors = [
    'var(--accent-blue)',
    'var(--accent-purple)',
    'var(--accent-gold)',
    'var(--accent-emerald)',
  ]

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <svg
        viewBox={`0 0 ${data.length * 80} ${chartHeight + labelHeight}`}
        className="w-full h-auto"
        role="img"
        aria-label="Bar chart"
      >
        {data.map((item, i) => {
          const barHeight = (item.value / max) * chartHeight
          const x = i * 80 + 10
          const y = chartHeight - barHeight
          const color = item.color || defaultColors[i % defaultColors.length]

          return (
            <g key={item.label}>
              {/* Bar */}
              <motion.rect
                x={x}
                y={prefersReducedMotion ? y : chartHeight}
                width={60}
                height={prefersReducedMotion ? barHeight : 0}
                rx={4}
                fill={color}
                fillOpacity={0.8}
                animate={
                  isInView
                    ? { y, height: barHeight }
                    : {}
                }
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />

              {/* Value label */}
              {showValues && (
                <motion.text
                  x={x + 30}
                  y={prefersReducedMotion ? y - 8 : chartHeight - 8}
                  textAnchor="middle"
                  fill="var(--text-primary)"
                  fontSize="12"
                  fontFamily="var(--font-jetbrains)"
                  animate={isInView ? { y: y - 8 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {formatValue(item.value)}
                </motion.text>
              )}

              {/* Label */}
              <text
                x={x + 30}
                y={chartHeight + 20}
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="11"
                fontFamily="var(--font-satoshi)"
              >
                {item.label}
              </text>
            </g>
          )
        })}

        {/* Baseline */}
        <line
          x1={0}
          y1={chartHeight}
          x2={data.length * 80}
          y2={chartHeight}
          stroke="var(--border-visible)"
          strokeWidth={1}
        />
      </svg>
    </div>
  )
}

interface DonutChartProps {
  /** Value as percentage (0-100) */
  value: number
  /** Label text */
  label: string
  /** Chart color */
  color?: string
  /** Size in pixels */
  size?: number
  /** Additional CSS classes */
  className?: string
}

/**
 * AnimatedDonutChart — circular progress ring with animated fill.
 */
export function AnimatedDonutChart({
  value,
  label,
  color = 'var(--accent-blue)',
  size = 120,
  className = '',
}: DonutChartProps) {
  const { prefersReducedMotion } = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div ref={ref} className={`inline-flex flex-col items-center ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border-visible)"
          strokeWidth={strokeWidth}
        />
        {/* Progress ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={prefersReducedMotion ? offset : circumference}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          animate={isInView ? { strokeDashoffset: offset } : {}}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
        {/* Center value */}
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--text-primary)"
          fontSize="20"
          fontWeight="bold"
          fontFamily="var(--font-jetbrains)"
        >
          {value}%
        </text>
      </svg>
      <span className="text-text-tertiary text-xs mt-2">{label}</span>
    </div>
  )
}
