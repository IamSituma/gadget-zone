import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <img src="/volts2.png" alt="Voltspire Logo" className="h-20 w-28 mb-4" />
            <p className="mb-4 text-sm text-muted-foreground">
              Your trusted destination for premium electronics batteries, power solutions, and energy products.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/our-company" className="text-muted-foreground hover:text-primary">
                  Our Company
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=Batteries" className="text-muted-foreground hover:text-primary">
                  Batteries
                </Link>
              </li>
              <li>
                <Link href="/products?category=Power Stations" className="text-muted-foreground hover:text-primary">
                  Power Stations
                </Link>
              </li>
              <li>
                <Link href="/products?category=UPS Batteries" className="text-muted-foreground hover:text-primary">
                  UPS Batteries
                </Link>
              </li>
              <li>
                <Link href="/products?category=Cables %26 Adapters" className="text-muted-foreground hover:text-primary">
                  Cables & Adapters
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">123 Tech Street, Kampala, Uganda</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">+256 700 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">info@voltspire.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Voltspire, Member of Soulspire Group Limied. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
