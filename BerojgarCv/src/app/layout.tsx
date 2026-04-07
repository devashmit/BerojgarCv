import type { Metadata } from 'next'
import { Fraunces, Plus_Jakarta_Sans, DM_Mono, Tiro_Devanagari_Hindi, Noto_Serif_JP } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastContainer } from '@/components/ui/Toast'
import { Suspense } from 'react'
import { MaintenanceBanner } from '@/components/ui/MaintenanceBanner'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const tiroDevanagari = Tiro_Devanagari_Hindi({
  subsets: ['devanagari'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-devanagari',
  display: 'swap',
})

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-jp',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'बेरोजगार CV — Nepal\'s #1 CV Builder',
    template: '%s | बेरोजगार CV',
  },
  description: 'Build a professional CV in 10 minutes. 7 templates for Nepal, Gulf, and Japan. AI bullet improver. Free PDF download. ATS-optimized.',
  keywords: ['Nepal CV', 'Resume builder Nepal', 'Rirekisho Nepal', 'ATS resume', 'Gulf job CV Nepal', 'बेरोजगार CV', 'berojgar cv', 'Nepal job application'],
  openGraph: {
    type: 'website',
    siteName: 'बेरोजगार CV',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
}

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const content = (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} ${dmMono.variable} ${tiroDevanagari.variable} ${notoSerifJP.variable}`}
    >
      <body>
        <ToastContainer>
          <Suspense fallback={null}>
            <MaintenanceBanner />
          </Suspense>
          {children}
        </ToastContainer>
      </body>
    </html>
  )

  if (!publishableKey || publishableKey.includes('placeholder') || publishableKey.includes('...')) {
    console.warn("WARNING: Using a placeholder missing Clerk Publishable Key. Authentication will not work properly.");
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      {content}
    </ClerkProvider>
  )
}
