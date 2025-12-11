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
import { ProductImageGallery } from "@/components/product-image-gallery"
import ProductGalleryVariants from "@/components/product-gallery-variants"
import { ProductShare } from "@/components/product-share"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { formatUGX } from "@/lib/utils"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // ⬅ Next.js 15 FIX
  const { id } = await params

  const product = await getProductById(id)
  if (!product) notFound()

  const relatedProducts = await getRelatedProducts(product)
  const variants = await getVariants(product)

  return (
    <div className="min-h-screen">
      <AnnouncementBanner />
      <SiteHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Gallery (with variants) */}
          {/* ProductGalleryVariants is a client component that will handle variant selection */}
          {/* Import it dynamically to avoid server/client mismatch */}
          {/* @ts-ignore-next-line */}
          <ProductGalleryVariants product={product} variants={variants} />

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">{product.brand}</p>
              <h1 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-bold">{product.name}</h1>

              <div className="mt-4 flex items-center gap-3">
                <Badge
                  variant={product.condition === "Brand New" ? "default" : "secondary"}
                  className="text-sm"
                >
                  {product.condition}
                </Badge>

                {product.inStock ? (
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <Check className="h-4 w-4" />
                    In Stock
                  </div>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}

                <div className="ml-auto">
                  <ProductShare
                    productName={product.name}
                    productId={product.id}
                  />
                </div>
              </div>
            </div>

            {/* Price / Contact */}
            <div className="flex items-center gap-3">
              <p className="text-xl font-semibold">Contact for price</p>
              <WhatsAppButton
                size="sm"
                message={`Hello Voltspire! I'm interested in the ${product.name}. Could you share the price?\n\nProduct link: ${
                  typeof window !== "undefined" ? window.location.origin : ""
                }/product/${product.id}`}
                productId={product.id}
              />
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="mb-2 text-base sm:text-lg font-semibold">Description</h2>
              <p className="text-sm sm:text-base text-muted-foreground">{product.description}</p>
            </div>

            {/* Features */}
            {(product.features ?? []).length > 0 && (
              <div>
                <h2 className="mb-2 text-base sm:text-lg font-semibold">Features</h2>
                <ul className="list-disc pl-6 text-sm sm:text-base text-muted-foreground space-y-1">
                  {(product.features ?? []).map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && (
              <>
                <Separator />

                <div>
                  <h2 className="mb-4 text-lg font-semibold">Specifications</h2>
                  <div className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b pb-2">
                        <span className="font-medium">{key}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* CTA Buttons */}
            <ProductActions product={product} />
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">Related Products</h2>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {relatedProducts.map((rp) => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

/* ----------------------------- Metadata ----------------------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  // ⬅ Next.js 15 FIX
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
