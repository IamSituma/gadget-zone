import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { AnnouncementBanner } from "@/components/announcement-banner"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getProductById, getAllProducts, getRelatedProducts, getVariants } from "@/lib/products"
import { Check } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { ProductActions } from "@/components/product-actions"
import ProductGalleryVariants from "@/components/product-gallery-variants"
import { ProductShare } from "@/components/product-share"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { SizeSelector } from "@/components/size-selector"
import ProductPageClient from "@/components/product-page-client"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProductById(id)
  if (!product) notFound()

  const relatedProducts = await getRelatedProducts(product)
  const variants = await getVariants(product)

  return (
    <div className="min-h-screen">
      <AnnouncementBanner />
      <SiteHeader />
      <ProductPageClient product={product} variants={variants} relatedProducts={relatedProducts} />
    </div>
  )
}

/* ----------------------------- Metadata ----------------------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)

  return {
    title: product ? `${product.name} - Voltspire` : "Product - Voltspire",
  }
}

/* --------------------------- Static Params --------------------------- */
export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}
