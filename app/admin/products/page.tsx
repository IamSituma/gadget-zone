"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/mock-data"
import { formatUGX } from "@/lib/utils"
import { ArrowLeft, Plus } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ProductCategory } from "@/lib/types"

export default function AdminProductsPage() {
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | "All">("All")

  const filteredProducts =
    categoryFilter === "All" ? products : products.filter((product) => product.category === categoryFilter)

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon">
              <Link href="/admin">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">T</span>
              </div>
              <span className="text-xl font-bold">TechHub Admin</span>
            </div>
          </div>
          <Button asChild variant="outline" className="bg-transparent">
            <Link href="/">View Store</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>
          <div className="flex gap-4">
            <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Batteries">Batteries</SelectItem>
                <SelectItem value="Power Stations">Power Stations</SelectItem>
                <SelectItem value="Power Banks">Power Banks</SelectItem>
                <SelectItem value="Lighting">Lighting</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
                <SelectItem value="UPS Batteries">UPS Batteries</SelectItem>
                <SelectItem value="Cables & Adapters">Cables & Adapters</SelectItem>
              </SelectContent>
            </Select>
            <Button asChild>
              <Link href="/admin/products/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{product.name}</p>
                      <Badge variant={product.condition === "Brand New" ? "default" : "secondary"}>
                        {product.condition}
                      </Badge>
                      {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{product.brand}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{formatUGX(product.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
