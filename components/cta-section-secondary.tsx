import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASectionSecondary() {
  return (
    <section className="bg-green-600 py-12 md:py-48">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">Ready to Upgrade Your Home or Office?</h2>
        <p className="mx-auto mb-6 sm:mb-8 max-w-2xl text-sm sm:text-base md:text-lg text-white/90">
          Discover the latest power solutions and accessories, enjoy expert support, and get unbeatable prices on premium, reliable devices.
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


