import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative w-full h-[70vh]">
      {/* Background Image */}
      <Image
        src="/banner.png"
        alt="Gizzu Power Station"
        fill
        priority
        className="absolute inset-0 w-full h-full object-fit"
      />

      {/* Optional Overlay */}
      <div className="absolute inset-0 bg-black/10" />
    </section>
  )
}
