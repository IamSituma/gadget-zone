"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
  size?: "sm" | "default" | "lg"
  className?: string
  floating?: boolean
  label?: string
}

export function WhatsAppButton({
  phoneNumber = "+256792895666",
  message = "Hi! I'm interested in your products.",
  size = "lg",
  className,
  floating = false,
  label = "WhatsApp",
}: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const sanitized = phoneNumber.replace(/\D/g, "")
    const url = `https://wa.me/${sanitized}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  const classes = floating
    ? "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-green-500 p-0 shadow-lg hover:bg-green-600"
    : "bg-green-500 hover:bg-green-600"

  return (
    <Button onClick={handleWhatsAppClick} size={size} className={`${classes} ${className || ""}`.trim()} aria-label="Chat on WhatsApp">
      <MessageCircle className={floating ? "h-6 w-6" : "mr-2 h-4 w-4"} />
      {!floating && <span>{label}</span>}
    </Button>
  )
}
