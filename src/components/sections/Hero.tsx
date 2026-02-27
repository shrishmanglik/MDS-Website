"use client"

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/Button'

const ParticleNetwork = dynamic(
  () => import('@/components/hero/ParticleNetwork').then(mod => mod.ParticleNetwork),
  { ssr: false }
)

const wordStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
}

const wordReveal = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* 3D Particle Network — lazy loaded, desktop only */}
      <div className="absolute inset-0 hidden md:block">
        <ParticleNetwork />
      </div>

      {/* Gradient mesh fallback (mobile, or when particles disabled via reduced motion) */}
      <div className="absolute inset-0 md:hidden gradient-mesh" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-visible bg-bg-secondary/50 text-text-secondary text-sm font-medium backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
            Production AI Systems
          </span>
        </motion.div>

        {/* Word-by-word headline reveal */}
        <motion.h1
          className="text-text-primary mb-6"
          variants={wordStagger}
        >
          {['AI', 'Systems'].map((word, i) => (
            <motion.span key={i} className="inline-block mr-[0.3em]" variants={wordReveal}>
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span className="gradient-text inline-block" variants={wordReveal}>
            You Actually Own.
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed"
          variants={fadeUp}
        >
          We design, build, and deploy production AI. You get the code, the infrastructure, and the system. No lock-in.
        </motion.p>

        <motion.p
          className="text-text-tertiary text-base md:text-lg max-w-xl mx-auto mb-12"
          variants={fadeUp}
        >
          From $3K prototypes to $200K enterprise builds — you own everything we ship.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeUp}
        >
          <div className="flex flex-col items-center gap-1.5">
            <Button href="/free-audit" variant="cta" size="lg">
              Get Your Free AI Audit
              <ArrowRight size={18} />
            </Button>
            <span className="text-text-tertiary text-xs">
              Free · 5-page report · 48hr delivery
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Button href="/case-studies" variant="secondary" size="lg">
              See How We Build
              <ArrowRight size={18} />
            </Button>
            <span className="text-text-tertiary text-xs">
              Real systems, real results
            </span>
          </div>
        </motion.div>

        {/* Tech trust bar */}
        <motion.div
          className="mt-20 pt-8 border-t border-border-custom"
          variants={fadeUp}
        >
          <p className="text-text-tertiary text-xs uppercase tracking-[0.15em] mb-4">
            Built with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-text-tertiary text-sm font-mono">
            {['Next.js', 'Claude API', 'React', 'Python', 'FastAPI', 'Docker'].map((tech) => (
              <span key={tech} className="hover:text-text-secondary transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} className="text-text-tertiary" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
