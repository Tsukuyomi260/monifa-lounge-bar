import { useState } from 'react'
import { Plus, Minus, Heart } from 'lucide-react'
import { Product } from '../types'
import { formatPrice, calculateDiscountPercentage } from '../utils/helpers'
import { useCartStore } from '../store/cartStore'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact' | 'featured'
  showAddButton?: boolean
  onAddToCart?: (product: Product) => void
  onToggleFavorite?: (productId: string) => void
  isFavorite?: boolean
}

export default function ProductCard({
  product,
  variant = 'default',
  showAddButton = true,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
}: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const { addItem, removeItem, items } = useCartStore()
  
  const cartItem = items.find(item => item.product.id === product.id)
  const quantity = cartItem?.quantity || 0

  const handleAddToCart = async () => {
    if (isAdding) return
    
    setIsAdding(true)
    try {
      addItem(product, selectedQuantity)
      toast.success(`${selectedQuantity} ${product.name} ajouté${selectedQuantity > 1 ? 's' : ''} au panier`)
      onAddToCart?.(product)
      setSelectedQuantity(1) // Reset quantity after adding
    } catch (error) {
      toast.error('Erreur lors de l\'ajout au panier')
    } finally {
      setIsAdding(false)
    }
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setSelectedQuantity(newQuantity)
    }
  }

  const handleIncrement = () => {
    addItem(product, 1)
    toast.success(`${product.name} ajouté au panier`)
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      addItem(product, -1)
    } else {
      removeItem(product.id)
      toast.success(`${product.name} retiré du panier`)
    }
  }

  const handleToggleFavorite = () => {
    onToggleFavorite?.(product.id)
  }

  const discountPercentage = product.originalPrice 
    ? calculateDiscountPercentage(product.originalPrice, product.price)
    : 0

  if (variant === 'featured') {
    return (
      <div className="card p-4 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900">{product.name}</h3>
            {product.isSpecialOffer && (
              <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Offre spéciale
              </span>
            )}
          </div>
          {onToggleFavorite && (
            <button
              onClick={handleToggleFavorite}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isFavorite 
                  ? 'text-red-500 bg-red-50' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
              </div>
              
              {showAddButton && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(selectedQuantity - 1)}
                      disabled={selectedQuantity <= 1}
                      className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-medium text-gray-900 text-sm min-w-[16px] text-center">
                      {selectedQuantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(selectedQuantity + 1)}
                      disabled={selectedQuantity >= 10}
                      className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="btn-primary py-2 px-3 text-sm"
                  >
                    {isAdding ? 'Ajout...' : 'Ajouter'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Variant par défaut
  return (
    <div className="card p-4">
      <div className="relative mb-3">
        <div className="relative w-full h-32 rounded-xl overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {product.isSpecialOffer && (
          <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            -{discountPercentage}%
          </div>
        )}
        
        {onToggleFavorite && (
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-2 right-2 p-2 rounded-full transition-colors duration-200 ${
              isFavorite 
                ? 'text-red-500 bg-white shadow-sm' 
                : 'text-gray-400 bg-white shadow-sm hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
          </div>
          
          <div className="text-xs text-gray-500">
            {product.calories} cal
          </div>
        </div>
        
        {showAddButton && (
          <div className="space-y-3 pt-2">
            {/* Contrôles de quantité */}
            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={() => handleQuantityChange(selectedQuantity - 1)}
                disabled={selectedQuantity <= 1}
                className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-medium text-gray-900 min-w-[20px] text-center">
                {selectedQuantity}
              </span>
              <button
                onClick={() => handleQuantityChange(selectedQuantity + 1)}
                disabled={selectedQuantity >= 10}
                className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            {/* Bouton d'ajout au panier */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="btn-primary py-2 px-4 text-sm w-full"
            >
              {isAdding ? 'Ajout...' : `Ajouter ${selectedQuantity} au panier`}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
