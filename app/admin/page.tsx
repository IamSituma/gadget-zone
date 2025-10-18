"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useOrdersStore } from "@/lib/orders-store"
import { useAdminAuth } from "@/lib/auth-store"
import { Package, DollarSign, ShoppingCart, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const orders = useOrdersStore((state) => state.orders)
  const logout = useAdminAuth((s) => s.logout)
  const router = useRouter()

  const pendingOrders = orders.filter((order) => order.status === "pending")
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = orders.length

  const stats = [
    {
      title: "Total Revenue",
      value: `${new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', maximumFractionDigits: 0 }).format(totalRevenue)}`,
      icon: DollarSign,
      description: "All time revenue",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
      description: "All orders",
    },
    {
      title: "Pending Orders",
      value: pendingOrders.length,
      icon: Package,
      description: "Awaiting processing",
    },
    {
      title: "Completed",
      value: orders.filter((o) => o.status === "completed").length,
      icon: TrendingUp,
      description: "Successfully delivered",
    },
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <img src="/volts2.png" alt="Voltspire Logo" className="h-12 w-16" />
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="bg-transparent">
              <Link href="/">View Store</Link>
            </Button>
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={() => {
                logout()
                router.replace("/admin/login")
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your store and orders</p>
        </div>

        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Pending Orders</CardTitle>
              <Link href="/admin/orders">
                <Button variant="outline" size="sm" className="bg-transparent">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {pendingOrders.length > 0 ? (
                <div className="space-y-4">
                  {pendingOrders.slice(0, 5).map((order) => (
                    <Link key={order.id} href={`/admin/orders/${order.id}`}>
                      <div className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customerInfo.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${order.total.toFixed(2)}</p>
                          <Badge variant="secondary">{order.status}</Badge>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">No pending orders</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full" size="lg">
                <Link href="/admin/products/new">Add New Product</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent" size="lg">
                <Link href="/admin/orders">Manage Orders</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent" size="lg">
                <Link href="/admin/products">View All Products</Link>
              </Button>
            <Button asChild variant="outline" className="w-full bg-transparent" size="lg">
              <Link href="/admin/reports">Reports</Link>
            </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
