"use client"

import type React from "react"
import Link from "next/link"
import { Search, ShoppingCart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCartStore } from "@/lib/cart-store"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function SiteHeader() {
  const itemCount = useCartStore((state) => state.getItemCount())
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "All Products" },
    { href: "/our-company", label: "Our Company" },
    { href: "/contact", label: "Contact Us" },
  ]

  return (
    <header className="z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <img src="/volts2.png" alt="Voltspire Logo" className="h-12 w-16" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-black transition-colors hover:text-gray-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search and Cart */}
        <div className="flex flex-1 items-center gap-4 md:max-w-md">
          {/* Search */}
          <form onSubmit={handleSearch} className="hidden flex-1 md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-9 rounded-[30px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Shopping Cart temporarily disabled while using WhatsApp for orders */}
          {/**
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative bg-transparent hover:bg-transparent"
            >
              <ShoppingCart
                className="h-5 w-5 text-green-700"
                strokeWidth={2.5}
              />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Shopping cart</span>
            </Button>
          </Link>
          **/}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="pl-9 rounded-[30px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-semibold text-black transition-colors hover:text-gray-700"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
