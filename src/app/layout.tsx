import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'
import { SITE, SOCIAL } from '@/lib/constants'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BackToTop } from '@/components/ui/BackToTop'
import { MotionProvider } from '@/components/ui/MotionProvider'
import { CursorGlow } from '@/components/ui/CursorGlow'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { GrainOverlay } from '@/components/ui/GrainOverlay'
import { SmoothScroll } from '@/components/ui/SmoothScroll'
import { ExitIntentModal } from '@/components/ui/ExitIntentModal'
import './globals.css'

const satoshi = localFont({
  src: [
    { path: '../../public/fonts/Satoshi-Variable.woff2', style: 'normal' },
    { path: '../../public/fonts/Satoshi-VariableItalic.woff2', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-satoshi',
})

const generalSans = localFont({
  src: [
    { path: '../../public/fonts/GeneralSans-Variable.woff2', style: 'normal' },
    { path: '../../public/fonts/GeneralSans-VariableItalic.woff2', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-general-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
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
  authors: [{ name: SITE.founder }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Production AI Systems`,
    description:
      'AI systems you actually own. Production AI with full code ownership — not prototypes, not demos.',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: SITE.name },
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
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  description:
    'Production AI systems for businesses. We design, build, and deploy AI that runs your business.',
  founder: {
    '@type': 'Person',
    name: SITE.founder,
    jobTitle: 'Founder',
  },
  sameAs: [
    SOCIAL.twitter.url,
    SOCIAL.linkedin.url,
    SOCIAL.github.url,
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: SITE.email,
    contactType: 'customer service',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-[#050508] ${satoshi.variable} ${generalSans.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body antialiased bg-bg-primary text-text-secondary cursor-glow">
        <MotionProvider>
          <SmoothScroll />
          <GrainOverlay />
          <CursorGlow />
          <CustomCursor />
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
