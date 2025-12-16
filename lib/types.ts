export type ProductCondition = "Brand New" | "Used"

export type ProductCategory =
  | "Batteries"
  | "Wearables"
  | "Networking"
  | "Audio Accessories"
  | "Mobile Phones & Tablets"
  | "Car Accessories"
  | "Computer Accessories"
  | "Home Accessories"
  | "Electric Scooters"
  | "Bathroom Accessories"
  | "Audio & Video"
  | "Power Stations"
  | "Power Banks"
  | "Personal Care"
  | "Pet Supplies"
  | "Tools"
  | "Lighting"
  | "Accessories"
  | "UPS Batteries"
  | "Cables & Adapters"
  | "Projectors"
  | "Cameras"


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
  color?: string
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
