"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body style={{ background: '#0A0A0F', color: '#F5F0E8', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
              Something went wrong
            </h1>
            <p style={{ color: '#B0B0BC', marginBottom: '2rem' }}>{error.message}</p>
            <button
              onClick={reset}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #2962FF, #7C3AED, #D4AF37)',
                color: 'white',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
