"use client"

export function PartnersSection() {
  const partners = [
    { name: "Apple", src: "/placeholder-logo.png" },
    { name: "Samsung", src: "/placeholder-logo.png" },
    { name: "LG", src: "/placeholder-logo.png" },
    { name: "Sony", src: "/placeholder-logo.png" },
    { name: "Dell", src: "/placeholder-logo.png" },
  ]

  return (
    <section className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <h2 className="mb-6 text-center text-2xl font-bold">Our Partners</h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
          We proudly work with leading brands to bring you authentic products and reliable service.
        </p>
        <div className="grid grid-cols-2 items-center gap-8 sm:grid-cols-3 md:grid-cols-5">
          {partners.map((p) => (
            <div key={p.name} className="flex items-center justify-center">
              {/* Using placeholder logos for now */}
              <img src={p.src} alt={p.name} className="h-10 opacity-70" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


