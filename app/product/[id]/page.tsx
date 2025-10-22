import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { AnnouncementBanner } from "@/components/announcement-banner"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getProductById, getRelatedProducts } from "@/lib/products"
import { Check } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { ProductActions } from "@/components/product-actions"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { ProductShare } from "@/components/product-share"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { formatUGX } from "@/lib/utils"
 

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product)

  return (
    <div className="min-h-screen">
      <AnnouncementBanner />
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <ProductImageGallery images={product.images} productName={product.name} mainImage={product.image} />

          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
              <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
              <div className="mt-4 flex items-center gap-3">
                <Badge variant={product.condition === "Brand New" ? "default" : "secondary"} className="text-sm">
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
                  <ProductShare productName={product.name} productId={product.id} />
                </div>
              </div>
            </div>

            <div>
              {/* <p className="text-4xl font-bold">{formatUGX(product.price)}</p> */}
              <div className="flex items-center gap-3">
                <p className="text-xl font-semibold">Contact for price</p>
                <WhatsAppButton size="sm" message={`Hi! I'm interested in the ${product.name}. Could you share the price?`} />
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="mb-2 text-lg font-semibold">Description</h2>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {product.features && product.features.length > 0 && (
              <div>
                <h2 className="mb-2 text-lg font-semibold">Features</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  {product.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

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

            <ProductActions product={product} />
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </main>
      {/** Removed floating WhatsApp button below the footer */}
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)
  const title = product ? `${product.name} - Voltspire` : "Product - Voltspire"
  return { title }
}
