"use client"

import { AnnouncementBanner } from "@/components/announcement-banner"
import { SiteHeader } from "@/components/site-header"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/mock-data"
import { Wrench, Shield, Clock, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function RepairPage() {
  const repairProducts = []

  const features = [
    {
      icon: Wrench,
      title: "Quality Parts",
      description: "Genuine and high-quality replacement parts for all major brands",
    },
    {
      icon: Shield,
      title: "Warranty Included",
      description: "All repair parts come with a warranty for your peace of mind",
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Quick shipping to get your device back up and running",
    },
    {
      icon: Award,
      title: "Expert Support",
      description: "Professional guidance and installation tips available",
    },
  ]

  return (
    <div className="min-h-screen">
      <AnnouncementBanner />
      <SiteHeader />
      <main>
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-4 py-16">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-balance text-4xl font-bold md:text-5xl">Our Company</h1>
              <p className="text-pretty text-lg text-muted-foreground">
                TechHub is a Kampala-based electronics retailer providing reliable devices, accessories, and support to
                customers across Uganda. We partner with leading brands and prioritize exceptional service.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title}>
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="mb-4 rounded-full bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="space-y-2 p-6">
                <h3 className="text-xl font-semibold">Our Mission</h3>
                <p className="text-muted-foreground">
                  To deliver trusted electronics and exceptional customer experiences, nationwide.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-2 p-6">
                <h3 className="text-xl font-semibold">What We Offer</h3>
                <p className="text-muted-foreground">
                  A curated selection of devices, accessories, and power solutions backed by reliable support.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Get in Touch</h2>
              <p className="mb-6 text-muted-foreground">Have questions? We’re here to help you choose the right gear.</p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <div className="rounded-lg bg-background p-4 shadow-sm">
                  <p className="text-sm text-muted-foreground">Email us at</p>
                  <p className="font-semibold">support@techhub.com</p>
                </div>
                <div className="rounded-lg bg-background p-4 shadow-sm">
                  <p className="text-sm text-muted-foreground">Call us at</p>
                  <p className="font-semibold">+256 700 000 000</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
