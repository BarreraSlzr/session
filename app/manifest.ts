import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sofia AI Assistant',
    short_name: 'Sofia AI',
    description: 'AI-powered healthcare assistant by Sofia',
    start_url: '/',
    display: 'standalone',
    background_color: '#FCFAFF',
    theme_color: '#6C31BC',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['healthcare', 'medical', 'ai', 'assistant'],
    orientation: 'portrait',
    lang: 'es',
    dir: 'ltr',
    prefer_related_applications: false,
    related_applications: [],
    scope: '/',
  }
}

