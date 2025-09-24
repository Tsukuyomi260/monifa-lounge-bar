import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Heart, ShoppingCart, User, Clock } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { motion, AnimatePresence } from 'framer-motion'

const navigationItems = [
  {
    name: 'Accueil',
    href: '/',
    icon: Home,
  },
  {
    name: 'Favoris',
    href: '/favorites',
    icon: Heart,
  },
  {
    name: 'Panier',
    href: '/cart',
    icon: ShoppingCart,
    showBadge: true,
  },
  {
    name: 'Commandes',
    href: '/orders',
    icon: Clock,
  },
  {
    name: 'Profil',
    href: '/profile',
    icon: User,
  },
]

export default function BottomNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const { getTotalItems } = useCartStore()

  const handleNavigation = (href: string) => {
    navigate(href)
  }

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-40">
      {/* Dock Container avec effet frosted glass */}
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-full px-4 py-3 shadow-2xl">
        <div className="flex items-center justify-around relative">
          {navigationItems.map((item, index) => {
            const isActive = location.pathname === item.href
            const Icon = item.icon
            const badgeCount = item.showBadge ? getTotalItems() : 0

            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className="flex flex-col items-center justify-center py-2 px-2 transition-all duration-300 min-w-0 flex-1 relative z-10"
                aria-label={item.name}
              >
                <div className="relative">
                  {/* Cercle coloré pour l'icône active avec animation */}
                  <AnimatePresence mode="wait">
                    {isActive ? (
                      <motion.div
                        key="active"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 20,
                          duration: 0.3
                        }}
                        className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <motion.div
                          initial={{ rotate: -180, scale: 0 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 15,
                            delay: 0.1
                          }}
                        >
                          <Icon className="w-6 h-6 text-black" />
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="inactive"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-12 h-12 flex items-center justify-center"
                      >
                        <motion.div
                          initial={{ scale: 1 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Icon className="w-6 h-6 text-white/80" />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Badge pour le panier avec animation */}
                  {item.showBadge && badgeCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 15 
                      }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium shadow-lg"
                    >
                      {badgeCount > 99 ? '99+' : badgeCount}
                    </motion.span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
