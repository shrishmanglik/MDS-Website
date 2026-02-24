import type { Metadata } from 'next'
import { AuditForm } from './AuditForm'

export const metadata: Metadata = {
  title: 'Free AI Assessment — Discover Your AI Opportunities',
  description: 'Get a personalized AI assessment identifying 3-5 areas where AI can reduce costs and improve efficiency. Free, no obligation.',
  alternates: { canonical: '/free-audit' },
  openGraph: {
    title: 'Free AI Assessment — Discover Your AI Opportunities',
    description: 'Get a personalized AI assessment identifying areas where AI can reduce costs and improve efficiency.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Assessment',
    description: 'Discover your AI opportunities. Free, no obligation.',
  },
}

export default function FreeAuditPage() {
  return <AuditForm />
}
