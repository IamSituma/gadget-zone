import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary/80 py-16 h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">Ready to Upgrade Your Home or Office?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90">
          Discover the latest Gizzu power solutions and accessories, enjoy expert support, and get unbeatable prices on premium, reliable devices.

        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/products">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            asChild
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
