"use client"

import { AnnouncementBanner } from "@/components/announcement-banner"
import { SiteHeader } from "@/components/site-header"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/mock-data"
import { Headphones, Mouse, Cable, Watch } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Accessories - Voltspire",
}

export default function AccessoriesPage() {
  const accessoryProducts = products.filter((p) => p.category === "Accessories")
  const chargers = products.filter((p) => p.category === "Chargers")
  const speakers = products.filter((p) => p.category === "Speakers")

  const allAccessories = [...accessoryProducts, ...chargers, ...speakers]

  const categories = [
    {
      icon: Headphones,
      title: "Audio",
      description: "Headphones, earbuds, and speakers",
      href: "/products?category=Speakers",
    },
    {
      icon: Mouse,
      title: "Peripherals",
      description: "Keyboards, mice, and more",
      href: "/products?category=Accessories",
    },
    {
      icon: Cable,
      title: "Chargers & Cables",
      description: "Power adapters and charging cables",
      href: "/products?category=Chargers",
    },
    {
      icon: Watch,
      title: "Wearables",
      description: "Smartwatches and fitness trackers",
      href: "/products?category=Accessories",
    },
  ]

  return (
    <div className="min-h-screen">
      <AnnouncementBanner />
      <SiteHeader />
      <main>
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-4 py-16">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-balance text-4xl font-bold md:text-5xl">Accessories & More</h1>
              <p className="text-pretty text-lg text-muted-foreground">
                Enhance your tech experience with our wide range of accessories. From audio gear to charging solutions,
                find everything you need.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <h2 className="mb-8 text-center text-3xl font-bold">Browse by Category</h2>
          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Link key={category.title} href={category.href}>
                  <Card className="group h-full transition-all hover:shadow-md">
                    <CardContent className="flex flex-col items-center p-6 text-center">
                      <div className="mb-4 rounded-full bg-primary/10 p-4 transition-colors group-hover:bg-primary/20">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mb-2 font-semibold">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold">Featured Accessories</h2>
            <p className="mt-2 text-muted-foreground">
              Discover our selection of {allAccessories.length} premium accessories
            </p>
          </div>

          {allAccessories.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {allAccessories.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-medium">No accessories available</p>
                <p className="mt-2 text-muted-foreground">Check back soon for new items</p>
              </div>
            </div>
          )}
        </section>

        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Why Choose Our Accessories?</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                <div>
                  <h3 className="mb-2 font-semibold">Premium Quality</h3>
                  <p className="text-sm text-muted-foreground">Only the best brands and highest quality products</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Great Prices</h3>
                  <p className="text-sm text-muted-foreground">Competitive pricing on all accessories</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Fast Shipping</h3>
                  <p className="text-sm text-muted-foreground">Quick delivery to your doorstep</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
