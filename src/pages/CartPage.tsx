import { useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { formatPrice } from '../utils/helpers'
import toast from 'react-hot-toast'

export default function CartPage() {
  const navigate = useNavigate()
  const { 
    items, 
    orderType, 
    orderNotes,
    customerInfo,
    updateQuantity, 
    removeItem, 
    updateNotes,
    setOrderType,
    updateCustomerInfo,
    setOrderNotes,
    getSubtotal,
    getDeliveryFee,
    getTotal,
    clearCart
  } = useCartStore()

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId)
      toast.success('Produit retiré du panier')
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleRemoveItem = (productId: string) => {
    removeItem(productId)
    toast.success('Produit retiré du panier')
  }

  const handleOrderTypeChange = (type: 'dine-in' | 'takeaway' | 'delivery') => {
    setOrderType(type)
  }

  const handleCustomerInfoChange = (field: string, value: string) => {
    updateCustomerInfo({ [field]: value })
  }

  const handleOrderNotesChange = (notes: string) => {
    setOrderNotes(notes)
  }

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Votre panier est vide')
      return
    }

    if (!customerInfo.name || !customerInfo.phone) {
      toast.error('Veuillez remplir vos informations')
      return
    }

    if (orderType === 'delivery' && !customerInfo.address) {
      toast.error('Veuillez renseigner votre adresse pour la livraison')
      return
    }

    navigate('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-24">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Votre panier est vide
          </h2>
          <p className="text-gray-500 mb-6">
            Ajoutez des produits pour commencer votre commande
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Voir le menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="container-padding section-padding">
        <div className="space-y-6">
          {/* Type de commande */}
          <div className="card p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Type de commande</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleOrderTypeChange('dine-in')}
                className={`p-3 rounded-lg text-center transition-colors duration-200 ${
                  orderType === 'dine-in'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="text-sm font-medium">Sur place</div>
              </button>
              <button
                onClick={() => handleOrderTypeChange('takeaway')}
                className={`p-3 rounded-lg text-center transition-colors duration-200 ${
                  orderType === 'takeaway'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="text-sm font-medium">À emporter</div>
              </button>
              <button
                onClick={() => handleOrderTypeChange('delivery')}
                className={`p-3 rounded-lg text-center transition-colors duration-200 ${
                  orderType === 'delivery'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="text-sm font-medium">Livraison</div>
              </button>
            </div>
          </div>

          {/* Informations client */}
          <div className="card p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Vos informations</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Votre nom *"
                value={customerInfo.name}
                onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
                className="input-field"
                required
              />
              <input
                type="tel"
                placeholder="Téléphone *"
                value={customerInfo.phone}
                onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                className="input-field"
                required
              />
              <input
                type="email"
                placeholder="Email (optionnel)"
                value={customerInfo.email}
                onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                className="input-field"
              />
              {orderType === 'delivery' && (
                <textarea
                  placeholder="Adresse de livraison *"
                  value={customerInfo.address || ''}
                  onChange={(e) => handleCustomerInfoChange('address', e.target.value)}
                  className="input-field min-h-[80px] resize-none"
                  required
                />
              )}
              {orderType === 'dine-in' && (
                <input
                  type="datetime-local"
                  value={customerInfo.dineInTime ? customerInfo.dineInTime.toISOString().slice(0, 16) : ''}
                  onChange={(e) => handleCustomerInfoChange('dineInTime', e.target.value ? new Date(e.target.value).toISOString() : '')}
                  className="input-field"
                />
              )}
            </div>
          </div>

          {/* Articles du panier */}
          <div className="card p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Votre commande</h3>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {formatPrice(item.product.price)} × {item.quantity}
                    </p>
                    {item.notes && (
                      <p className="text-xs text-gray-400 mt-1">
                        Note: {item.notes}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium text-gray-900 min-w-[20px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes de commande */}
          <div className="card p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Notes pour la commande</h3>
            <textarea
              placeholder="Ex: Shawarma sans piment, Burger sans laitue, Pizza bien cuite..."
              value={orderNotes}
              onChange={(e) => handleOrderNotesChange(e.target.value)}
              className="input-field min-h-[80px] resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              Ajoutez vos préférences ou demandes spéciales pour votre commande
            </p>
          </div>

          {/* Résumé de la commande */}
          <div className="card p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Résumé</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total</span>
                <span>{formatPrice(getSubtotal())}</span>
              </div>
              {getDeliveryFee() > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Frais de livraison</span>
                  <span>{formatPrice(getDeliveryFee())}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="space-y-3">
            <button
              onClick={handleCheckout}
              className="btn-primary w-full"
            >
              Passer la commande
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn-secondary w-full"
            >
              Continuer mes achats
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
