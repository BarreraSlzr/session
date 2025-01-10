import { ImageResponse } from 'next/og'

export async function GET() {
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
          fontSize: '16px',
          fontWeight: 'bolder',
          color: 'white',
        }}
      >
        @
      </div>
    ),
    {
      width: 32,
      height: 32,
    }
  )
}

