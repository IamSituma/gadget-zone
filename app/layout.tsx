import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SiteFooter } from "@/components/site-footer"

// Global Poppins font for entire site
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Voltspire - Your Official Gizzu Electronics Store",
  description:
    "Shop the latest power banks, power stations, batteries, lighting bulbs, and accessories.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased font-poppins`}>
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
