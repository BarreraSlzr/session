import { Suspense } from "react";
import "./globals.css";
import content from '../app/(internetfriends)/content.json'
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from 'sonner';
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/next"
import "../app/(internetfriends)/globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster position="top-center" />
        <TooltipProvider delayDuration={0}>
          <Suspense fallback='Loading'>
            {children}
            <SpeedInsights />
            <Analytics />
            {/* <GoogleAnalytics /> */}
          </Suspense>
        </TooltipProvider>
      </body>
    </html>
  );
}


export const metadata: Metadata = {
  metadataBase: new URL(content.siteConfig.url),
  title: {
    default: `${content.companyName} | ${content.hero.title}`,
    template: `%s | ${content.companyName}`,
  },
  description: `Discover ${content.companyName}: ${content.hero.description}. Located at ${content.companyInfo.address2}. Making ${content.companyInfo.address1}.`,
  keywords: [`${content.companyName}`, 'internet friends', ...content.navigation, ...content.keywords],
  authors: [{ name: content.companyName }],
  creator: content.companyName,
  publisher: content.companyName,
  icons: {
    icon: [
      { url: '/icon' },
      { url: '/icon/32', sizes: '32x32', type: 'image/png' },
      { url: '/icon/48', sizes: '48x48', type: 'image/png' },
      { url: '/icon/72', sizes: '72x72', type: 'image/png' },
      { url: '/icon/96', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/600x600.jpg' },
      { url: '/600x600.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: content.siteConfig.url,
    siteName: content.companyName,
    title: `${content.companyName} | ${content.hero.description}`,
    description: `Learn more about ${content.companyName}.`,
    images: [
      {
        url: '/600x600.jpg',
        width: 600,
        height: 600,
        alt: `${content.companyName} logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: content.siteConfig.twitterHandle,
    creator: content.siteConfig.twitterHandle,
    title: `${content.companyName} | ${content.hero.title}`,
    description: `Discover ${content.companyName}: ${content.hero.description}.`,
    images: ['/600x600.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  //   yahoo: 'your-yahoo-verification-code',
  // },
  alternates: {
    canonical: content.siteConfig.url,
    languages: {
      'en-US': '/en-US',
      'es-ES': '/es-ES',
    },
  },
  category: 'technology',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
