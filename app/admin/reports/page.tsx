"use client"

import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useOrdersStore } from "@/lib/orders-store"
import { formatUGX } from "@/lib/utils"

export default function AdminReportsPage() {
  const orders = useOrdersStore((s) => s.orders)
  const total = orders.reduce((sum, o) => sum + o.total, 0)
  const completed = orders.filter((o) => o.status === "completed").length
  const pending = orders.filter((o) => o.status === "pending").length

  const downloadPdf = async () => {
    const content = document.getElementById("report-content")
    if (!content) return
    // Fallback to print dialog which can save as PDF
    window.print()
  }

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
          <div className="flex items-center gap-2">
            <Button onClick={downloadPdf}>
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Overview of orders and revenue</p>
        </div>

        <div id="report-content" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{formatUGX(total)}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Orders</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{orders.length}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completed Orders</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{completed}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Orders</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{pending}</CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}


