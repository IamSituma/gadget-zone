"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Check } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { ProductActions } from "@/components/product-actions"
import ProductGalleryVariants from "@/components/product-gallery-variants"
import { ProductShare } from "@/components/product-share"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { SizeSelector } from "@/components/size-selector"
import type { Product } from "@/lib/types"

interface ProductPageClientProps {
  product: Product
  variants: Product[]
  relatedProducts: Product[]
}

export default function ProductPageClient({ product, variants, relatedProducts }: ProductPageClientProps) {

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          {/* @ts-ignore-next-line */}
          <ProductGalleryVariants product={product} variants={variants} />

          {/* Product Info */}
          <div className="space-y-6">

            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">{product.brand}</p>
              <h1 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-bold">{product.name}</h1>

              <div className="mt-4 flex items-center gap-3">
                <Badge
                  variant={product.condition === "Brand New" ? "default" : "secondary"}
                  className="text-sm"
                >
                  {product.condition}
                </Badge>

                {product.inStock ? (
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <Check className="h-4 w-4" />
                    In Stock
                  </div>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}

                <div className="ml-auto">
                  <ProductShare productName={product.name} productId={product.id} />
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="mb-2 text-base sm:text-lg font-semibold">Description</h2>
              <p className="text-sm sm:text-base text-muted-foreground">{product.description}</p>
            </div>

            {/* Size Selection */}
            {(product.sizeOptions ?? []).length > 0 && (
              <div>
                <h2 className="mb-2 text-base sm:text-lg font-semibold">Size</h2>
                <SizeSelector product={product} />
              </div>
            )}

            {/* Features */}
            {(product.features ?? []).length > 0 && (
              <div>
                <h2 className="mb-2 text-base sm:text-lg font-semibold">Features</h2>
                <ul className="list-disc pl-6 text-sm sm:text-base text-muted-foreground space-y-1">
                  {(product.features ?? []).map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}


            {/* Specifications */}
            {product.specifications && (
              <>
                <Separator />
                <div>
                  <h2 className="mb-4 text-lg font-semibold">Specifications</h2>
                  <div className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b pb-2">
                        <span className="font-medium">{key}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* CTA Buttons */}
            <ProductActions product={product} />
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {relatedProducts.map((rp) => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
