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
import type { Product, ProductCategory } from "@/lib/types"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category") as ProductCategory | null

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "All">(categoryParam || "All")
  const [selectedBrand, setSelectedBrand] = useState<"All" | "Gizzu" | "Xiaomi">("All")

  // 👉 Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

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

  // 👉 Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = selectedCategory === "All" || product.category === selectedCategory
      const brandMatch = selectedBrand === "All" || product.brand === selectedBrand
      return categoryMatch && brandMatch
    })
  }, [selectedCategory, selectedBrand, products])

  // 👉 Reset to page 1 after changing filters
  const handleFilterChange = (type: "category" | "brand", value: any) => {
    if (type === "category") setSelectedCategory(value)
    if (type === "brand") setSelectedBrand(value)
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSelectedCategory("All")
    setSelectedBrand("All")
    setCurrentPage(1)
  }

  // 👉 Pagination calculations
  const indexOfLast = currentPage * productsPerPage
  const indexOfFirst = indexOfLast - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast)

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  return (
    <div className="min-h-screen">
      <AnnouncementBanner />
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">All Products</h1>

        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          {/* Sidebar Filters */}
          <aside className="space-y-6">

            {/* Category Filter */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Category</h3>
              <RadioGroup
                value={selectedCategory}
                onValueChange={(value) => handleFilterChange("category", value)}
              >
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
              <RadioGroup
                value={selectedBrand}
                onValueChange={(value) => handleFilterChange("brand", value)}
              >
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

          {/* Main Content */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            </div>

            {/* Product Grid */}
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {currentProducts.map((product) => (
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">

                {/* Prev */}
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Previous
                </Button>

                {/* Page numbers */}
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1
                  return (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  )
                })}

                {/* Next */}
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </Button>

              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
