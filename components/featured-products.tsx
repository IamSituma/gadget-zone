"use client"

import productsData from "@/data/products.json"
import type { Product } from "@/lib/types"
import { ProductCard } from "./product-card"

export function FeaturedProducts() {
  // Cast JSON data to Product[]
  const products = productsData as Product[]

  // Filter only Brand New products and take first 8
  const featuredProducts = products.filter((p) => p.condition === "Brand New").slice(0, 8)

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Featured Products</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showDescriptionSnippet
          />
        ))}
      </div>
    </section>
  )
}
