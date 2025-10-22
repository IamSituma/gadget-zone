"use client"

import { X } from "lucide-react"
import { useState } from "react"

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-black text-primary-foreground">
      <div className="mx-auto flex items-center justify-center gap-4 px-4 py-3 text-sm font-medium">
        <p className="text-center">Free Shipping on Orders Over UGX 500,000 | Shop now and save up to 10% on selected items</p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
          aria-label="Close announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
