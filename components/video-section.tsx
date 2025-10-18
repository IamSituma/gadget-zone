export function VideoSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold">Experience the iPhone 17</h2>
          <p className="text-muted-foreground">Watch the latest innovation in mobile technology</p>
        </div>
        <div className="mx-auto max-w-4xl">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
            <video className="h-full w-full object-cover" controls poster="/iphone-17-promotional-image.jpg">
              <source src="/iphone-17-promo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}
