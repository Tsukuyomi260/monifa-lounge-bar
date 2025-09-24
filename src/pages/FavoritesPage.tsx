import { useState } from 'react'
import { Heart, Trash2 } from 'lucide-react'
import { mockProducts } from '../utils/mockData'
import ProductCard from '../components/ProductCard'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>(['1', '3', '6'])

  const favoriteProducts = mockProducts.filter(product => 
    favorites.includes(product.id)
  )

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-24">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Aucun favori
          </h2>
          <p className="text-gray-500">
            Ajoutez des produits à vos favoris pour les retrouver facilement
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="container-padding section-padding">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Mes favoris
            </h1>
            <p className="text-gray-600">
              {favoriteProducts.length} produit{favoriteProducts.length > 1 ? 's' : ''} favori{favoriteProducts.length > 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
