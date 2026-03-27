'use client'

import { useEffect } from 'react'
import Plausible from 'plausible-tracker'

const plausible = Plausible({
  domain: 'milliondollarstudio.ai',
  trackLocalhost: false,
})

export function PlausibleProvider() {
  useEffect(() => {
    plausible.enableAutoPageviews()
    plausible.enableAutoOutboundTracking()
  }, [])

  return null
}

export function trackEvent(eventName: string, props?: Record<string, string>) {
  plausible.trackEvent(eventName, { props })
}
