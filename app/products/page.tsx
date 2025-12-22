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

  // States to control “View More / View Less”
  const [showAllCategoriesMobile, setShowAllCategoriesMobile] = useState(false)
  const [showAllCategoriesDesktop, setShowAllCategoriesDesktop] = useState(false)
  const [showAllBrandsMobile, setShowAllBrandsMobile] = useState(false)
  const [showAllBrandsDesktop, setShowAllBrandsDesktop] = useState(false)

  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const products = productsData as Product[]

  const categories: (ProductCategory | "All")[] = [
    "All",
    "Batteries",
    "Wearables",
    "Audio Accessories",
    "Networking",
    "Monitors & Displays",
    "PC Cases",
    "Mobile Phones & Tablets",
    "Car Accessories",
    "Computers & Accessories",
    "Electric Scooters",
    "Home Accessories",
    "Bathroom Accessories",
    "Audio & Video",
    "Power Stations",
    "Power Banks",
    "UPS Backup",
    "Personal Care",
    "Pet Supplies",
    "Tools",
    "Lighting",
    "Accessories",
    "Chargers & Adapters",
    "Projectors",
    "Cameras",
    "Solar Panels",
  ]

  const brands: ("All" | "Gizzu" | "Xiaomi" | "AMD" | "Antec" | "AOC" | "ASRock" | "FSP" | "GeIL" | "Giada")[] =
    ["All", "Gizzu", "Xiaomi", "AMD", "Antec", "AOC", "ASRock", "FSP", "GeIL", "Giada"]

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

  /* Helper to show first 10 categories / 5 brands or all */
  const mobileCategoriesToShow = showAllCategoriesMobile ? categories : categories.slice(0, 5)
  const desktopCategoriesToShow = showAllCategoriesDesktop ? categories : categories.slice(0, 6)

  const mobileBrandsToShow = showAllBrandsMobile ? brands : brands.slice(0, 3)
  const desktopBrandsToShow = showAllBrandsDesktop ? brands : brands.slice(0, 4)

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
                {/* Categories Mobile */}
                <div>
                  <h3 className="mb-2 font-medium">Categories</h3>
                  <RadioGroup
                    value={selectedCategory}
                    onValueChange={(v) => {
                      setSelectedCategory(v as any)
                      setMobileFilterOpen(false)
                    }}
                  >
                    {mobileCategoriesToShow.map((c) => (
                      <div key={c} className="flex items-center space-x-2 mb-1">
                        <RadioGroupItem value={c} id={`m-${c}`} />
                        <Label htmlFor={`m-${c}`}>{c}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {categories.length > 10 && (
                    <div className="mt-2">
                      <Button
                        variant="link"
                        size="sm"
                        className="text-green-600 hover:text-green-800"
                        onClick={() => setShowAllCategoriesMobile(!showAllCategoriesMobile)}
                      >
                        {showAllCategoriesMobile ? "View Less" : "View More"}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Brands Mobile */}
                <div>
                  <h3 className="mb-2 font-medium">Brand</h3>
                  <RadioGroup
                    value={selectedBrand}
                    onValueChange={(v) => {
                      setSelectedBrand(v as any)
                      setMobileFilterOpen(false)
                    }}
                  >
                    {mobileBrandsToShow.map((b) => (
                      <div key={b} className="flex items-center space-x-2 mb-1">
                        <RadioGroupItem value={b} id={`mb-${b}`} />
                        <Label htmlFor={`mb-${b}`}>{b}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {brands.length > 5 && (
                    <div className="mt-2">
                      <Button
                        variant="link"
                        size="sm"
                        className="text-green-600 hover:text-green-800"
                        onClick={() => setShowAllBrandsMobile(!showAllBrandsMobile)}
                      >
                        {showAllBrandsMobile ? "View Less" : "View More"}
                      </Button>
                    </div>
                  )}
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

            {/* Categories Desktop */}
            <div>
              <h3 className="mb-2 font-medium">Categories</h3>
              <RadioGroup
                value={selectedCategory}
                onValueChange={(v) => setSelectedCategory(v as any)}
              >
                {desktopCategoriesToShow.map((c) => (
                  <div key={c} className="flex items-center space-x-2 mb-1">
                    <RadioGroupItem value={c} id={`d-${c}`} />
                    <Label htmlFor={`d-${c}`}>{c}</Label>
                  </div>
                ))}
              </RadioGroup>
              {categories.length > 10 && (
                <div className="mt-2">
                  <Button
                    variant="link"
                    size="sm"
                    className="text-green-600 hover:text-green-800"
                    onClick={() => setShowAllCategoriesDesktop(!showAllCategoriesDesktop)}
                  >
                    {showAllCategoriesDesktop ? "View Less" : "View More"}
                  </Button>
                </div>
              )}
            </div>

            {/* Brands Desktop */}
            <div>
              <h3 className="mb-2 font-medium">Brand</h3>
              <RadioGroup
                value={selectedBrand}
                onValueChange={(v) => setSelectedBrand(v as any)}
              >
                {desktopBrandsToShow.map((b) => (
                  <div key={b} className="flex items-center space-x-2 mb-1">
                    <RadioGroupItem value={b} id={`db-${b}`} />
                    <Label htmlFor={`db-${b}`}>{b}</Label>
                  </div>
                ))}
              </RadioGroup>
              {brands.length > 5 && (
                <div className="mt-2">
                  <Button
                    variant="link"
                    size="sm"
                    className="text-green-600 hover:text-green-800"
                    onClick={() => setShowAllBrandsDesktop(!showAllBrandsDesktop)}
                  >
                    {showAllBrandsDesktop ? "View Less" : "View More"}
                  </Button>
                </div>
              )}
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
