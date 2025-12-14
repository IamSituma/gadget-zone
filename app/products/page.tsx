"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { AnnouncementBanner } from "@/components/announcement-banner"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Filter } from "lucide-react"
import productsData from "@/data/products.json"
import type { Product, ProductCategory } from "@/lib/types"
import { ProductCard } from "@/components/product-card"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const urlCategory = searchParams.get("category")

  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | "All">("All")
  const [selectedBrand, setSelectedBrand] =
    useState<"All" | "Gizzu" | "Xiaomi">("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 16

  const [visibleCount, setVisibleCount] = useState(productsPerPage)
  const [isMobile, setIsMobile] = useState(false)

  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const products = productsData as Product[]

  const categories: (ProductCategory | "All")[] = [
    "All",
    "Batteries",
    "On The Go",
    "Wearables",
    "Home Appliances",
    "Bathroom Appliances",
    "Audio & Video",
    "Power Stations",
    "Power Banks",
    "Personal Care",
    "Tools",
    "Lighting",
    "Accessories",
    "UPS Batteries",
    "Cables & Adapters",
    "Projectors",
    "Cameras",
  ]

  const brands: ("All" | "Gizzu" | "Xiaomi")[] = ["All", "Gizzu", "Xiaomi"]

  /* Detect mobile */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  /* Sync URL category */
  useEffect(() => {
    if (urlCategory && categories.includes(urlCategory as any)) {
      setSelectedCategory(urlCategory as any)
      setCurrentPage(1)
      setVisibleCount(productsPerPage)
    }
  }, [urlCategory])

  /* Reset on filter change */
  useEffect(() => {
    setVisibleCount(productsPerPage)
    setCurrentPage(1)
  }, [selectedCategory, selectedBrand, searchTerm])

  /* Filter products */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (product.color) return false

      const categoryMatch =
        selectedCategory === "All" || product.category === selectedCategory
      const brandMatch =
        selectedBrand === "All" || product.brand === selectedBrand
      const searchMatch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      return categoryMatch && brandMatch && searchMatch
    })
  }, [products, selectedCategory, selectedBrand, searchTerm])

  /* Infinite scroll (mobile only) */
  useEffect(() => {
    if (!isMobile) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + productsPerPage, filteredProducts.length)
          )
        }
      },
      { threshold: 1 }
    )

    if (loadMoreRef.current) observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [isMobile, filteredProducts.length])

  /* Pagination (desktop) */
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  /* Products to render */
  const displayedProducts = isMobile
    ? filteredProducts.slice(0, visibleCount)
    : filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
      )

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AnnouncementBanner />
      <SiteHeader />

      <main className="container mx-auto px-4 pt-6 pb-8">
        <div className="grid gap-4 lg:grid-cols-[250px_1fr]">

          {/* Mobile Search + Filter */}
          <div className="md:hidden flex items-center gap-2">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="flex-1 rounded-lg border px-3 py-2 text-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileFilterOpen(true)}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Filter Drawer */}
          <Drawer open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Filters</DrawerTitle>
              </DrawerHeader>

              <div className="px-4 pb-6 space-y-6 overflow-y-auto">
                <div>
                  <h3 className="mb-2 font-medium">Categories</h3>
                  <RadioGroup
                    value={selectedCategory}
                    onValueChange={(v) => {
                      setSelectedCategory(v as any)
                      setMobileFilterOpen(false)
                    }}
                  >
                    {categories.map((c) => (
                      <div key={c} className="flex items-center space-x-2 mb-1">
                        <RadioGroupItem value={c} id={`m-${c}`} />
                        <Label htmlFor={`m-${c}`}>{c}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <h3 className="mb-2 font-medium">Brand</h3>
                  <RadioGroup
                    value={selectedBrand}
                    onValueChange={(v) => {
                      setSelectedBrand(v as any)
                      setMobileFilterOpen(false)
                    }}
                  >
                    {brands.map((b) => (
                      <div key={b} className="flex items-center space-x-2 mb-1">
                        <RadioGroupItem value={b} id={`mb-${b}`} />
                        <Label htmlFor={`mb-${b}`}>{b}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Button variant="outline" className="w-full" onClick={() => {
                  setSelectedCategory("All")
                  setSelectedBrand("All")
                  setSearchTerm("")
                  setMobileFilterOpen(false)
                }}>
                  Clear Filters
                </Button>
              </div>
            </DrawerContent>
          </Drawer>

          {/* Desktop Sidebar */}
          <aside className="hidden md:flex flex-col space-y-6">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="rounded-lg border px-3 py-2 text-sm"
            />

            <div>
              <h3 className="mb-2 font-medium">Categories</h3>
              <RadioGroup
                value={selectedCategory}
                onValueChange={(v) => setSelectedCategory(v as any)}
              >
                {categories.map((c) => (
                  <div key={c} className="flex items-center space-x-2 mb-1">
                    <RadioGroupItem value={c} id={`d-${c}`} />
                    <Label htmlFor={`d-${c}`}>{c}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <h3 className="mb-2 font-medium">Brand</h3>
              <RadioGroup
                value={selectedBrand}
                onValueChange={(v) => setSelectedBrand(v as any)}
              >
                {brands.map((b) => (
                  <div key={b} className="flex items-center space-x-2 mb-1">
                    <RadioGroupItem value={b} id={`db-${b}`} />
                    <Label htmlFor={`db-${b}`}>{b}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("All")
                setSelectedBrand("All")
                setSearchTerm("")
              }}
            >
              Clear Filters
            </Button>
          </aside>

          {/* Products */}
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {displayedProducts.map((product, i) => (
                <ProductCard key={`${product.id}-${i}`} product={product} />
              ))}
            </div>

            {/* Infinite scroll trigger (mobile) */}
            {isMobile && visibleCount < filteredProducts.length && (
              <div ref={loadMoreRef} className="h-10" />
            )}

            {/* Pagination (desktop) */}
            {!isMobile && totalPages > 1 && (
              <div className="mt-6 flex justify-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    size="sm"
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
