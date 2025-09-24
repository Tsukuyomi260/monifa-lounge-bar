import { useSearchParams, useNavigate } from 'react-router-dom'
import { CheckCircle, Clock, MapPin, Phone } from 'lucide-react'
import { formatPrice } from '../utils/helpers'

export default function OrderConfirmationPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const orderId = searchParams.get('orderId') || 'MON-123456'

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="container-padding section-padding">
        <div className="max-w-md mx-auto">
          <div className="text-center space-y-6">
            {/* Icône de succès */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
            </div>

            {/* Message de confirmation */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Commande confirmée !
              </h1>
              <p className="text-gray-600">
                Votre commande a été prise en compte et sera préparée dans les plus brefs délais.
              </p>
            </div>

            {/* Numéro de commande */}
            <div className="card p-6">
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Numéro de commande</div>
                <div className="text-xl font-bold text-gray-900 font-mono">
                  {orderId}
                </div>
              </div>
            </div>

            {/* Informations de suivi */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Prochaines étapes
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-primary-500" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Préparation</div>
                    <div className="text-sm text-gray-500">
                      Temps estimé: 15-25 minutes
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary-500" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Retrait/Livraison</div>
                    <div className="text-sm text-gray-500">
                      Vous serez notifié quand c'est prêt
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Besoin d'aide ?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary-500" />
                  <div>
                    <div className="font-medium text-gray-900">Téléphone</div>
                    <div className="text-sm text-gray-500">+229 67234684</div>
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
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="space-y-3">
              <button
                onClick={() => navigate('/orders')}
                className="btn-primary w-full"
              >
                Voir mes commandes
              </button>
              <button
                onClick={() => navigate('/')}
                className="btn-secondary w-full"
              >
                Commander à nouveau
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
