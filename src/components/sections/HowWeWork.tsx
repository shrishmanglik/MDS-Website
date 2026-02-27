'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@/hooks/useGSAP'
import { useReducedMotion } from '@/lib/useReducedMotion'

/* ------------------------------------------------------------------ */
/*  Step data                                                          */
/* ------------------------------------------------------------------ */

const steps = [
  {
    number: '01',
    title: 'Tell Us What You Need',
    description:
      'Share your challenge. We scope the system, identify automation opportunities, and map the architecture in a free strategy call.',
    tint: 'var(--bg-tint-blue)',
    accent: 'var(--accent-blue)',
  },
  {
    number: '02',
    title: 'We Architect & Build',
    description:
      'Deterministic-first development. 95% rule-based logic, AI only where it adds real value. Weekly builds, full transparency.',
    tint: 'var(--bg-tint-purple)',
    accent: 'var(--accent-purple)',
  },
  {
    number: '03',
    title: 'You Own Everything',
    description:
      'Complete code ownership. Your infrastructure, your IP, your system. No vendor lock-in, no recurring platform fees.',
    tint: '#1A150A', // warm gold tint
    accent: 'var(--accent-gold)',
  },
]

/* ------------------------------------------------------------------ */
/*  SVG connector (progress line between steps)                        */
/* ------------------------------------------------------------------ */

function ProgressConnector({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 200 4"
      fill="none"
      preserveAspectRatio="none"
    >
      {/* Track */}
      <line
        x1="0"
        y1="2"
        x2="200"
        y2="2"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Progress — animated via GSAP stroke-dashoffset */}
      <line
        className="hw-connector-progress"
        x1="0"
        y1="2"
        x2="200"
        y2="2"
        stroke="url(#hw-connector-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="200"
        strokeDashoffset="200"
      />
      <defs>
        <linearGradient id="hw-connector-gradient" x1="0" y1="0" x2="200" y2="0">
          <stop offset="0%" stopColor="var(--accent-blue)" />
          <stop offset="50%" stopColor="var(--accent-purple)" />
          <stop offset="100%" stopColor="var(--accent-gold)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function VerticalProgressConnector({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 4 200"
      fill="none"
      preserveAspectRatio="none"
    >
      <line
        x1="2"
        y1="0"
        x2="2"
        y2="200"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        className="hw-connector-progress-v"
        x1="2"
        y1="0"
        x2="2"
        y2="200"
        stroke="url(#hw-connector-gradient-v)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="200"
        strokeDashoffset="200"
      />
      <defs>
        <linearGradient id="hw-connector-gradient-v" x1="0" y1="0" x2="0" y2="200">
          <stop offset="0%" stopColor="var(--accent-blue)" />
          <stop offset="50%" stopColor="var(--accent-purple)" />
          <stop offset="100%" stopColor="var(--accent-gold)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Step card — used in both desktop (GSAP) and mobile (static/FM)     */
/* ------------------------------------------------------------------ */

function StepCard({
  step,
  style,
  className = '',
}: {
  step: (typeof steps)[number]
  style?: React.CSSProperties
  className?: string
}) {
  return (
    <div className={`hw-step ${className}`} style={style}>
      {/* Large step number */}
      <span
        className="hw-step-number block font-mono font-bold select-none gradient-text"
        aria-hidden="true"
        style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 1 }}
      >
        {step.number}
      </span>

      {/* Title */}
      <h3
        className="hw-step-title font-heading text-2xl md:text-3xl font-semibold mt-4 mb-3"
        style={{ color: 'var(--text-primary)' }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p
        className="hw-step-desc text-base md:text-lg leading-relaxed max-w-md"
        style={{ color: 'var(--text-secondary)' }}
      >
        {step.description}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Desktop: scroll-pinned GSAP version                                */
/* ------------------------------------------------------------------ */

function HowWeWorkDesktop() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  useGSAP(
    (gsap, ScrollTrigger) => {
      const section = sectionRef.current
      const sticky = stickyRef.current
      if (!section || !sticky) return

      const stepEls = sticky.querySelectorAll<HTMLElement>('.hw-step')
      const bgEl = sticky.querySelector<HTMLElement>('.hw-bg')
      const connectorH = sticky.querySelector<SVGLineElement>('.hw-connector-progress')
      const connectorV = sticky.querySelector<SVGLineElement>('.hw-connector-progress-v')

      if (stepEls.length !== 3) return

      // Set initial states: all steps hidden
      gsap.set(stepEls, { opacity: 0, scale: 0.85, y: 30 })
      gsap.set(
        Array.from(stepEls).flatMap((el) => [
          el.querySelector('.hw-step-title'),
          el.querySelector('.hw-step-desc'),
        ]),
        { opacity: 0, y: 20 }
      )
      gsap.set(
        Array.from(stepEls).map((el) => el.querySelector('.hw-step-number')),
        { opacity: 0, scale: 3 }
      )

      // Build the master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: false, // CSS sticky handles pinning
        },
      })

      /* --- Step 01 in --- */
      // 0.0 -> 0.15: Step 01 number scales in, step fades in
      tl.to(
        stepEls[0].querySelector('.hw-step-number'),
        { opacity: 1, scale: 1, duration: 0.12, ease: 'power3.out' },
        0
      )
      tl.to(
        stepEls[0],
        { opacity: 1, scale: 1, y: 0, duration: 0.12, ease: 'power2.out' },
        0.02
      )
      tl.to(
        stepEls[0].querySelector('.hw-step-title'),
        { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' },
        0.06
      )
      tl.to(
        stepEls[0].querySelector('.hw-step-desc'),
        { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' },
        0.08
      )

      // Background tint -> blue
      if (bgEl) {
        tl.to(bgEl, { backgroundColor: steps[0].tint, duration: 0.12 }, 0)
      }

      // 0.15 -> 0.30: Step 01 visible, connector draws to 33%
      if (connectorH) {
        tl.to(connectorH, { strokeDashoffset: 200 * 0.67, duration: 0.15, ease: 'none' }, 0.15)
      }
      if (connectorV) {
        tl.to(connectorV, { strokeDashoffset: 200 * 0.67, duration: 0.15, ease: 'none' }, 0.15)
      }

      /* --- Step 01 out, Step 02 in --- */
      // 0.30 -> 0.35
      tl.to(stepEls[0], { opacity: 0, y: -20, duration: 0.05, ease: 'power2.in' }, 0.30)

      // Step 02 number scale-in
      tl.to(
        stepEls[1].querySelector('.hw-step-number'),
        { opacity: 1, scale: 1, duration: 0.10, ease: 'power3.out' },
        0.32
      )
      tl.to(
        stepEls[1],
        { opacity: 1, scale: 1, y: 0, duration: 0.10, ease: 'power2.out' },
        0.33
      )
      tl.to(
        stepEls[1].querySelector('.hw-step-title'),
        { opacity: 1, y: 0, duration: 0.06, ease: 'power2.out' },
        0.36
      )
      tl.to(
        stepEls[1].querySelector('.hw-step-desc'),
        { opacity: 1, y: 0, duration: 0.06, ease: 'power2.out' },
        0.38
      )

      // Background tint -> purple
      if (bgEl) {
        tl.to(bgEl, { backgroundColor: steps[1].tint, duration: 0.10 }, 0.30)
      }

      // 0.35 -> 0.50: Step 02 visible, connector draws to 66%
      if (connectorH) {
        tl.to(connectorH, { strokeDashoffset: 200 * 0.34, duration: 0.15, ease: 'none' }, 0.35)
      }
      if (connectorV) {
        tl.to(connectorV, { strokeDashoffset: 200 * 0.34, duration: 0.15, ease: 'none' }, 0.35)
      }

      /* --- Step 02 out, Step 03 in --- */
      // 0.50 -> 0.55
      tl.to(stepEls[1], { opacity: 0, y: -20, duration: 0.05, ease: 'power2.in' }, 0.50)

      tl.to(
        stepEls[2].querySelector('.hw-step-number'),
        { opacity: 1, scale: 1, duration: 0.10, ease: 'power3.out' },
        0.52
      )
      tl.to(
        stepEls[2],
        { opacity: 1, scale: 1, y: 0, duration: 0.10, ease: 'power2.out' },
        0.53
      )
      tl.to(
        stepEls[2].querySelector('.hw-step-title'),
        { opacity: 1, y: 0, duration: 0.06, ease: 'power2.out' },
        0.56
      )
      tl.to(
        stepEls[2].querySelector('.hw-step-desc'),
        { opacity: 1, y: 0, duration: 0.06, ease: 'power2.out' },
        0.58
      )

      // Background tint -> gold
      if (bgEl) {
        tl.to(bgEl, { backgroundColor: steps[2].tint, duration: 0.10 }, 0.50)
      }

      // 0.55 -> 0.70: Step 03 visible, connector draws to 100%
      if (connectorH) {
        tl.to(connectorH, { strokeDashoffset: 0, duration: 0.15, ease: 'none' }, 0.55)
      }
      if (connectorV) {
        tl.to(connectorV, { strokeDashoffset: 0, duration: 0.15, ease: 'none' }, 0.55)
      }

      // 0.70 -> 1.0: hold final state (no additional tweens needed)

      return () => {
        tl.kill()
      }
    },
    [],
    sectionRef
  )

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="relative"
      style={{ minHeight: '300vh' }}
      aria-label="How We Work — 3-step process"
    >
      {/* Sticky viewport container */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Animated background tint */}
        <div
          className="hw-bg absolute inset-0 transition-colors duration-700"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        />

        {/* Content layer */}
        <div className="relative z-10 w-full max-w-content mx-auto px-6">
          {/* Section header — always visible */}
          <div className="text-center mb-10">
            <p
              className="font-mono text-xs md:text-sm uppercase tracking-widest mb-3"
              style={{ color: 'var(--text-tertiary)', letterSpacing: 'var(--tracking-ultra-wide)' }}
            >
              Our Process
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              How We Work
            </h2>
          </div>

          {/* Step cards — positioned absolutely on top of each other */}
          <div className="relative flex items-center justify-center" style={{ minHeight: '220px' }}>
            {steps.map((step) => (
              <StepCard
                key={step.number}
                step={step}
                className="absolute inset-0 flex flex-col items-center text-center"
              />
            ))}
          </div>

          {/* Horizontal connector (desktop) */}
          <div className="mt-10 flex justify-center">
            <ProgressConnector className="hidden md:block w-full max-w-lg h-1" />
            <VerticalProgressConnector className="md:hidden w-1 h-20" />
          </div>

          {/* Step indicators */}
          <div className="flex justify-center gap-8 mt-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex items-center gap-2"
              >
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: step.accent }}
                  aria-hidden="true"
                />
                <span
                  className="font-mono text-xs uppercase tracking-wider"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  Step {step.number}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Mobile: stacked cards with Framer Motion whileInView               */
/* ------------------------------------------------------------------ */

const mobileFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  },
}

function HowWeWorkMobile() {
  return (
    <section
      id="how-we-work"
      className="py-24 px-6"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
      aria-label="How We Work — 3-step process"
    >
      <div className="max-w-content mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={mobileFadeUp}
        >
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--text-tertiary)', letterSpacing: 'var(--tracking-ultra-wide)' }}
          >
            Our Process
          </p>
          <h2
            className="font-heading text-3xl md:text-4xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            How We Work
          </h2>
        </motion.div>

        {/* Step cards */}
        <div className="flex flex-col gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.4, 0, 0.2, 1],
                  },
                },
              }}
            >
              <div
                className="p-8 rounded-2xl border"
                style={{
                  backgroundColor: step.tint,
                  borderColor: 'var(--border)',
                }}
              >
                <span
                  className="block font-mono text-5xl font-bold mb-4 gradient-text select-none"
                  style={{ lineHeight: 1 }}
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                <h3
                  className="font-heading text-xl font-semibold mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {step.title}
                </h3>

                <p
                  className="text-base leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {step.description}
                </p>
              </div>

              {/* Vertical connector between cards */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-2" aria-hidden="true">
                  <div
                    className="w-px h-6"
                    style={{
                      background: `linear-gradient(180deg, ${step.accent}, transparent)`,
                      opacity: 0.4,
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Static fallback (reduced motion)                                   */
/* ------------------------------------------------------------------ */

function HowWeWorkStatic() {
  return (
    <section
      id="how-we-work"
      className="py-24 px-6"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
      aria-label="How We Work — 3-step process"
    >
      <div className="max-w-content mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--text-tertiary)', letterSpacing: 'var(--tracking-ultra-wide)' }}
          >
            Our Process
          </p>
          <h2
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            How We Work
          </h2>
        </div>

        {/* All 3 steps visible */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-8 rounded-2xl border"
              style={{
                backgroundColor: step.tint,
                borderColor: 'var(--border)',
              }}
            >
              <span
                className="block font-mono text-5xl md:text-6xl font-bold mb-5 gradient-text select-none"
                style={{ lineHeight: 1 }}
                aria-hidden="true"
              >
                {step.number}
              </span>

              <h3
                className="font-heading text-xl font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {step.title}
              </h3>

              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Main exported component                                            */
/* ------------------------------------------------------------------ */

export function HowWeWork() {
  const { prefersReducedMotion } = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const mql = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mql.matches)

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  // SSR / pre-hydration: render the static version to avoid layout shift
  if (!mounted) {
    return <HowWeWorkStatic />
  }

  // Reduced motion: show all steps with no animation
  if (prefersReducedMotion) {
    return <HowWeWorkStatic />
  }

  // Desktop gets the scroll-pinned GSAP animation
  if (isDesktop) {
    return <HowWeWorkDesktop />
  }

  // Mobile gets stacked cards with Framer Motion fade-up
  return <HowWeWorkMobile />
}
