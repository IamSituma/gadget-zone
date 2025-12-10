"use client"

import Link from "next/link"
import {
  Battery,
  BatteryFull,
  Zap,
  Lightbulb,
  Cable,
  Plug,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { name: "Batteries", icon: Battery, href: "/products?category=Batteries" },
  { name: "Power Stations", icon: BatteryFull, href: "/products?category=Power%20Stations" },
  { name: "Power Banks", icon: Zap, href: "/products?category=Power%20Banks" },
  { name: "Lighting", icon: Lightbulb, href: "/products?category=Lighting" },
  { name: "Accessories", icon: Plug, href: "/products?category=Accessories" },
  { name: "Cables & Adapters", icon: Cable, href: "/products?category=Cables%20%26%20Adapters" },
]

export function CategorySection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="mb-8 text-center text-3xl font-bold">Shop by Category</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Link key={category.name} href={category.href}>
              <Card className="group transition-all hover:shadow-xl hover:-translate-y-1 bg-green-600 rounded-xl">
                <CardContent className="flex flex-col items-center gap-3 p-6">
                  <div className="rounded-full bg-white p-4 transition-all group-hover:bg-gray-200">
                    <Icon className="h-6 w-6 text-green-700" />
                  </div>
                  <p className="text-center text-white text-sm font-medium tracking-wide">
                    {category.name}
                  </p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
