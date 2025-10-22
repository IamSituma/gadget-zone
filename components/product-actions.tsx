"use client"

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Product } from "@/lib/types"
import { WhatsAppButton } from "@/components/whatsapp-button"

interface ProductActionsProps {
  product: Product
}

export function ProductActions({ product }: ProductActionsProps) {
  const addItem = useCartStore((state) => state.addItem)
  const router = useRouter()

  // const handleAddToCart = () => {
  //   addItem(product)
  // }

  // const handleBuyNow = () => {
  //   addItem(product)
  //   router.push("/checkout")
  // }

  return (
    <div className="flex gap-4">
      {/* <Button
        size="lg"
        variant="outline"
        className="flex-1 bg-transparent h-12"
        onClick={handleAddToCart}
        disabled={!product.inStock}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
      <Button size="lg" className="flex-1 h-12" onClick={handleBuyNow} disabled={!product.inStock}>
        Buy Now
      </Button> */}
      <WhatsAppButton
        size="lg"
        className="flex-1 h-12"
        label="Contact for Price"
        message={`Hi! I'm interested in the ${product.name}. Could you share the price?`}
      />
    </div>
  )
}
