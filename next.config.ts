import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  async redirects() {
    return [
      { source: '/technology', destination: '/how-we-build', permanent: true },
      { source: '/build', destination: '/for-businesses', permanent: true },
      { source: '/pricing', destination: '/for-businesses', permanent: true },
      // F-008: /services is orphaned; /for-businesses is the audience-split canonical
      { source: '/services', destination: '/for-businesses', permanent: true },
      // F-010: collapse /free-audit into /free-assessment (single canonical assessment funnel)
      { source: '/free-audit', destination: '/free-assessment', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy-Report-Only',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self'",
              "connect-src 'self' https://api.web3forms.com",
              "frame-src 'self' https://calendly.com",
            ].join('; '),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
