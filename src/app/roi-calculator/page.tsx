import type { Metadata } from 'next'
import { ROICalculatorContent } from './ROICalculatorContent'

export const metadata: Metadata = {
  title: 'AI ROI Calculator — See How Much You Could Save',
  description:
    'Calculate the potential return on investment from AI automation. Enter your current process costs and see projected annual savings, payback period, and 3-year ROI.',
  alternates: { canonical: '/roi-calculator' },
  openGraph: {
    title: 'AI ROI Calculator — See How Much You Could Save',
    description: 'Calculate the potential return on investment from AI automation.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI ROI Calculator',
    description: 'Calculate your potential ROI from AI automation.',
  },
}

export default function ROICalculatorPage() {
  return <ROICalculatorContent />
}
