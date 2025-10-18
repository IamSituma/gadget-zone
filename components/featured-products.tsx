"use client"

import { products } from "@/lib/mock-data"
import { ProductCard } from "./product-card"

export function FeaturedProducts() {
  const featuredProducts = products.filter((p) => p.condition === "Brand New").slice(0, 8)

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Featured Products</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
