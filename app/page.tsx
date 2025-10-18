import { AnnouncementBanner } from "@/components/announcement-banner"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { CategorySection } from "@/components/category-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CTASection } from "@/components/cta-section"
import { VideoSection } from "@/components/video-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PartnersSection } from "@/components/partners-section"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

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
      </main>
      <WhatsAppButton />
    </div>
  )
}
