import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Smartphone, Banknote } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { formatPrice, generateOrderId } from '../utils/helpers'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { 
    items, 
    orderType, 
    orderNotes,
    customerInfo,
    getSubtotal,
    getDeliveryFee,
    getTotal,
    clearCart
  } = useCartStore()
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile' | 'cash'>('card')
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    
    try {
      // Simuler le traitement du paiement
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const orderId = generateOrderId()
      
      // Vider le panier
      clearCart()
      
      // Rediriger vers la confirmation
      navigate(`/order-confirmation?orderId=${orderId}`)
      
      toast.success('Commande confirmée !')
    } catch (error) {
      toast.error('Erreur lors du paiement')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="container-padding section-padding">
        <div className="space-y-6">
          {/* Résumé de la commande */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Résumé de votre commande
            </h2>
            
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {item.product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Quantité: {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="font-medium text-gray-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Notes de commande */}
            {orderNotes && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Notes pour la commande :</h4>
                <p className="text-sm text-gray-600">{orderNotes}</p>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4 mt-4">
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
                  <div className="flex justify-between font-semibold text-gray-900 text-lg">
                    <span>Total</span>
                    <span>{formatPrice(getTotal())}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informations de livraison */}
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Informations de {orderType === 'delivery' ? 'livraison' : orderType === 'dine-in' ? 'réservation' : 'retrait'}
            </h3>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-700">Nom:</span>
                <span className="ml-2 text-gray-900">{customerInfo.name}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Téléphone:</span>
                <span className="ml-2 text-gray-900">{customerInfo.phone}</span>
              </div>
              {customerInfo.email && (
                <div>
                  <span className="text-sm font-medium text-gray-700">Email:</span>
                  <span className="ml-2 text-gray-900">{customerInfo.email}</span>
                </div>
              )}
              {customerInfo.address && (
                <div>
                  <span className="text-sm font-medium text-gray-700">Adresse:</span>
                  <span className="ml-2 text-gray-900">{customerInfo.address}</span>
                </div>
              )}
              {customerInfo.dineInTime && (
                <div>
                  <span className="text-sm font-medium text-gray-700">Heure:</span>
                  <span className="ml-2 text-gray-900">
                    {new Date(customerInfo.dineInTime).toLocaleString('fr-FR')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Méthode de paiement */}
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Méthode de paiement
            </h3>
            
            <div className="space-y-3">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-4 rounded-lg border-2 transition-colors duration-200 ${
                  paymentMethod === 'card'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-6 h-6 text-primary-500" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Carte bancaire</div>
                    <div className="text-sm text-gray-500">Visa, Mastercard, Amex</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('mobile')}
                className={`w-full p-4 rounded-lg border-2 transition-colors duration-200 ${
                  paymentMethod === 'mobile'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-6 h-6 text-primary-500" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Paiement mobile</div>
                    <div className="text-sm text-gray-500">Orange Money, MTN Money</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('cash')}
                className={`w-full p-4 rounded-lg border-2 transition-colors duration-200 ${
                  paymentMethod === 'cash'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Banknote className="w-6 h-6 text-primary-500" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Espèces</div>
                    <div className="text-sm text-gray-500">Paiement à la réception</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Bouton de paiement */}
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="btn-primary w-full"
          >
            {isProcessing ? 'Traitement...' : `Payer ${formatPrice(getTotal())}`}
          </button>
        </div>
      </div>
    </div>
  )
}
