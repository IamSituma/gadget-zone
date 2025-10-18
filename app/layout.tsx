import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "TechHub - Your Electronics Store",
  description: "Shop the latest phones, TVs, laptops, speakers, and accessories. Repair parts available.",
  generator: "v0.app",
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
