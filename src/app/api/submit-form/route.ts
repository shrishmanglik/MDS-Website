import { NextRequest, NextResponse } from 'next/server'

const WEB3FORMS_URL = 'https://api.web3forms.com/submit'
const WEB3FORMS_KEY = process.env.WEB3FORMS_ACCESS_KEY || ''

// Simple in-memory rate limit (per IP, resets on cold start)
const submissions = new Map<string, number>()
const RATE_LIMIT_MS = 10_000 // 10 seconds between submissions per IP

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const lastSubmission = submissions.get(ip) || 0
  if (Date.now() - lastSubmission < RATE_LIMIT_MS) {
    return NextResponse.json(
      { success: false, message: 'Please wait before submitting again.' },
      { status: 429 }
    )
  }

  try {
    const body = await request.json()

    // Honeypot check — if the hidden field has a value, it's a bot
    if (body._honeypot) {
      // Silently accept to not tip off bots
      return NextResponse.json({ success: true, message: 'Form submitted.' })
    }

    // Remove honeypot field before forwarding
    const { _honeypot: _, ...formData } = body

    // Validate required fields
    if (!formData.form_name) {
      return NextResponse.json(
        { success: false, message: 'Missing form name.' },
        { status: 400 }
      )
    }

    if (!WEB3FORMS_KEY) {
      console.error('WEB3FORMS_ACCESS_KEY not configured')
      return NextResponse.json(
        { success: false, message: 'Server configuration error.' },
        { status: 500 }
      )
    }

    // Forward to Web3Forms with server-side key
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
    } else {
      return NextResponse.json(
        { success: false, message: data.message || 'Submission failed.' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    )
  }
}
