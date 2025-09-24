import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Search, Menu, ShoppingCart, ArrowLeft } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { getTotalItems } = useCartStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isHomePage = location.pathname === '/'
  const cartItemsCount = getTotalItems()

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleSearchClick = () => {
    // TODO: Implémenter la recherche
    console.log('Recherche')
  }

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleCartClick = () => {
    navigate('/cart')
  }

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="container-padding">
          <div className="flex items-center justify-between h-16">
            {/* Bouton retour ou logo */}
            <div className="flex items-center">
              {!isHomePage ? (
                <button
                  onClick={handleBackClick}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Retour"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <h1 className="text-xl font-bold text-gray-900 font-display">
                    Monifa Lounge Bar
                  </h1>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSearchClick}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="Rechercher"
              >
                <Search className="w-6 h-6 text-gray-700" />
              </button>

              <button
                onClick={handleMenuClick}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="Menu"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>

              <button
                onClick={handleCartClick}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="Panier"
              >
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu déroulant */}
      {isMenuOpen && (
        <div className="absolute top-16 right-4 z-40 bg-white rounded-xl shadow-lg border border-gray-200 py-2 min-w-[200px]">
          <button
            onClick={() => {
              navigate('/')
              setIsMenuOpen(false)
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
          >
            Accueil
          </button>
          <button
            onClick={() => {
              navigate('/orders')
              setIsMenuOpen(false)
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
          >
            Mes commandes
          </button>
          <button
            onClick={() => {
              navigate('/profile')
              setIsMenuOpen(false)
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
          >
            Profil
          </button>
        </div>
      )}

      {/* Overlay pour fermer le menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  )
}
