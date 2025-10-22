import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASectionSecondary() {
  return (
    <section className="bg-green-600 py-16">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Ready to Upgrade Your Home or Office?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
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
            className="border-white text-white hover:bg-white hover:text-black bg-transparent"
            asChild
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}


