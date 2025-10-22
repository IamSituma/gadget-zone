export type ProductCondition = "Brand New" | "Used"

export type ProductCategory =
  | "Batteries"
  | "On The Go"
  | "Power Stations"
  | "Power Banks"
  | "Lighting"
  | "Accessories"
  | "UPS Batteries"
  | "Cables & Adapters"

export type PaymentMethod = "MTN Mobile Money" | "Airtel Money" | "Cash on Delivery" | "Visa"

export interface Product {
  id: string
  name: string
  description: string
  price?: number
  category: ProductCategory
  condition: ProductCondition
  image: string
  images: string[]
  brand: string
  inStock: boolean
  specifications?: Record<string, string>
  features?: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  paymentMethod: PaymentMethod
  paymentPhone?: string
  customerInfo: {
    name: string
    email: string
    phone: string
    address: string
  }
  status: "pending" | "processing" | "completed" | "cancelled"
  createdAt: string
}
