import type { Metadata } from 'next'
import { Mail, Calendar, ArrowRight, Shield, Clock, Lock } from 'lucide-react'
import { SITE } from '@/lib/constants'
import { ContactForm } from '@/components/ui/ContactForm'
import { webPageJsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Get in touch with Million Dollar AI Studio. We respond within 24 hours. For custom AI builds, project scoping, or general questions.",
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Million Dollar AI Studio',
    description:
      'Get in touch. Custom AI builds, project scoping, or general questions. We respond within 24 hours.',
    images: [{ url: '/api/og?title=Contact&subtitle=Let%27s+build+something.', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Million Dollar AI Studio',
    description: "Let's build something.",
  },
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd({
            name: 'Contact Million Dollar AI Studio',
            description: "Get in touch. Custom AI builds, project scoping, or general questions. We respond within 24 hours.",
            path: '/contact',
          })),
        }}
      />
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
              {/* Email — always visible, primary when Calendly isn't set */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Mail size={20} className="text-accent-blue shrink-0" aria-hidden="true" />
                  <span className="text-text-secondary">Email us directly</span>
                </div>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-1.5 text-accent-blue hover:text-accent-purple transition-colors font-medium ml-8 break-all"
                >
                  {SITE.email}
                </a>
              </div>

              {/* Calendly — only rendered when a URL is set. When null, the
                  email option above serves as the primary channel. */}
              {SITE.calendlyUrl && (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar size={20} className="text-accent-blue shrink-0" aria-hidden="true" />
                    <span className="text-text-secondary">Or book a call directly</span>
                  </div>
                  <a
                    href={SITE.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-accent-blue hover:text-accent-purple transition-colors font-medium ml-8"
                  >
                    Book a Call <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>

            <p className="text-text-tertiary text-sm mt-8">
              We respond within 24 hours. Usually faster.
            </p>
          </div>

          {/* Right side — form */}
          <div>
            <div className="bg-bg-secondary border border-border-custom rounded-2xl p-8">
              <ContactForm />
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-text-tertiary text-xs">
                <Lock size={14} className="text-accent-blue" aria-hidden="true" />
                <span>Your data stays private</span>
              </div>
              <div className="flex items-center gap-2 text-text-tertiary text-xs">
                <Clock size={14} className="text-accent-blue" aria-hidden="true" />
                <span>Response within 24 hrs</span>
              </div>
              <div className="flex items-center gap-2 text-text-tertiary text-xs">
                <Shield size={14} className="text-accent-blue" aria-hidden="true" />
                <span>No spam, ever</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
