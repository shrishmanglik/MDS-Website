import { NextRequest, NextResponse } from 'next/server'

const WEB3FORMS_URL = 'https://api.web3forms.com/submit'
const WEB3FORMS_KEY = process.env.WEB3FORMS_ACCESS_KEY || ''
const FALLBACK_EMAIL = 'shrishmanglik@milliondollarstudio.ai'

// Simple in-memory rate limit (per IP, resets on cold start)
const submissions = new Map<string, number>()
const RATE_LIMIT_MS = 10_000 // 10 seconds between submissions per IP

// Email format sanity check (not RFC-perfect — just catches obvious garbage)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const lastSubmission = submissions.get(ip) || 0
  if (Date.now() - lastSubmission < RATE_LIMIT_MS) {
    return NextResponse.json(
      { success: false, message: 'Please wait a few seconds before submitting again.' },
      { status: 429 }
    )
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400 }
    )
  }

  // Honeypot check — if the hidden field has a value, it's a bot
  if (body._honeypot) {
    // Silently accept to not tip off bots
    return NextResponse.json({ success: true, message: 'Form submitted.' })
  }

  // Remove honeypot field before validation / forwarding
  const { _honeypot: _, ...formData } = body as Record<string, unknown>

  // Validate required fields
  if (typeof formData.form_name !== 'string' || !formData.form_name.trim()) {
    return NextResponse.json(
      { success: false, message: 'Missing form name.' },
      { status: 400 }
    )
  }
  if (typeof formData.email !== 'string' || !EMAIL_RE.test(formData.email.trim())) {
    return NextResponse.json(
      { success: false, message: 'Please enter a valid email address.' },
      { status: 400 }
    )
  }
  if (typeof formData.message === 'string' && formData.message.trim().length > 0 && formData.message.trim().length < 10) {
    return NextResponse.json(
      { success: false, message: 'Please write a message with at least 10 characters.' },
      { status: 400 }
    )
  }
  // Cap message size to prevent abuse (Web3Forms has its own limits too)
  if (typeof formData.message === 'string' && formData.message.length > 10_000) {
    return NextResponse.json(
      { success: false, message: 'Message is too long (max 10,000 characters).' },
      { status: 400 }
    )
  }

  // Graceful fallback: if the server isn't configured with a Web3Forms key,
  // return a clear actionable error that tells the user to email directly.
  // This is better than a 500 — the user can still reach us.
  if (!WEB3FORMS_KEY) {
    console.error('WEB3FORMS_ACCESS_KEY not configured — form cannot be delivered')
    return NextResponse.json(
      {
        success: false,
        message: `Our form service is temporarily unavailable. Please email ${FALLBACK_EMAIL} directly — we respond within 24 hours.`,
        fallback_email: FALLBACK_EMAIL,
      },
      { status: 503 }
    )
  }

  try {
    const res = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        ...formData,
      }),
    })

    const data = await res.json()

    // Record successful submission for rate limiting
    submissions.set(ip, Date.now())

    if (data.success) {
      return NextResponse.json({ success: true, message: 'Form submitted successfully.' })
    }
    return NextResponse.json(
      {
        success: false,
        message: `${data.message || 'Submission failed.'} You can also email us at ${FALLBACK_EMAIL}.`,
        fallback_email: FALLBACK_EMAIL,
      },
      { status: 400 }
    )
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      {
        success: false,
        message: `Something went wrong submitting the form. Please email ${FALLBACK_EMAIL} directly.`,
        fallback_email: FALLBACK_EMAIL,
      },
      { status: 500 }
    )
  }
}
