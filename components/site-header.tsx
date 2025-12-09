"use client"

import type React from "react"
import Link from "next/link"
import { Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function SiteHeader() {
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
    // { href: "/our-company", label: "Our Company" }, // 🔥 COMMENTED OUT
    { href: "/contact", label: "Contact Us" },
  ]

  return (
    <header className="z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/volts2.png"
            alt="Voltspire Logo"
            className="h-10 w-14 sm:h-12 sm:w-16"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
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

        {/* Right Side: Search + Mobile Hamburger */}
        <div className="flex items-center gap-4 md:gap-6 ml-auto">
          {/* Mobile Search Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => router.push("/search")}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Mobile Hamburger */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-white dark:bg-gray-900 w-[280px] p-6 shadow-2xl rounded-l-2xl"
            >
              {/* Nav Links Only (smaller, normal weight) */}
              <nav className="flex flex-col gap-4 text-base font-normal mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-900 dark:text-white hover:text-green-700 transition-colors"
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
