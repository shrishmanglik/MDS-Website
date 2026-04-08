"use client"

import { useRef, useState, useEffect } from 'react'
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

/** Typewriter counter that reveals "$0.00" character by character */
function TypewriterCost() {
  const full = "$0.00"
  const [displayed, setDisplayed] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    // Start typing after the headline SplitText has had time to animate (≈1.2s)
    const startDelay = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        i++
        setDisplayed(full.slice(0, i))
        if (i >= full.length) {
          clearInterval(interval)
          // Hide cursor after a brief pause
          setTimeout(() => setShowCursor(false), 800)
        }
      }, 120)
      return () => clearInterval(interval)
    }, 1200)
    return () => clearTimeout(startDelay)
  }, [])

  return (
    <span className="relative inline-block">
      {/* Ambient gold glow behind the number */}
      <div className="absolute -inset-x-20 -inset-y-10 bg-accent-gold/5 blur-3xl rounded-full pointer-events-none" />
      <span className="relative gradient-text !text-[clamp(3rem,8vw,6rem)] font-heading font-bold">
        {displayed}
        {showCursor && (
          <span className="inline-block w-[3px] h-[0.75em] bg-accent-gold ml-1 align-baseline animate-pulse" />
        )}
      </span>
    </span>
  )
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

      {/* Floating stats — desktop only */}
      <div className="hidden lg:block">
        {/* Top-right stat */}
        <motion.div
          className="absolute top-[18%] right-[8%] z-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.8 }}
        >
          <div
            className="px-3 py-1.5 rounded-lg border border-border-visible/50 bg-bg-secondary/30 backdrop-blur-md text-xs text-text-secondary"
            style={{ animation: 'float-gentle 6s ease-in-out infinite' }}
          >
            <span className="text-accent-emerald font-semibold">99.8%</span> margin
          </div>
        </motion.div>

        {/* Bottom-left stat */}
        <motion.div
          className="absolute bottom-[22%] left-[6%] z-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 0.8 }}
        >
          <div
            className="px-3 py-1.5 rounded-lg border border-border-visible/50 bg-bg-secondary/30 backdrop-blur-md text-xs text-text-secondary"
            style={{ animation: 'float-gentle 7s ease-in-out infinite 1s' }}
          >
            <span className="text-accent-gold font-semibold">6</span> products
          </div>
        </motion.div>

        {/* Bottom-right stat */}
        <motion.div
          className="absolute bottom-[18%] right-[10%] z-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
        >
          <div
            className="px-3 py-1.5 rounded-lg border border-border-visible/50 bg-bg-secondary/30 backdrop-blur-md text-xs text-text-secondary"
            style={{ animation: 'float-gentle 5s ease-in-out infinite 0.5s' }}
          >
            <span className="text-accent-emerald font-semibold">$0</span>/mo hosting
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Badge — fastest parallax layer (1.8x) */}
        <div ref={badgeLayerRef} className="will-change-transform">
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-visible bg-bg-secondary/50 text-text-secondary text-sm font-medium backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
              AI Systems Company — Toronto, Canada
            </span>
          </motion.div>
        </div>

        {/* Headline — fast parallax layer (1.5x) */}
        <div ref={headlineLayerRef} className="will-change-transform">
          <div className="mb-2">
            {/* Line 1 — subdued intro */}
            <SplitText
              as="h1"
              preset="blur-in"
              className="text-text-secondary !text-[clamp(1.8rem,4.5vw,3.5rem)] !leading-[1.1]"
              triggerOnScroll={false}
              delay={0.3}
            >
              AI Systems That Cost
            </SplitText>
          </div>

          {/* Line 2 — the hero number, dramatically large */}
          <div className="mb-2 relative flex items-center justify-center">
            <TypewriterCost />
            <motion.span
              className="relative gradient-text !text-[clamp(3rem,8vw,6rem)] font-heading font-bold ml-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              to Run.
            </motion.span>
          </div>

          {/* Animated horizontal divider */}
          <motion.div
            className="mx-auto my-6 h-px bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent"
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
            transition={{ delay: 2.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Subtitle/description — medium parallax layer (1.2x) */}
        <div ref={subtitleLayerRef} className="will-change-transform">
          <motion.p
            className="text-text-secondary text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            We use AI to build sophisticated rule engines and computation systems.
            Then they run forever at zero cost. You own everything.
          </motion.p>
        </div>

        {/* CTA buttons — base parallax layer (1x) */}
        <div ref={ctaLayerRef} className="will-change-transform">
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeUp}
          >
            <MagneticButton>
              <Button href="/for-people" variant="cta" size="lg" className="w-full sm:w-auto">
                See Our Products
                <ArrowRight size={18} />
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button href="/for-businesses" variant="secondary" size="lg" className="w-full sm:w-auto">
                Build With Us
                <ArrowRight size={18} />
              </Button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Tech trust bar — terminal-style with shimmer border, anchored, no parallax */}
        <motion.div
          className="mt-12 md:mt-20 max-w-lg mx-auto overflow-hidden shimmer-border"
          variants={fadeUp}
        >
          <TerminalText
            lines={[
              { text: 'mds --status', type: 'command' },
              { text: '6 products built · 100K+ lines of content · $0.00 per interaction', type: 'output', delay: 200 },
              { text: 'mds --margin', type: 'command', delay: 400 },
              { text: '\u2713 99%+ gross margin · deterministic-first · 100% yours', type: 'highlight', delay: 200 },
            ]}
            speed={20}
            linePause={300}
          />
        </motion.div>

        {/* System status indicator */}
        <motion.div
          className="mt-6 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.8 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald/75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald" />
          </span>
          <span className="text-xs text-text-tertiary tracking-wide">All systems operational</span>
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

      {/* Float animation keyframes (injected via style tag for the floating stats) */}
      <style jsx global>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  )
}
