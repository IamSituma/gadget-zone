import fs from "node:fs/promises"
import path from "node:path"
import type { Product } from "@/lib/types"

const productsFilePath = path.join(process.cwd(), "data", "products.json")

export async function getAllProducts(): Promise<Product[]> {
  try {
    const file = await fs.readFile(productsFilePath, "utf8")
    const json = JSON.parse(file) as Product[]
    return json
  } catch (err) {
    // If file missing or malformed, return empty list for now
    return []
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const all = await getAllProducts()
  return all.find((p) => p.id === id)
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const all = await getAllProducts()
  return all.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit)
}


