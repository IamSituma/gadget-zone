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

export async function getVariants(product: Product): Promise<Product[]> {
  const all = await getAllProducts()
  // Find products with the exact same name (different colors/variants)
  return all.filter((p) => p.name === product.name)
}

export async function getUniqueProducts(): Promise<Product[]> {
  const all = await getAllProducts()
  // Group products by name and return only the first product from each group
  const seenNames = new Set<string>()
  return all.filter((product) => {
    if (seenNames.has(product.name)) {
      return false
    }
    seenNames.add(product.name)
    return true
  })
}


