'use client'

import { BackgroundShader } from '@/components/ui/BackgroundShader'

/**
 * Client-side wrapper for BackgroundShader.
 * BackgroundShader is now CSS-only (no WebGL), so no dynamic import needed.
 */
export function BackgroundShaderWrapper() {
  return <BackgroundShader />
}
