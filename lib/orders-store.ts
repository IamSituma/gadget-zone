"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Order } from "./types"

interface OrdersStore {
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
  getOrderById: (orderId: string) => Order | undefined
}

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }))
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) => (order.id === orderId ? { ...order, status } : order)),
        }))
      },

      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId)
      },
    }),
    {
      name: "orders-storage",
    },
  ),
)
