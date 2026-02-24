"use client"

import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion'
import { ReducedMotionProvider, useReducedMotion } from '@/lib/useReducedMotion'

function MotionConfigWrapper({ children }: { children: React.ReactNode }) {
  const { prefersReducedMotion } = useReducedMotion()

  return (
    <MotionConfig reducedMotion={prefersReducedMotion ? 'always' : 'never'}>
      {children}
    </MotionConfig>
  )
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReducedMotionProvider>
      <LazyMotion features={domAnimation}>
        <MotionConfigWrapper>
          {children}
        </MotionConfigWrapper>
      </LazyMotion>
    </ReducedMotionProvider>
  )
}
