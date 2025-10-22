"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatUGX } from "@/lib/utils"
import type { Product } from "@/lib/types"
import { useCartStore } from "@/lib/cart-store"
import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { WhatsAppButton } from "@/components/whatsapp-button"

interface ProductCardProps {
  product: Product
  showDescriptionSnippet?: boolean
}

export function ProductCard({ product, showDescriptionSnippet = false }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const router = useRouter()

  // const handleAddToCart = (e: React.MouseEvent) => {
  //   e.preventDefault()
  //   addItem(product)
  // }

  // const handleBuyNow = (e: React.MouseEvent) => {
  //   e.preventDefault()
  //   addItem(product)
  //   router.push("/checkout")
  // }

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lg">
        <CardContent className="p-4">
          <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain transition-transform group-hover:scale-105"
            />
            <div className="absolute right-2 top-2 flex flex-col gap-2">
              <Badge variant={product.condition === "Brand New" ? "default" : "secondary"}>{product.condition}</Badge>
              {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">{product.brand}</p>
            <h3 className="line-clamp-2 font-semibold leading-tight">{product.name}</h3>
            {showDescriptionSnippet && (
              <p className="line-clamp-1 text-sm text-muted-foreground">{product.description}</p>
            )}
            {/* price hidden while using WhatsApp for pricing */}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 p-4 pt-0">
          {/* <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent h-10"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          <Button size="sm" className="flex-1 h-10" onClick={handleBuyNow} disabled={!product.inStock}>
            Buy Now
          </Button> */}
          <WhatsAppButton
            size="sm"
            className="flex-1 h-10"
            label="Contact for Price"
            message={`Hi! I'm interested in the ${product.name}. Could you share the price?\n\nProduct link: ${typeof window !== 'undefined' ? window.location.origin : ''}/product/${product.id}`}
          />
        </CardFooter>
      </Card>
    </Link>
  )
}
