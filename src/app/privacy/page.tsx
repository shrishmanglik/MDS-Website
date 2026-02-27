import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Learn how ${SITE.name} collects, uses, and protects your personal information.`,
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy | Million Dollar AI Studio',
    description: 'Learn how Million Dollar AI Studio collects, uses, and protects your personal information.',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Million Dollar AI Studio',
    description: 'Learn how we protect your personal information.',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-primary gradient-text">Privacy Policy</span>
        </h1>
        <p className="text-text-tertiary text-sm mb-12">Last updated: February 2026</p>

        <div className="space-y-10">
          {/* Introduction */}
          <section>
            <p className="text-text-secondary leading-relaxed">
              {SITE.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy
              and is committed to protecting the personal information you share with us. This Privacy
              Policy explains what data we collect, how we use it, and your rights regarding that
              data when you use our website at{' '}
              <a
                href={SITE.url}
                className="text-accent-purple hover:underline"
              >
                {SITE.domain}
              </a>.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">
              <span className="bg-gradient-primary gradient-text">Information We Collect</span>
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We collect personal information that you voluntarily provide to us through forms on our
              website, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary leading-relaxed">
              <li>Your name</li>
              <li>Email address</li>
              <li>Company name and details</li>
              <li>Any additional information you include in form submissions or messages</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mt-4">
              We do not collect sensitive personal data such as payment information, social security
              numbers, or health data through our website.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">
              <span className="bg-gradient-primary gradient-text">How We Use Your Information</span>
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              The information you provide is used solely for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary leading-relaxed">
              <li>To deliver AI audit reports and consulting deliverables you have requested</li>
              <li>To communicate with you about our services, including follow-ups and project updates</li>
              <li>To respond to your inquiries and support requests</li>
              <li>To improve our website and service offerings</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">
              <span className="bg-gradient-primary gradient-text">Data Sharing</span>
            </h2>
            <p className="text-text-secondary leading-relaxed">
              We do not sell, rent, or share your personal information with third parties for their
              marketing purposes. Your data may only be shared with service providers who assist us
              in operating our website and delivering our services (such as email delivery
              platforms), and only to the extent necessary to perform those functions. These
              providers are obligated to keep your information confidential.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">
              <span className="bg-gradient-primary gradient-text">Data Retention</span>
            </h2>
            <p className="text-text-secondary leading-relaxed">
              We retain your personal information only for as long as reasonably necessary to fulfill
              the purposes for which it was collected, including to satisfy business, legal, or
              reporting requirements. When your data is no longer needed, we will securely delete or
              anonymize it.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">
              <span className="bg-gradient-primary gradient-text">Your Rights</span>
            </h2>
            <p className="text-text-secondary leading-relaxed">
              You have the right to request access to, correction of, or deletion of your personal
              information at any time. To make such a request, please contact us at{' '}
              <a
                href={`mailto:${SITE.email}`}
                className="text-accent-purple hover:underline"
              >
                {SITE.email}
              </a>. We will respond to your request within a reasonable timeframe.
            </p>
          </section>

          {/* Cookies & Analytics */}
          <section>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">
              <span className="bg-gradient-primary gradient-text">Cookies &amp; Analytics</span>
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Our website may use cookies and similar technologies to improve your browsing
              experience and to collect aggregated usage data. This data helps us understand how
              visitors interact with our site so we can improve it. No personally identifiable
              information is collected through cookies without your consent.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">
              <span className="bg-gradient-primary gradient-text">Changes to This Policy</span>
            </h2>
            <p className="text-text-secondary leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this
              page with an updated revision date. We encourage you to review this policy
              periodically.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-bg-secondary border border-border-custom rounded-2xl p-6">
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">
              <span className="bg-gradient-primary gradient-text">Contact Us</span>
            </h2>
            <p className="text-text-secondary leading-relaxed">
              If you have any questions about this Privacy Policy or wish to exercise your data
              rights, please contact us:
            </p>
            <div className="mt-4 space-y-1 text-text-secondary">
              <p className="text-text-primary font-medium">{SITE.name}</p>
              <p>
                Email:{' '}
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-accent-purple hover:underline"
                >
                  {SITE.email}
                </a>
              </p>
              <p>
                Website:{' '}
                <a
                  href={SITE.url}
                  className="text-accent-purple hover:underline"
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
