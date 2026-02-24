import type { Metadata } from 'next'
import { IntakeForm } from './IntakeForm'

export const metadata: Metadata = {
  title: 'Project Intake — Start Your AI Build',
  description:
    'Submit your project requirements for a custom AI system. Structured intake form with scope, integrations, budget, and deployment preferences.',
  alternates: { canonical: '/intake' },
  openGraph: {
    title: 'Project Intake — Start Your AI Build',
    description:
      'Submit structured project requirements for a custom AI system. Get a fixed-price proposal within 48 hours.',
    url: 'https://milliondollarstudio.ai/intake',
    siteName: 'Million Dollar AI Studio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Intake — Start Your AI Build',
    description: 'Submit your project requirements. Get a proposal within 48 hours.',
  },
}

export default function IntakePage() {
  return <IntakeForm />
}
