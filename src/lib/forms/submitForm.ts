interface SubmitFormPayload {
  form_name: string
  subject: string
  [key: string]: string | undefined
}

interface SubmitFormResult {
  success: boolean
  message: string
}

export async function submitForm(payload: SubmitFormPayload): Promise<SubmitFormResult> {
  try {
    const res = await fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) {
      return {
        success: false,
        message: data.message || 'Something went wrong. Please try again.',
      }
    }

    return {
      success: data.success,
      message: data.message || 'Form submitted successfully.',
    }
  } catch {
    return {
      success: false,
      message: 'Network error. Please try again or email shrish@milliondollarstudio.ai directly.',
    }
  }
}
