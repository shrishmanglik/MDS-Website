import type { Metadata } from 'next'
import { Inter, Sora, JetBrains_Mono } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BackToTop } from '@/components/ui/BackToTop'
import { MotionProvider } from '@/components/ui/MotionProvider'
import { CursorGlow } from '@/components/ui/CursorGlow'
import { NeuralCursor } from '@/components/ui/NeuralCursor'
import { GrainOverlay } from '@/components/ui/GrainOverlay'
import { SmoothScroll } from '@/components/ui/SmoothScroll'
import { ExitIntentModal } from '@/components/ui/ExitIntentModal'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
})

const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-sora',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://milliondollarstudio.ai'),
  title: {
    default: 'Million Dollar AI Studio | Production AI Systems',
    template: '%s | Million Dollar AI Studio',
  },
  description:
    'AI systems you actually own. We design, build, and deploy production AI with full code ownership — not prototypes, not demos.',
  keywords: [
    'AI product development',
    'AI studio',
    'custom AI systems',
    'AI automation',
    'AI agents',
    'production AI',
    'deterministic AI',
    'MIDAS framework',
  ],
  authors: [{ name: 'Shrish Manglik' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://milliondollarstudio.ai',
    siteName: 'Million Dollar AI Studio',
    title: 'Million Dollar AI Studio | Production AI Systems',
    description:
      'AI systems you actually own. Production AI with full code ownership — not prototypes, not demos.',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'Million Dollar AI Studio' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@MDAI_Studio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Million Dollar AI Studio',
  url: 'https://milliondollarstudio.ai',
  logo: 'https://milliondollarstudio.ai/logo.png',
  description:
    'Production AI systems for businesses. We design, build, and deploy AI that runs your business.',
  founder: {
    '@type': 'Person',
    name: 'Shrish Manglik',
    jobTitle: 'Founder',
  },
  sameAs: [
    'https://x.com/MDAI_Studio',
    'https://www.linkedin.com/company/milliondollaraistudio/',
    'https://github.com/milliondollaraistudio',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'shrishmanglik@milliondollarstudio.ai',
    contactType: 'customer service',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-[#0A0A0F] ${inter.variable} ${sora.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body antialiased bg-bg-primary text-text-secondary cursor-glow">
        <MotionProvider>
          <SmoothScroll />
          <GrainOverlay />
          <CursorGlow />
          <NeuralCursor />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-bg-secondary focus:text-text-primary focus:px-4 focus:py-2 focus:rounded-lg focus:border focus:border-border-custom"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <BackToTop />
          <ExitIntentModal />
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
