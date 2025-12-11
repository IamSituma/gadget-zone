"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Product } from "@/lib/types"
import { ProductImageGallery } from "./product-image-gallery"

interface Props {
  product: Product
  variants: Product[]
}

export default function ProductGalleryVariants({ product, variants }: Props) {
  const [selectedId, setSelectedId] = useState(product.id)
  const selected = variants.find((v) => v.id === selectedId) || product

  // Dispatch a global event so other client components (eg. WhatsApp button)
  // can react to variant changes without prop-drilling.
  useEffect(() => {
    const detail = { productId: product.id, variantId: selected.id, color: (selected as Product).color }
    const ev = new CustomEvent("variant-selected", { detail })
    // Fire once on mount and on selected change
    window.dispatchEvent(ev)
  }, [selected.id, product.id, selected])

  return (
    <div className="space-y-4">
      <ProductImageGallery images={selected.images} productName={selected.name} mainImage={selected.image} />

      {variants.length > 1 && (
        <div className="flex items-center gap-3">
          {variants.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedId(v.id)}
              className={`flex-shrink-0 rounded-full border-2 p-0.5 transition-all ${
                v.id === selectedId ? "border-primary" : "border-transparent"
              }`}
              aria-label={`Select variant ${v.id}`}
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                <Image src={v.image || "/placeholder.svg"} alt={v.name} fill className="object-contain" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
