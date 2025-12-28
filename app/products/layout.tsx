import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "All Products - Voltspire",
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children
}


