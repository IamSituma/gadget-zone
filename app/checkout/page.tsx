"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AnnouncementBanner } from "@/components/announcement-banner"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/cart-store"
import { useOrdersStore } from "@/lib/orders-store"
import type { PaymentMethod } from "@/lib/types"
import Image from "next/image"
import { formatUGX } from "@/lib/utils"
import { CreditCard, Smartphone, Banknote } from "lucide-react"

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore()
  const addOrder = useOrdersStore((state) => state.addOrder)
  const router = useRouter()

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([])

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("MTN Mobile Money")
  const [paymentPhone, setPaymentPhone] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = getTotal()
  const shipping = subtotal >= 200000 ? 0 : 10000
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const order = {
      id: `ORD-${Date.now()}`,
      items,
      total,
      paymentMethod,
      paymentPhone: paymentPhone || undefined,
      customerInfo,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    }

    addOrder(order)
    clearCart()
    router.push(`/order-confirmation/${order.id}`)
  }

  const isFormValid =
    customerInfo.name && customerInfo.email && customerInfo.phone && customerInfo.address && items.length > 0

  if (items.length === 0) {
    // Avoid setting state/navigation during render; return a redirect link instead
    return (
      <div className="min-h-screen">
        <AnnouncementBanner />
        <SiteHeader />
        <main className="container mx-auto px-4 py-8">
          <h1 className="mb-4 text-2xl font-bold">Your cart is empty</h1>
          <Button onClick={() => router.push("/products")}>Browse Products</Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <AnnouncementBanner />
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      required
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      placeholder="+256 700 000 000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input
                      id="address"
                      required
                      value={customerInfo.address}
                      onChange={(e) => {
                        const value = e.target.value
                        setCustomerInfo({ ...customerInfo, address: value })
                        const districts = [
                          "Kampala",
                          "Wakiso",
                          "Mukono",
                          "Entebbe",
                          "Jinja",
                          "Mbarara",
                          "Gulu",
                          "Mbale",
                          "Fort Portal",
                          "Arua",
                        ]
                        if (value.length >= 2) {
                          setAddressSuggestions(
                            districts.filter((d) => d.toLowerCase().startsWith(value.toLowerCase())).slice(0, 5),
                          )
                        } else {
                          setAddressSuggestions([])
                        }
                      }}
                      placeholder="123 Main St, Kampala, Uganda"
                    />
                    {addressSuggestions.length > 0 && (
                      <div className="rounded-md border bg-background">
                        {addressSuggestions.map((s) => (
                          <button
                            key={s}
                            type="button"
                            className="block w-full px-3 py-2 text-left hover:bg-muted"
                            onClick={() => {
                              setCustomerInfo({ ...customerInfo, address: s })
                              setAddressSuggestions([])
                            }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 rounded-lg border p-4">
                        <RadioGroupItem value="MTN Mobile Money" id="mtn" />
                        <Label htmlFor="mtn" className="flex flex-1 cursor-pointer items-center gap-3">
                          <img src="/placeholder-logo.png" alt="MTN" className="h-5" />
                          <div>
                            <p className="font-medium">MTN Mobile Money</p>
                            <p className="text-sm text-muted-foreground">Pay with MTN MoMo</p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 rounded-lg border p-4">
                        <RadioGroupItem value="Airtel Money" id="airtel" />
                        <Label htmlFor="airtel" className="flex flex-1 cursor-pointer items-center gap-3">
                          <img src="/placeholder-logo.png" alt="Airtel" className="h-5" />
                          <div>
                            <p className="font-medium">Airtel Money</p>
                            <p className="text-sm text-muted-foreground">Pay with Airtel Money</p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 rounded-lg border p-4">
                        <RadioGroupItem value="Cash on Delivery" id="cod" />
                        <Label htmlFor="cod" className="flex flex-1 cursor-pointer items-center gap-3">
                          <Banknote className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Cash on Delivery</p>
                            <p className="text-sm text-muted-foreground">Pay when you receive</p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 rounded-lg border p-4">
                        <RadioGroupItem value="Visa" id="visa" />
                        <Label htmlFor="visa" className="flex flex-1 cursor-pointer items-center gap-3">
                          <img src="/placeholder-logo.png" alt="Visa" className="h-5" />
                          <div>
                            <p className="font-medium">Visa Card</p>
                            <p className="text-sm text-muted-foreground">Pay with credit/debit card</p>
                          </div>
                        </Label>
                      </div>
                      {(paymentMethod === "MTN Mobile Money" || paymentMethod === "Airtel Money" || paymentMethod === "Visa") && (
                        <div className="mt-3 space-y-2">
                          <Label htmlFor="payment-phone">Payment Phone Number</Label>
                          <Input
                            id="payment-phone"
                            type="tel"
                            placeholder="e.g. 0772 000 000"
                            value={paymentPhone}
                            onChange={(e) => setPaymentPhone(e.target.value)}
                            required
                          />
                        </div>
                      )}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                          <Image
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                    <p className="text-sm font-medium">{formatUGX(item.product.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">{formatUGX(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">{shipping === 0 ? "Free" : formatUGX(shipping)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatUGX(total)}</span>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={!isFormValid || isProcessing}>
                    {isProcessing ? "Processing..." : "Place Order"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
