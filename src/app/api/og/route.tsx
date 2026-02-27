import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title') || 'Million Dollar AI Studio'
  const subtitle = searchParams.get('subtitle') || 'AI systems you actually own.'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 80px',
          background: 'linear-gradient(135deg, #0A0A0F 0%, #12121A 50%, #1A1A25 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Accent gradient bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #2962FF, #7C3AED, #D4AF37)',
          }}
        />
        {/* Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #2962FF, #7C3AED)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 700,
            }}
          >
            M
          </div>
          <span style={{ color: '#B8B8C8', fontSize: '20px', fontWeight: 500 }}>
            Million Dollar AI Studio
          </span>
        </div>
        {/* Title */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: 700,
            color: '#F5F0E8',
            lineHeight: 1.2,
            marginBottom: '20px',
            maxWidth: '900px',
          }}
        >
          {title}
        </div>
        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: '#B8B8C8',
            lineHeight: 1.5,
            maxWidth: '700px',
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
