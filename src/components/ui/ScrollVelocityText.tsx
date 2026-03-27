"use client"

import { motion } from 'framer-motion'

interface ScrollVelocityTextProps {
  text: string
  className?: string
  baseVelocity?: number
}

export function ScrollVelocityText({ text, className = '', baseVelocity = 2 }: ScrollVelocityTextProps) {
  const repeatedText = Array(8).fill(text).join(' · ')

  return (
    <div className={`overflow-hidden py-6 ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -2000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30 / baseVelocity,
            ease: "linear",
          },
        }}
      >
        <span className="text-text-tertiary/30 text-sm font-mono uppercase tracking-[0.3em] mr-8">
          {repeatedText}
        </span>
        <span className="text-text-tertiary/30 text-sm font-mono uppercase tracking-[0.3em] mr-8">
          {repeatedText}
        </span>
      </motion.div>
    </div>
  )
}
