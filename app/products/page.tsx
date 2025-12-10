"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AnnouncementBanner } from "@/components/announcement-banner"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import productsData from "@/data/products.json"
import type { Product, ProductCategory } from "@/lib/types"
import { ProductCard } from "@/components/product-card"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const urlCategory = searchParams.get("category")

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "All">("All")
  const [selectedBrand, setSelectedBrand] = useState<"All" | "Gizzu" | "Xiaomi">("All")
  const [searchTerm, setSearchTerm] = useState("") // search input

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

  useEffect(() => {
    if (urlCategory && categories.includes(urlCategory as any)) {
      setSelectedCategory(urlCategory as any)
      setCurrentPage(1)
    }
  }, [urlCategory])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = selectedCategory === "All" || product.category === selectedCategory
      const brandMatch = selectedBrand === "All" || product.brand === selectedBrand
      const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      return categoryMatch && brandMatch && searchMatch
    })
  }, [selectedCategory, selectedBrand, searchTerm, products])

  const handleFilterChange = (type: "category" | "brand", value: any) => {
    if (type === "category") setSelectedCategory(value)
    if (type === "brand") setSelectedBrand(value)
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSelectedCategory("All")
    setSelectedBrand("All")
    setSearchTerm("")
    setCurrentPage(1)
  }

  const indexOfLast = currentPage * productsPerPage
  const indexOfFirst = indexOfLast - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  return (
    <div className="min-h-screen">
      <AnnouncementBanner />
      <SiteHeader />

      <main className="container mx-auto px-4 py-8 font-normal">
        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">

          {/* Desktop Sidebar */}
          <aside className="hidden md:flex md:flex-col md:space-y-6">
            {/* Search */}
            <div>
              <input
                id="desktop-search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            {/* Categories */}
            <div>
              <h3 className="mb-2 text-lg font-medium">Categories</h3>
              <RadioGroup
                value={selectedCategory}
                onValueChange={(value) => handleFilterChange("category", value)}
              >
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2 mb-1">
                    <RadioGroupItem value={category} id={`category-desktop-${category}`} />
                    <Label htmlFor={`category-desktop-${category}`}>{category}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Brands */}
            <div>
              <h3 className="mb-2 text-lg font-medium">Brand</h3>
              <RadioGroup
                value={selectedBrand}
                onValueChange={(value) => handleFilterChange("brand", value)}
              >
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2 mb-1">
                    <RadioGroupItem value={brand} id={`brand-desktop-${brand}`} />
                    <Label htmlFor={`brand-desktop-${brand}`}>{brand}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Button variant="outline" className="w-full mt-2" onClick={clearFilters}>
              Clear Filters
            </Button>
          </aside>

          {/* Product Grid */}
          <div>
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </p>

            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[400px] items-center justify-center text-center">
                <div>
                  <p className="text-lg font-medium">No products found</p>
                  <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  size="sm"
                >
                  Previous
                </Button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1
                  return (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  )
                })}

                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  size="sm"
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
