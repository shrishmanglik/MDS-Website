import type { Metadata } from 'next'
import { Mail, Calendar, ArrowRight } from 'lucide-react'
import { SITE } from '@/lib/constants'
import { ContactForm } from '@/components/ui/ContactForm'

export const metadata: Metadata = {
  title: 'Get Started | Free AI Audit',
  description:
    'Start with a free AI audit. Discover where AI can reduce costs, accelerate operations, and create competitive advantage in your business.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Get Started | Million Dollar AI Studio',
    description:
      'Start with a free AI audit. Discover where AI can reduce costs and create competitive advantage.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Started | Million Dollar AI Studio',
    description: 'Start with a free AI audit.',
  },
}

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Left side */}
          <div className="pt-4">
            <h1 className="text-text-primary mb-6">
              <span className="gradient-text">Let&apos;s build something.</span>
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Tell us what you need. We&apos;ll figure out the best way to help.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-accent-primary shrink-0" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  {SITE.email}
                </a>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Calendar size={20} className="text-accent-primary shrink-0" />
                  <span className="text-text-secondary">Or book a call directly</span>
                </div>
                <a
                  href="https://calendly.com/milliondollarstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-accent-primary hover:text-accent-secondary transition-colors font-medium ml-8"
                >
                  Book a Call <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <p className="text-text-tertiary text-sm mt-8">
              We respond within 24 hours. Usually faster.
            </p>
          </div>

          {/* Right side — form */}
          <div className="bg-bg-secondary border border-border-custom rounded-2xl p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
