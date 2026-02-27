import { describe, it, expect, vi, beforeEach } from 'vitest'
import { submitForm } from '@/lib/forms/submitForm'

// Mock global fetch
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

beforeEach(() => {
  mockFetch.mockReset()
})

describe('submitForm', () => {
  const payload = {
    form_name: 'contact',
    subject: 'New Contact Submission',
    name: 'Jane Doe',
    email: 'jane@example.com',
  }

  it('sends POST to /api/submit-form with JSON payload', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, message: 'Sent!' }),
    })

    await submitForm(payload)

    expect(mockFetch).toHaveBeenCalledWith('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  })

  it('returns success result on 200 response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, message: 'Sent!' }),
    })

    const result = await submitForm(payload)
    expect(result.success).toBe(true)
    expect(result.message).toBe('Sent!')
  })

  it('returns fallback success message when none provided', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })

    const result = await submitForm(payload)
    expect(result.success).toBe(true)
    expect(result.message).toBe('Form submitted successfully.')
  })

  it('returns failure on non-ok response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'Rate limited' }),
    })

    const result = await submitForm(payload)
    expect(result.success).toBe(false)
    expect(result.message).toBe('Rate limited')
  })

  it('returns fallback error message on non-ok response without message', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({}),
    })

    const result = await submitForm(payload)
    expect(result.success).toBe(false)
    expect(result.message).toBe('Something went wrong. Please try again.')
  })

  it('returns network error on fetch rejection', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network failure'))

    const result = await submitForm(payload)
    expect(result.success).toBe(false)
    expect(result.message).toContain('Network error')
  })
})
