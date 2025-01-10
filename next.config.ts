import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    ppr: true,
    // serverActions: { allowedOrigins: [ "localhost:3000", "https://bug-free-invention-pj4qg57wvqh7p77-3000.app.github.dev/", ]}
  },
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
      {
        hostname: 'github.com',
      },
    ],
  },
};

export default nextConfig;
