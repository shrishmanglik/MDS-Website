import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms and conditions governing the use of the ${SITE.name} website and services.`,
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service | Million Dollar AI Studio',
    description: 'Terms and conditions governing the use of our website and services.',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service | Million Dollar AI Studio',
    description: 'Terms and conditions for Million Dollar AI Studio.',
  },
}

export default function TermsOfServicePage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-primary gradient-text">Terms of Service</span>
        </h1>
        <p className="text-text-tertiary text-sm mb-12">Last updated: February 2026</p>

        <div className="space-y-10">
          {/* Introduction */}
          <section>
            <p className="text-text-secondary leading-relaxed">
              Welcome to {SITE.name}. By accessing or using our website at{' '}
              <a
                href={SITE.url}
                className="text-accent-mid hover:underline"
              >
                {SITE.domain}
              </a>{' '}
              (the &quot;Site&quot;), you agree to be bound by these Terms of Service
              (&quot;Terms&quot;). If you do not agree to these Terms, please do not use the Site.
            </p>
          </section>

          {/* Use of the Website */}
          <section>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">
              <span className="bg-gradient-primary gradient-text">Use of the Website</span>
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              You may use this Site for lawful purposes only. By using the Site, you agree that you
              will not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary leading-relaxed">
              <li>Use the Site in any way that violates applicable laws or regulations</li>
              <li>
                Attempt to gain unauthorized access to any part of the Site, its servers, or any
                connected systems
              </li>
              <li>
                Reproduce, distribute, or exploit any content from the Site without our prior
                written consent
              </li>
              <li>Use the Site to transmit harmful, fraudulent, or deceptive content</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mt-4">
              We reserve the right to restrict or terminate your access to the Site at our discretion
              if we believe you are in violation of these Terms.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">
              <span className="bg-gradient-primary gradient-text">Intellectual Property</span>
            </h2>
            <p className="text-text-secondary leading-relaxed">
              All content on this Site &mdash; including but not limited to text, graphics, logos,
              images, software, tools, brand elements, and the overall design &mdash; is the
              property of {SITE.name} or its licensors and is protected by applicable intellectual
              property laws. You may not copy, modify, distribute, sell, or lease any part of our
              content or tools, nor may you reverse-engineer or attempt to extract the source code
              of any software, unless expressly permitted by law or with our written consent.
            </p>
          </section>

          {/* Services & Consulting */}
          <section>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">
              <span className="bg-gradient-primary gradient-text">Services &amp; Consulting</span>
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {SITE.name} provides AI consulting, systems architecture, and related services. Any
              consulting engagements are governed by separate agreements between {SITE.name} and the
              client. Information presented on this Site, including descriptions of services,
              deliverables, and outcomes, is provided for general informational purposes and does not
              constitute a binding offer or guarantee of specific results.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">
              <span className="bg-gradient-primary gradient-text">Limitation of Liability</span>
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              To the fullest extent permitted by law, {SITE.name}, its founder, employees, and
              affiliates shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages arising out of or related to your use of the Site or our services.
              This includes, without limitation, damages for loss of profits, data, goodwill, or
              other intangible losses.
            </p>
            <p className="text-text-secondary leading-relaxed">
              The Site and its content are provided on an &quot;as is&quot; and &quot;as
              available&quot; basis without warranties of any kind, either express or implied. We do
              not warrant that the Site will be uninterrupted, error-free, or free of harmful
              components.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">
              <span className="bg-gradient-primary gradient-text">Third-Party Links</span>
            </h2>
            <p className="text-text-secondary leading-relaxed">
              The Site may contain links to third-party websites or services that are not owned or
              controlled by {SITE.name}. We have no control over, and assume no responsibility for,
              the content, privacy policies, or practices of any third-party sites. Accessing
              third-party links is at your own risk.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">
              <span className="bg-gradient-primary gradient-text">Governing Law</span>
            </h2>
            <p className="text-text-secondary leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the
              United States. Any disputes arising under or in connection with these Terms shall be
              subject to the exclusive jurisdiction of the courts in the applicable state or federal
              jurisdiction.
            </p>
          </section>

          {/* Changes to These Terms */}
          <section>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">
              <span className="bg-gradient-primary gradient-text">Changes to These Terms</span>
            </h2>
            <p className="text-text-secondary leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be effective
              immediately upon posting to this page. Your continued use of the Site after any
              modifications constitutes your acceptance of the revised Terms. We encourage you to
              review this page periodically.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-bg-secondary border border-border-custom rounded-2xl p-6">
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">
              <span className="bg-gradient-primary gradient-text">Contact Us</span>
            </h2>
            <p className="text-text-secondary leading-relaxed">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="mt-4 space-y-1 text-text-secondary">
              <p className="text-text-primary font-medium">{SITE.name}</p>
              <p>
                Email:{' '}
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-accent-mid hover:underline"
                >
                  {SITE.email}
                </a>
              </p>
              <p>
                Website:{' '}
                <a
                  href={SITE.url}
                  className="text-accent-mid hover:underline"
                >
                  {SITE.domain}
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
