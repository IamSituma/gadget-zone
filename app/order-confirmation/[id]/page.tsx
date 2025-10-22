"use client"

import { use, useEffect } from "react"
import { notFound, useRouter } from "next/navigation"
import { AnnouncementBanner } from "@/components/announcement-banner"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useOrdersStore } from "@/lib/orders-store"
import { CheckCircle2, Printer } from "lucide-react"
import Image from "next/image"
import { formatUGX } from "@/lib/utils"
import Link from "next/link"

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const order = useOrdersStore((state) => state.getOrderById(id))
  const router = useRouter()

  if (!order) {
    notFound()
  }

  useEffect(() => {
    setTimeout(() => window.print(), 300)
  }, [])

  const downloadReceipt = () => window.print()

  // Safe calculations with fallback to 0
  const subtotal = order.items.reduce(
    (sum, item) => sum + (item.product.price ?? 0) * item.quantity,
    0
  )
  const shipping = order.total - subtotal

  return (
    <div className="min-h-screen">
      <AnnouncementBanner />
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="mb-2 text-3xl font-bold">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been received.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="font-medium">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium">{order.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{order.status}</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="mb-2 text-sm text-muted-foreground">Delivery Address</p>
                <p className="font-medium">{order.customerInfo.name}</p>
                <p className="text-sm">{order.customerInfo.address}</p>
                <p className="text-sm">{order.customerInfo.phone}</p>
                <p className="text-sm">{order.customerInfo.email}</p>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-1 justify-between">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatUGX(item.product.price ?? 0)} each
                      </p>
                    </div>
                    <p className="font-medium">
                      {formatUGX((item.product.price ?? 0) * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatUGX(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : formatUGX(shipping)}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatUGX(order.total)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button asChild className="flex-1">
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => router.push("/")}
            >
              Back to Home
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" onClick={downloadReceipt}>
              <Printer className="mr-2 h-4 w-4" /> Download Receipt (PDF)
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

/**
 * Optional: Static paths for export.
 * Only implement if you have a way to fetch all orders.
 */
export async function generateStaticParams() {
  // Example: fetch all order IDs
  // const orders = await getAllOrders()
  // return orders.map((order) => ({ id: order.id.toString() }))

  return [] // Empty for now if dynamic orders are not known
}
