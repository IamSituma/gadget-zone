"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { AnnouncementBanner } from "@/components/announcement-banner"
import { SiteHeader } from "@/components/site-header"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import productsData from "@/data/products.json"
import type { Product, ProductCategory, ProductCondition } from "@/lib/types"
import { formatUGX } from "@/lib/utils"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category") as ProductCategory | null

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "All">(categoryParam || "All")
  const [selectedBrand, setSelectedBrand] = useState<"All" | "Gizzu" | "Xiaomi">("All")

  const products = productsData as Product[]

  const categories: (ProductCategory | "All")[] = [
    "All",
    "Batteries",
    "On The Go",
    "Power Stations",
    "Power Banks",
    "Lighting",
    "Accessories",
    "UPS Batteries",
    "Cables & Adapters",
    "Projectors",
    "Cameras",
  ]

  const brands: ("All" | "Gizzu" | "Xiaomi")[] = ["All", "Gizzu", "Xiaomi"]

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = selectedCategory === "All" || product.category === selectedCategory
      const brandMatch = selectedBrand === "All" || product.brand === selectedBrand
      return categoryMatch && brandMatch
    })
  }, [selectedCategory, selectedBrand, products])

  const clearFilters = () => {
    setSelectedCategory("All")
    setSelectedBrand("All")
  }

  return (
    <div className="min-h-screen">
      <AnnouncementBanner />
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">All Products</h1>

        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          <aside className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Category</h3>
              <RadioGroup value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <RadioGroupItem value={category} id={`category-${category}`} />
                    <Label htmlFor={`category-${category}`} className="cursor-pointer">
                      {category}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Brand Filter */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Brand</h3>
              <RadioGroup value={selectedBrand} onValueChange={(value) => setSelectedBrand(value as any)}>
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <RadioGroupItem value={brand} id={`brand-${brand}`} />
                    <Label htmlFor={`brand-${brand}`} className="cursor-pointer">
                      {brand}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Button variant="outline" className="w-full bg-transparent" onClick={clearFilters}>
              Clear Filters
            </Button>
          </aside>

          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-medium">No products found</p>
                  <p className="mt-2 text-muted-foreground">Try adjusting your filters</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
