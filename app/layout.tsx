import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const siteUrl = 'https://www.selfpdf.xyz'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Free PDF Tools Online | Merge, Compress, Convert & Edit PDFs | SelfPDF',
    template: '%s | SelfPDF',
  },
  description:
    'Free online PDF tools to merge, split, compress, convert, edit, sign, protect, and organize PDF files directly in your browser.',
  applicationName: 'SelfPDF',
  creator: 'SelfPDF',
  publisher: 'SelfPDF',
  category: 'Productivity',
  keywords: [
    'free PDF tools',
    'online PDF tools',
    'merge PDF',
    'compress PDF',
    'convert PDF',
    'split PDF',
    'edit PDF online',
    'PDF converter',
    'PDF editor',
    'sign PDF',
    'protect PDF',
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'SelfPDF',
    title: 'Free PDF Tools Online | SelfPDF',
    description: 'Merge, compress, convert, edit, sign, and organize PDFs online with SelfPDF.',
    images: [{ url: '/selfpdf-logo.png', width: 1200, height: 630, alt: 'SelfPDF free PDF tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF Tools Online | SelfPDF',
    description: 'Free online PDF tools for merging, compressing, converting, editing, and signing PDFs.',
    images: ['/selfpdf-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  verification: { google: 'tHukVrfQBbJqiGXL8knlQaiqL-rBQkPlpADl0PlKrX0' },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-icon.png',
    shortcut: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="white" />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
