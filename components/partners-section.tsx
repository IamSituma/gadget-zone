"use client"

export function PartnersSection() {
  const partners = [
    { name: "Gizzu", src: "/gizzu.jpg" },
    { name: "Xiaomi", src: "/xiaomi.jpg" },
    { name: "AMD", src: "/amd.jpg" },
    { name: "MSI", src: "/msi.jpg" },
    { name: "Intel", src: "/intel.jpg" },
    { name: "Antect", src: "/antec.jpg" },
  ]

  return (
    <section className="border-t bg-muted/30 min-h-[200px]">
      <div className="container mx-auto px-4 py-12">
        <h2 className="mb-6 text-center text-3xl font-bold">Our Partners</h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
          We proudly work with leading brands to bring you authentic products and reliable service.
        </p>
        <div className="grid grid-cols-2 items-center gap-8 sm:grid-cols-3 md:grid-cols-6">
          {partners.map((p) => (
            <div key={p.name} className="flex items-center justify-center">
              <img
                src={p.src}
                alt={p.name}
                className="w-30 h-30 object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
