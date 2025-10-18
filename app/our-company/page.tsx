"use client"

import { AnnouncementBanner } from "@/components/announcement-banner"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent } from "@/components/ui/card"

export default function OurCompanyPage() {
  const features = [
    { title: "Quality Products", description: "We curate reliable electronics and power solutions." },
    { title: "Trusted Partners", description: "We work with leading brands across the region." },
    { title: "Nationwide Support", description: "Fast delivery and after-sales assistance across Uganda." },
    { title: "Great Value", description: "Competitive pricing and seasonal offers." },
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
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="space-y-2 p-6">
                <h3 className="text-xl font-semibold">Our Mission</h3>
                <p className="text-muted-foreground">To deliver trusted electronics and exceptional experiences.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-2 p-6">
                <h3 className="text-xl font-semibold">What We Offer</h3>
                <p className="text-muted-foreground">
                  A curated selection of devices, accessories, and power solutions backed by support.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}


