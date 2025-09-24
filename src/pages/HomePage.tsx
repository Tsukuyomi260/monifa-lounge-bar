import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, MapPin, Phone, Star } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { mockProducts } from '../utils/mockData'

const categories = [
  { id: 'all', name: 'Tous', icon: '🍽️' },
  { id: 'fastfood', name: 'Fastfood', icon: '🍔' },
  { id: 'african-cuisine', name: 'Cuisine Africaine', icon: '🌍' },
  { id: 'salads', name: 'Salades', icon: '🥗' },
  { id: 'drinks', name: 'Boissons', icon: '🥤' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
]

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [favorites, setFavorites] = useState<string[]>([])

  const specialOffers = mockProducts.filter(product => product.isSpecialOffer)
  const filteredProducts = selectedCategory === 'all' 
    ? mockProducts 
    : mockProducts.filter(product => product.category === selectedCategory)

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <main className="container-padding section-padding">
        <div className="space-y-8">
          {/* Section Offres Spéciales */}
          {specialOffers.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Offres Spéciales
              </h2>
              <div className="space-y-4">
                {specialOffers.map((offer) => (
                  <ProductCard
                    key={offer.id}
                    product={offer}
                    variant="featured"
                    isFavorite={favorites.includes(offer.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            </motion.section>
          )}

          {/* Section Catégories */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Catégories
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl text-center transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="text-sm font-medium">{category.name}</div>
                </button>
              ))}
            </div>
          </motion.section>

          {/* Section Produits */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'Tous les plats' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <span className="text-sm text-gray-500">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          </motion.section>

          {/* Section Informations Monifa Lounge Bar */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Informations Monifa Lounge Bar
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary-500" />
                  <div>
                    <div className="font-medium text-gray-900">Horaires</div>
                    <div className="text-sm text-gray-500">
                      Lundi au Dimanche: 8h à 02h
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary-500" />
                  <div>
                    <div className="font-medium text-gray-900">Adresse</div>
                    <div className="text-sm text-gray-500">
                      Calavi Zogbadjè en allant vers le campus
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary-500" />
                  <div>
                    <div className="font-medium text-gray-900">Téléphone</div>
                    <div className="text-sm text-gray-500">
                      +229 67234684
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-primary-500" />
                  <div>
                    <div className="font-medium text-gray-900">Note</div>
                    <div className="text-sm text-gray-500">
                      4.8/5 ⭐ (127 avis)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  )
}
