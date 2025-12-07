import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Home - Voltspire",
}

import { AnnouncementBanner } from "@/components/announcement-banner"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { CategorySection } from "@/components/category-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CTASection } from "@/components/cta-section"
import { CTASectionSecondary } from "@/components/cta-section-secondary"
import { PartnersSection } from "@/components/partners-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { VideoSection } from "@/components/video-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <AnnouncementBanner />
      <SiteHeader />

      <main>
        <HeroSection />
        <CategorySection />
        <FeaturedProducts />
        <CTASection />
        {/* <VideoSection /> */}
        <PartnersSection />
        <TestimonialsSection />
        <CTASectionSecondary />
      </main>
    </div>
  )
}
