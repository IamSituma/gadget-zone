import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Business Owner",
    content:
      "Amazing service! Got my Gizzu power station delivered in no time. The performance is excellent, and the price was very reasonable.",
    rating: 5,
    image: "/professional-woman-portrait.png",
  },
  {
    name: "David Mukasa",
    role: "Student",
    content:
      "Got my UPS Battery from here. Top quality, fair pricing, and quick delivery. Definitely my go-to store for power solutions!",
    rating: 5,
    image: "/young-man-portrait.png",
  },
  {
    name: "Grace Nambi",
    role: "Photographer",
    content:
      "Great experience! Bought a couple of accessories from Voltspire. Both work perfectly and hold charge for days. Fantastic value!",
    rating: 5,
    image: "/woman-photographer-portrait.png",
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-muted/50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">What Our Customers Say</h2>
          <p className="text-muted-foreground">Don't just take our word for it</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mb-6 text-muted-foreground">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
