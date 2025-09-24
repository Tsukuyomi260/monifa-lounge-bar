import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product, OrderType } from '../types'

interface CartState {
  items: CartItem[]
  orderType: OrderType
  orderNotes: string
  customerInfo: {
    name: string
    email: string
    phone: string
    address?: string
    dineInTime?: Date
  }
  
  // Actions
  addItem: (product: Product, quantity?: number, notes?: string) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  updateNotes: (productId: string, notes: string) => void
  clearCart: () => void
  setOrderType: (type: OrderType) => void
  updateCustomerInfo: (info: Partial<CartState['customerInfo']>) => void
  setOrderNotes: (notes: string) => void
  
  // Computed values
  getTotalItems: () => number
  getSubtotal: () => number
  getTotal: () => number
  getDeliveryFee: () => number
}

const DELIVERY_FEE = 500 // 500 FCFA pour la livraison

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      orderType: 'takeaway',
      orderNotes: '',
      customerInfo: {
        name: '',
        email: '',
        phone: '',
      },

      addItem: (product, quantity = 1, notes = '') => {
        set((state) => {
          const existingItem = state.items.find(item => item.product.id === product.id)
          
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }
          
          const newItem: CartItem = {
            id: `${product.id}-${Date.now()}`,
            product,
            quantity,
            notes,
          }
          
          return {
            items: [...state.items, newItem],
          }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.product.id !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        
        set((state) => ({
          items: state.items.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          ),
        }))
      },

      updateNotes: (productId, notes) => {
        set((state) => ({
          items: state.items.map(item =>
            item.product.id === productId
              ? { ...item, notes }
              : item
          ),
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      setOrderType: (type) => {
        set({ orderType: type })
      },

      updateCustomerInfo: (info) => {
        set((state) => ({
          customerInfo: { ...state.customerInfo, ...info },
        }))
      },

      setOrderNotes: (notes) => {
        set({ orderNotes: notes })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const itemPrice = item.product.originalPrice || item.product.price
          return total + (itemPrice * item.quantity)
        }, 0)
      },

      getDeliveryFee: () => {
        const { orderType, getSubtotal } = get()
        if (orderType === 'delivery' && getSubtotal() > 0) {
          return DELIVERY_FEE
        }
        return 0
      },

      getTotal: () => {
        const subtotal = get().getSubtotal()
        const deliveryFee = get().getDeliveryFee()
        return subtotal + deliveryFee
      },
    }),
    {
      name: 'monifa-cart',
      partialize: (state) => ({
        items: state.items,
        orderType: state.orderType,
        orderNotes: state.orderNotes,
        customerInfo: state.customerInfo,
      }),
    }
  )
)
