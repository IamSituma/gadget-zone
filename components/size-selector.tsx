"use client"

import { useState, useEffect } from "react"
import { Product } from "@/lib/types"

interface SizeSelectorProps {
  product: Product
}

export function SizeSelector({ product }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined)

  // Dispatch a global event so other client components (eg. WhatsApp button)
  // can react to size changes without prop-drilling.
  useEffect(() => {
    if (selectedSize) {
      const detail = { productId: product.id, size: selectedSize }
      const ev = new CustomEvent("size-selected", { detail })
      window.dispatchEvent(ev)
    }
  }, [selectedSize, product.id])

  if (!product.sizeOptions || product.sizeOptions.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2">
      {product.sizeOptions.map((size) => (
        <button
          key={size}
          onClick={() => setSelectedSize(size)}
          className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
            selectedSize === size
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border hover:border-primary/50"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  )
}
