'use client'

import dynamic from 'next/dynamic'

// Lazy-load heavy WebGL background shader — not in critical rendering path
const BackgroundShader = dynamic(
  () => import('@/components/ui/BackgroundShader').then(m => ({ default: m.BackgroundShader })),
  { ssr: false }
)

/**
 * Client-side wrapper for BackgroundShader to allow ssr: false dynamic import.
 * This wrapper is needed because layout.tsx is a Server Component.
 */
export function BackgroundShaderWrapper() {
  return <BackgroundShader />
}
