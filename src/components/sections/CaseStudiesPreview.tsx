"use client"

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, DollarSign, Box, Cog } from 'lucide-react'
import Link from 'next/link'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'
import { SplitText } from '@/components/ui/SplitText'
import { useGSAP } from '@/hooks/useGSAP'

const capabilities = [
  {
    icon: DollarSign,
    tag: 'Financial Services',
    stat: '<$0.01',
    statLabel: 'per interaction',
    title: 'AI-Powered Financial Analysis Without the AI Costs',
    description:
      'Our deterministic-first approach means XBRL parsing and calculations handle the heavy lifting. AI only interprets what computation can\'t — keeping costs near zero.',
    href: '/technology',
    gradient: 'from-[#2962FF] to-[#7C3AED]',
    color: 'text-accent-blue',
    bgAccent: 'bg-accent-blue/10',
  },
  {
    icon: Box,
    tag: 'AI Products',
    stat: '4',
    statLabel: 'products in development',
    title: 'From Concept to Production SaaS',
    description:
      'Astrology, chemistry education, fashion supply chain, financial analysis — each built with the same deterministic-first architecture that keeps operating costs under $200/month.',
    href: '/products',
    gradient: 'from-[#10b981] to-[#2962FF]',
    color: 'text-emerald-400',
    bgAccent: 'bg-emerald-500/10',
  },
  {
    icon: Cog,
    tag: 'Custom Systems',
    stat: '95%',
    statLabel: 'deterministic computation',
    title: 'Enterprise AI That Doesn\'t Break the Bank',
    description:
      'Custom systems with full code ownership, built on the MIDAS framework. 95% of processing is deterministic — you only pay for AI when it\'s actually needed.',
    href: '/services',
    gradient: 'from-[#7C3AED] to-[#D4AF37]',
    color: 'text-accent-purple',
    bgAccent: 'bg-accent-purple/10',
  },
]

export function CaseStudiesPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  // Horizontal scroll on desktop via GSAP ScrollTrigger
  useGSAP((gsap, ScrollTrigger) => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return
    if (!sectionRef.current || !cardsContainerRef.current) return

    const container = cardsContainerRef.current
    const parentWidth = sectionRef.current.offsetWidth
    const scrollDistance = container.scrollWidth - parentWidth

    if (scrollDistance <= 0) return

    gsap.to(container, {
      x: -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === sectionRef.current) t.kill()
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-bg-tint-teal ambient-orb ambient-orb--teal"
    >
      {/* ===== Desktop: Horizontal Scroll Gallery ===== */}
      <div className="hidden md:flex flex-col h-screen">
        {/* Section header */}
        <div className="pt-20 pb-6 px-12 lg:px-20">
          <SplitText
            as="h2"
            preset="cascade"
            className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-3"
          >
            What we build.
          </SplitText>
          <p className="text-text-secondary text-lg max-w-2xl">
            Architecture patterns and outcomes from MDS-built systems.
          </p>
        </div>

        {/* Horizontal track */}
        <div className="flex-1 overflow-hidden">
          <div
            ref={cardsContainerRef}
            className="flex items-stretch gap-8 h-full px-12 lg:px-20 pb-16"
          >
            {capabilities.map((cap) => {
              const Icon = cap.icon
              return (
                <Link
                  key={cap.title}
                  href={cap.href}
                  className="group block w-[55vw] max-w-2xl shrink-0"
                >
                  <div className="h-full bg-bg-secondary border border-border-custom rounded-2xl p-8 lg:p-10 hover:border-accent-purple/30 transition-all duration-300 flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-10 h-10 rounded-xl ${cap.bgAccent} flex items-center justify-center`}>
                        <Icon size={20} className={cap.color} />
                      </div>
                      <span className="text-xs font-medium text-accent-purple bg-accent-purple/10 px-3 py-1 rounded-full uppercase tracking-wider">
                        {cap.tag}
                      </span>
                    </div>

                    <div className="mb-6">
                      <span className={`font-heading text-5xl lg:text-6xl font-bold bg-gradient-to-r ${cap.gradient} bg-clip-text text-transparent`}>
                        {cap.stat}
                      </span>
                      <p className="text-text-tertiary text-sm mt-2">{cap.statLabel}</p>
                    </div>

                    <h3 className="font-heading text-xl lg:text-2xl font-semibold text-text-primary group-hover:text-white transition-colors mb-3">
                      {cap.title}
                    </h3>
                    <p className="text-text-secondary text-base leading-relaxed flex-1">
                      {cap.description}
                    </p>

                    <div className="mt-6 pt-6 border-t border-border-custom flex items-center gap-2 text-accent-blue group-hover:gap-3 transition-all">
                      <span className="text-sm font-medium">Explore</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              )
            })}

            {/* CTA end card */}
            <div className="shrink-0 w-[35vw] max-w-sm flex items-center justify-center">
              <div className="text-center px-8">
                <p className="text-text-tertiary text-sm uppercase tracking-wider mb-4 font-mono">
                  Deterministic-first architecture
                </p>
                <Link
                  href="/technology"
                  className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-purple transition-colors font-heading font-semibold text-xl group"
                >
                  See our approach
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-text-tertiary text-sm mt-3 max-w-xs mx-auto">
                  AI only where it matters. You own the code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Mobile: Vertical Grid ===== */}
      <div className="md:hidden py-24 px-6">
        <motion.div
          className="max-w-content mx-auto relative z-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="text-center mb-16">
            <SplitText
              as="h2"
              preset="cascade"
              className="font-heading text-3xl font-bold text-text-primary mb-4"
            >
              What we build.
            </SplitText>
            <motion.p
              className="text-text-secondary text-lg max-w-2xl mx-auto"
              variants={fadeUpVariant}
            >
              Architecture patterns and outcomes from MDS-built systems.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {capabilities.map((cap) => (
              <motion.div key={cap.title} variants={fadeUpVariant}>
                <Link
                  href={cap.href}
                  className="block group bg-bg-secondary border border-border-custom rounded-2xl p-6 hover:border-accent-purple/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-medium text-accent-purple bg-accent-purple/10 px-2 py-0.5 rounded-full">
                      {cap.tag}
                    </span>
                  </div>
                  <div className="mb-4">
                    <span className="font-heading text-4xl font-bold text-text-primary">
                      {cap.stat}
                    </span>
                    <p className="text-text-tertiary text-xs mt-1">{cap.statLabel}</p>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-text-primary group-hover:text-white transition-colors mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {cap.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-12" variants={fadeUpVariant}>
            <Link
              href="/technology"
              className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-purple transition-colors font-medium"
            >
              See our approach
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <p className="text-text-tertiary text-xs mt-2">
              Deterministic-first architecture. AI only where it matters.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
