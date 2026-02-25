'use client'

import { motion } from 'framer-motion'
import { Rocket, Code2, Target } from 'lucide-react'
import { SITE, SOCIAL } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { staggerContainer, fadeUpVariant, viewportOnce } from '@/lib/animations'

const values = [
  {
    icon: Rocket,
    title: 'Ship, don\u2019t plan',
    description: 'Products beat presentations every time. We measure progress in deployed systems, not slide decks.',
  },
  {
    icon: Code2,
    title: 'Own the code',
    description: 'Everything we build, you own completely. No lock-in. No recurring licensing. Full transfer on delivery.',
  },
  {
    icon: Target,
    title: 'Accuracy over speed',
    description:
      'Especially in domains like finance and science, being right matters more than being first.',
  },
]

export function AboutContent() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-24"
        >
          <motion.div variants={fadeUpVariant} className="max-w-3xl">
            <h1 className="text-text-primary mb-8">
              I&apos;m Shrish Manglik.
            </h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-6">
              I don&apos;t consult about AI. I build AI systems.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              Every product on this site — the architecture, the code, the deployment — was built
              by me and my AI development infrastructure. Not a team of 50.
              Just the right stack.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              That stack is now available to your business.
            </p>
          </motion.div>
        </motion.section>

        {/* Founder */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
          className="mb-24 text-center"
        >
          <div className="flex flex-col items-center">
            <div className="w-[140px] h-[140px] md:w-[180px] md:h-[180px] rounded-full p-[3px] bg-gradient-hero mb-6">
              <div className="w-full h-full rounded-full bg-bg-primary flex items-center justify-center">
                <span className="font-heading text-4xl md:text-5xl font-bold gradient-text">
                  {SITE.founderInitials}
                </span>
              </div>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-1">
              {SITE.founder}
            </h2>
            <p className="text-accent-primary font-medium mb-6">{SITE.founderTitle}</p>
            <p className="text-text-secondary leading-relaxed max-w-2xl mb-6">
              Systems architect with expertise spanning financial technology, prompt engineering,
              and full-stack AI architecture. Founded MDS to prove that one builder with the
              right stack can outperform teams of ten — and then made that stack available
              to clients.
            </p>
            <a
              href={SOCIAL.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Shrish Manglik on LinkedIn"
              className="inline-flex items-center gap-2 text-text-tertiary hover:text-text-primary transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="text-sm">LinkedIn</span>
            </a>
          </div>
        </motion.section>

        {/* Mission */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
          className="mb-24"
        >
          <blockquote className="text-center">
            <p className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary leading-snug max-w-3xl mx-auto">
              &ldquo;One founder with the right stack can outperform teams of ten.&rdquo;
            </p>
          </blockquote>
        </motion.section>

        {/* Values */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-24"
        >
          <motion.h2 variants={fadeUpVariant} className="text-text-primary text-center mb-12">
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUpVariant}
                className="rounded-2xl border border-border-custom bg-bg-secondary p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center mb-4">
                  <value.icon size={24} className="text-accent-primary" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-text-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Bottom CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
          className="text-center"
        >
          <h2 className="text-text-primary mb-8">
            Let&apos;s build something together.
          </h2>
          <Button href="/contact" variant="cta" size="lg">
            Get in Touch
          </Button>
        </motion.section>
      </div>
    </div>
  )
}
