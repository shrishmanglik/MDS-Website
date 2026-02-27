"use client"

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/Button'
import { SplitText } from '@/components/ui/SplitText'
import { TerminalText } from '@/components/ui/TerminalText'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { useGSAP } from '@/hooks/useGSAP'

const ParticleNetwork = dynamic(
  () => import('@/components/hero/ParticleNetwork').then(mod => mod.ParticleNetwork),
  { ssr: false }
)

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
  // Refs for the section trigger and each parallax depth layer
  const sectionRef = useRef<HTMLElement>(null)
  const particleLayerRef = useRef<HTMLDivElement>(null)
  const badgeLayerRef = useRef<HTMLDivElement>(null)
  const headlineLayerRef = useRef<HTMLDivElement>(null)
  const subtitleLayerRef = useRef<HTMLDivElement>(null)
  const ctaLayerRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  // Scroll progress for ParticleNetwork (updated by GSAP onUpdate)
  const scrollProgressRef = useRef(0)

  // GSAP scroll-linked parallax — additive on top of existing Framer Motion animations
  // The useGSAP hook already skips execution when reduced motion is preferred
  useGSAP((gsap, ScrollTrigger) => {
    // Only activate parallax on desktop
    if (typeof window === 'undefined' || window.innerWidth < 768) return

    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress
        },
      },
    })

    // Badge — fastest layer (1.8x), moves up the most
    if (badgeLayerRef.current) {
      tl.to(badgeLayerRef.current, { y: -200, ease: 'none' }, 0)
    }

    // Headline — fast layer (1.5x)
    if (headlineLayerRef.current) {
      tl.to(headlineLayerRef.current, { y: -150, ease: 'none' }, 0)
    }

    // Subtitle/description — medium-fast layer (1.2x)
    if (subtitleLayerRef.current) {
      tl.to(subtitleLayerRef.current, { y: -80, ease: 'none' }, 0)
    }

    // CTA buttons — base layer (1x), slight movement for depth feel
    if (ctaLayerRef.current) {
      tl.to(ctaLayerRef.current, { y: -20, ease: 'none' }, 0)
    }

    // Particle network background — deep layer (0.7x), moves slower
    if (particleLayerRef.current) {
      tl.to(particleLayerRef.current, { y: 80, ease: 'none' }, 0)
    }

    // Scroll indicator — fades out quickly as user begins scrolling
    if (scrollIndicatorRef.current) {
      tl.to(scrollIndicatorRef.current, { opacity: 0, y: -30, ease: 'none' }, 0)
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === sectionRef.current) t.kill()
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* 3D Particle Network — deep parallax layer (0.7x), lazy loaded, desktop only */}
      <div ref={particleLayerRef} className="absolute inset-0 hidden md:block will-change-transform">
        <ParticleNetwork scrollProgress={scrollProgressRef.current} />
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
        {/* Badge — fastest parallax layer (1.8x) */}
        <div ref={badgeLayerRef} className="will-change-transform">
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-visible bg-bg-secondary/50 text-text-secondary text-sm font-medium backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
              Production AI Systems
            </span>
          </motion.div>
        </div>

        {/* Headline — fast parallax layer (1.5x) */}
        <div ref={headlineLayerRef} className="will-change-transform">
          <div className="mb-6">
            <SplitText
              as="h1"
              preset="blur-in"
              className="text-text-primary"
              triggerOnScroll={false}
              delay={0.3}
            >
              AI Systems
            </SplitText>
            <SplitText
              as="span"
              preset="scramble"
              className="gradient-text text-4xl md:text-5xl lg:text-6xl font-heading font-bold inline-block"
              triggerOnScroll={false}
              delay={0.8}
            >
              You Actually Own.
            </SplitText>
          </div>
        </div>

        {/* Subtitle/description — medium parallax layer (1.2x) */}
        <div ref={subtitleLayerRef} className="will-change-transform">
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
        </div>

        {/* CTA buttons — base parallax layer (1x) */}
        <div ref={ctaLayerRef} className="will-change-transform">
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeUp}
          >
            <MagneticButton>
              <div className="flex flex-col items-center gap-1.5">
                <Button href="/free-audit" variant="cta" size="lg">
                  Get Your Free AI Audit
                  <ArrowRight size={18} />
                </Button>
                <span className="text-text-tertiary text-xs">
                  Free · 5-page report · 48hr delivery
                </span>
              </div>
            </MagneticButton>
            <MagneticButton>
              <div className="flex flex-col items-center gap-1.5">
                <Button href="/case-studies" variant="secondary" size="lg">
                  See How We Build
                  <ArrowRight size={18} />
                </Button>
                <span className="text-text-tertiary text-xs">
                  Real systems, real results
                </span>
              </div>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Tech trust bar — terminal-style, anchored, no parallax */}
        <motion.div
          className="mt-20 max-w-lg mx-auto"
          variants={fadeUp}
        >
          <TerminalText
            lines={[
              { text: 'mds --stack', type: 'command' },
              { text: 'Next.js · Claude API · React · Python · FastAPI · Docker', type: 'output', delay: 200 },
              { text: 'mds --status', type: 'command', delay: 400 },
              { text: '✓ All systems production-ready', type: 'highlight', delay: 200 },
            ]}
            speed={20}
            linePause={300}
          />
        </motion.div>

        {/* Scroll indicator — fades out on scroll */}
        <div ref={scrollIndicatorRef} className="will-change-transform">
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
        </div>
      </motion.div>
    </section>
  )
}
