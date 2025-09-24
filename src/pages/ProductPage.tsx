import { useParams, useNavigate } from 'react-router-dom'
import { Heart, Plus, Minus, Clock, Star } from 'lucide-react'
import { useState } from 'react'
import { mockProducts } from '../utils/mockData'
import { useCartStore } from '../store/cartStore'
import { formatPrice } from '../utils/helpers'
import toast from 'react-hot-toast'

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem, items } = useCartStore()
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)

  const product = mockProducts.find(p => p.id === id)
  const cartItem = items.find(item => item.product.id === id)
  const currentQuantity = cartItem?.quantity || 0

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-24">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Produit non trouvé
          </h2>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product, quantity, notes)
    toast.success(`${product.name} ajouté au panier`)
    setQuantity(1)
    setNotes('')
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="container-padding section-padding">
        <div className="space-y-6">
          {/* Image du produit */}
          <div className="relative">
            <div className="w-full h-64 rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`absolute top-4 right-4 p-3 rounded-full transition-colors duration-200 ${
                isFavorite 
                  ? 'text-red-500 bg-white shadow-md' 
                  : 'text-gray-400 bg-white shadow-md hover:text-red-500'
              }`}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Informations du produit */}
          <div className="card p-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-sm font-medium text-gray-600">4.8</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-primary-500 mx-auto mb-1" />
                  <div className="text-sm font-medium text-gray-900">
                    {product.preparationTime} min
                  </div>
                  <div className="text-xs text-gray-500">Préparation</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">
                    {product.calories}
                  </div>
                  <div className="text-xs text-gray-500">Calories</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">
                    {product.weight}g
                  </div>
                  <div className="text-xs text-gray-500">Poids</div>
                </div>
              </div>
            </div>
          </div>

          {/* Ingrédients */}
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Ingrédients</h3>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          {/* Quantité et notes */}
          <div className="card p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantité
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="font-medium text-gray-900 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes spéciales (optionnel)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Sans oignon, bien cuit..."
                  className="input-field min-h-[80px] resize-none"
                />
              </div>
            </div>
          </div>

          {/* Bouton d'ajout au panier */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              className="btn-primary w-full"
            >
              Ajouter au panier - {formatPrice(product.price * quantity)}
            </button>
            {currentQuantity > 0 && (
              <div className="text-center text-sm text-gray-500">
                {currentQuantity} dans votre panier
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
