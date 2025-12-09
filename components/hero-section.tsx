import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative w-full h-[40vh] sm:h-[55vh] md:h-[70vh]">
      <Image
        src="/banner.png"
        alt="Gizzu Power Station"
        fill
        priority
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Optional Overlay */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </section>
  )
}
