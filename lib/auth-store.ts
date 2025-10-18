"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AdminAuthState {
  isAuthenticated: boolean
  adminEmail: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  requestPasswordReset: (email: string) => Promise<void>
}

export const useAdminAuth = create<AdminAuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      adminEmail: null,

      // For demo purposes, accept any non-empty email/password as valid
      async login(email, password) {
        const isValid = Boolean(email && password)
        if (isValid) {
          set({ isAuthenticated: true, adminEmail: email })
          return true
        }
        return false
      },

      logout() {
        set({ isAuthenticated: false, adminEmail: null })
      },

      async requestPasswordReset(email) {
        // Simulate async request
        await new Promise((r) => setTimeout(r, 500))
        // no-op in demo
      },
    }),
    {
      name: "admin-auth-storage",
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated, adminEmail: state.adminEmail }),
    },
  ),
)


