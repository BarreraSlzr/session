import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#6C31BC',
          borderRadius: '50%',
          width: '100%',
          height: '100%',
        }}
      />
    ),
    { ...size }
  )
}

