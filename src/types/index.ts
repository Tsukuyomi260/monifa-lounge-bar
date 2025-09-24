// Types pour les produits du restaurant
export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: ProductCategory
  ingredients: string[]
  calories: number
  weight: number
  isSpecialOffer?: boolean
  discountPercentage?: number
  isAvailable: boolean
  preparationTime: number // en minutes
  tags: string[]
}

export type ProductCategory = 
  | 'fastfood'
  | 'african-cuisine'
  | 'salads'
  | 'drinks'
  | 'desserts'
  | 'special-offers'

// Types pour le panier
export interface CartItem {
  id: string
  product: Product
  quantity: number
  notes?: string
  selectedOptions?: ProductOption[]
}

export interface ProductOption {
  id: string
  name: string
  price: number
  isRequired: boolean
}

// Types pour les commandes
export interface Order {
  id: string
  items: CartItem[]
  total: number
  subtotal: number
  tax: number
  deliveryFee?: number
  orderType: OrderType
  status: OrderStatus
  customerInfo: CustomerInfo
  orderTime: Date
  estimatedDeliveryTime?: Date
  notes?: string
  paymentStatus: PaymentStatus
  paymentMethod?: PaymentMethod
}

export type OrderType = 'dine-in' | 'takeaway' | 'delivery'
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'
export type PaymentMethod = 'card' | 'cash' | 'mobile'

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  address?: string
  dineInTime?: Date
}
