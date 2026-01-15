import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { siteConfig } from "@/lib/site-config"
import { SkipNav } from "@/components/skip-nav"
import { Header } from "@/components/header"
import { AIAssistantProvider } from "@/ai-assistant"

import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} flex min-h-screen flex-col font-sans antialiased `}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AIAssistantProvider
            config={{
              ui: {
                title: `${siteConfig.name} Assistant`,
                welcomeMessage: `Hi! I can help you navigate the ${siteConfig.name} documentation, explain concepts, and find what you need. What would you like to know?`,
                placeholder: 'Ask about the docs...',
              },
            }}
          >
            <SkipNav />
            <Header />
            {children}
          </AIAssistantProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
