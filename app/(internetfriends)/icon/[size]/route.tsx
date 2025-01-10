import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ size: string }> }) {
  const size = parseInt((await params).size, 10)

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(90deg, #FF7E29 0%, #FF486C 100%)',
          borderRadius: '8px',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: `${size / 2}px`,
          fontWeight: 'bolder',
          color: 'white',
        }}
      >
        @
      </div>
    ),
    {
      width: size,
      height: size,
    }
  )
}