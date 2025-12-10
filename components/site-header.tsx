"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  const categories = [
    "Batteries",
    "Power Stations",
    "Lighting",
    "Accessories",
    "Power Banks",
  ]

  return (
    <header className="w-full border-b bg-white font-[Poppins]">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">

        <Link href="/" className="flex items-center space-x-2">
      {/* Image Logo */}
      <img
        src="/volts2.png"
        alt="Voltspire Logo"
        className="h-12 w-16 md:h-12 md:w-26 object-contain"/>
    </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 font-normal">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${encodeURIComponent(cat)}`}
              className="hover:text-primary"
            >
              {cat}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu size={24} />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[250px] pt-10 font-[Poppins]">
            <nav className="flex flex-col space-y-4 text-lg">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/products?category=${encodeURIComponent(cat)}`}
                  onClick={() => setOpen(false)}
                >
                  {cat}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
