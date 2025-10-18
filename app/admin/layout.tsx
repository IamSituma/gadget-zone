"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAdminAuth } from "@/lib/auth-store"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isAuthed = useAdminAuth((s) => s.isAuthenticated)

  useEffect(() => {
    const isAuthRoute = pathname?.startsWith("/admin/login") || pathname?.startsWith("/admin/forgot-password")
    if (!isAuthRoute && !isAuthed) {
      router.replace("/admin/login")
    }
  }, [isAuthed, pathname, router])

  return <>{children}</>
}


