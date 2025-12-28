"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
  size?: "sm" | "default" | "lg"
  className?: string
  floating?: boolean
  label?: string
  productId?: string
}

export function WhatsAppButton({
  phoneNumber = "+256792895666",
  message = "Hello Voltspire! I'm interested in your products.",
  size = "lg",
  className,
  floating = false,
  label = "WhatsApp",
  productId,
}: WhatsAppButtonProps) {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined)
  const [selectedConnectionType, setSelectedConnectionType] = useState<string | undefined>(undefined)

  // Listen for variant selection events and update the message for the matching product
  useEffect(() => {
    const handler = (e: Event) => {
      try {
        const ev = e as CustomEvent
        const detail = ev.detail as { productId?: string; variantId?: string; color?: string; connectionType?: string }
        if (!detail) return
        if (!productId || detail.productId === productId) {
          setSelectedColor(detail.color)
          setSelectedConnectionType(detail.connectionType)
        }
      } catch (err) {
        // ignore
      }
    }

    window.addEventListener("variant-selected", handler as EventListener)
    return () => window.removeEventListener("variant-selected", handler as EventListener)
  }, [productId])
  const handleWhatsAppClick = () => {
    const sanitized = phoneNumber.replace(/\D/g, "")
    const colorPart = selectedColor ? `\nColor: ${selectedColor}` : ""
    const connectionPart = selectedConnectionType ? `\nConnection: ${selectedConnectionType}` : ""
    const finalMessage = `${message}${colorPart}${connectionPart}`
    const url = `https://wa.me/${sanitized}?text=${encodeURIComponent(finalMessage)}`
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
