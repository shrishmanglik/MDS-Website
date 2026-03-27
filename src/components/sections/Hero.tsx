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
              AI Systems Company — Toronto, Canada
            </span>
          </motion.div>
        </div>

        {/* Headline — fast parallax layer (1.5x) */}
        <div ref={headlineLayerRef} className="will-change-transform">
          <div className="mb-6">
            <SplitText
              as="h1"
              preset="blur-in"
              className="text-text-primary !text-[clamp(2rem,5vw,4.5rem)] !leading-[1.1]"
              triggerOnScroll={false}
              delay={0.3}
            >
              AI Systems That Cost
            </SplitText>
            <SplitText
              as="span"
              preset="blur-in"
              className="gradient-text !text-[clamp(2.5rem,6vw,5.5rem)] font-heading font-bold block mt-1"
              triggerOnScroll={false}
              delay={0.6}
            >
              $0.00 to Run.
            </SplitText>
          </div>
        </div>

        {/* Subtitle/description — medium parallax layer (1.2x) */}
        <div ref={subtitleLayerRef} className="will-change-transform">
          <motion.p
            className="text-text-secondary text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            variants={fadeUp}
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

        {/* Tech trust bar — terminal-style, anchored, no parallax */}
        <motion.div
          className="mt-12 md:mt-20 max-w-lg mx-auto overflow-hidden"
          variants={fadeUp}
        >
          <TerminalText
            lines={[
              { text: 'mds --status', type: 'command' },
              { text: '3 products live · 100K+ lines of content · $0.00 per interaction', type: 'output', delay: 200 },
              { text: 'mds --margin', type: 'command', delay: 400 },
              { text: '✓ 99%+ gross margin · deterministic-first · 100% yours', type: 'highlight', delay: 200 },
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
