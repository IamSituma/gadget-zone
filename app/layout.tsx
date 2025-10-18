import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Voltspire - Your Official Gizzu Electronics Store",
  description: "Shop the latest power banks, power stations, batterues, lighting bulbs, and accessories.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
