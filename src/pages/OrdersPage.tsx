import { useState } from 'react'
import { Clock, CheckCircle, XCircle } from 'lucide-react'
import { formatPrice, formatDate } from '../utils/helpers'

// Données de démonstration
const mockOrders = [
  {
    id: 'MON-123456',
    status: 'delivered' as const,
    total: 24.99,
    orderTime: new Date('2024-01-15T19:30:00'),
    items: [
      { name: 'Shawarma de Poulet', quantity: 2, price: 7.99 },
      { name: 'Salade Verte', quantity: 1, price: 9.99 },
    ]
  },
  {
    id: 'MON-123457',
    status: 'preparing' as const,
    total: 18.50,
    orderTime: new Date('2024-01-16T12:15:00'),
    items: [
      { name: 'Burger Classique', quantity: 1, price: 11.99 },
      { name: 'Jus de Bissap', quantity: 2, price: 3.99 },
    ]
  }
]

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'preparing':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Livré'
      case 'preparing':
        return 'En préparation'
      case 'cancelled':
        return 'Annulé'
      default:
        return 'En cours'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="container-padding section-padding">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Mes commandes
            </h1>
            <p className="text-gray-600">
              Suivez l'état de vos commandes
            </p>
          </div>

          {mockOrders.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Aucune commande
              </h2>
              <p className="text-gray-500">
                Vous n'avez pas encore passé de commande
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Commande #{order.id}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(order.orderTime)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        {formatPrice(order.total)}
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        {getStatusIcon(order.status)}
                        <span className="text-gray-600">
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {order.status === 'preparing' && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Temps estimé: 15-25 min
                        </span>
                        <button className="text-sm text-primary-500 font-medium">
                          Suivre la commande
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
