import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatUGX(amount: number): string {
  // Simple UGX formatting without decimals
  const rounded = Math.round(amount)
  return `UGX ${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
}
