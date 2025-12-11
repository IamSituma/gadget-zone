"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

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
        className="h-8 w-12 sm:h-10 sm:w-14 md:h-12 md:w-16 object-contain"/>
    </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 font-normal">
          <Link href="/products?category=All" className="hover:text-primary">
            Products
          </Link>
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
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <Menu size={24} />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[280px] p-0 font-[Poppins] flex flex-col">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="px-4 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Menu</h2>
            </div>
            <nav className="flex-1 flex flex-col space-y-1 px-2 py-4 overflow-y-auto">
              <Link
                href="/products?category=All"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100 text-base font-medium transition-colors"
              >
                <span>All Products</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
              <div className="px-2 py-3">
                <p className="text-xs uppercase font-semibold text-gray-500 mb-3">Categories</p>
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/products?category=${encodeURIComponent(cat)}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-100 text-sm transition-colors"
                  >
                    <span>{cat}</span>
                    <ChevronRight className="h-3 w-3 text-gray-400" />
                  </Link>
                ))}
              </div>
            </nav>
            <div className="px-4 py-4 border-t space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Contact Us
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
