import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Your One-Stop Shop for Premium Electronics
          </h1>
          <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
            Discover the latest phones, TVs, laptops, and accessories. Quality products with fast delivery and expert
            repair services.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/products">
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/repair">Repair Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
