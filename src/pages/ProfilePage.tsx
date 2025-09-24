import { useState } from 'react'
import { User, Mail, Phone, MapPin, Bell, Shield, HelpCircle } from 'lucide-react'

export default function ProfilePage() {
  const [userInfo] = useState({
    name: 'AVOCE Patrick',
    email: 'patrickacv@gmail.com',
    phone: '+229 67234684',
    address: 'Akpakpa von St George'
  })

  const menuItems = [
    {
      icon: User,
      title: 'Informations personnelles',
      description: 'Modifier vos informations',
      action: () => console.log('Edit profile')
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Gérer vos notifications',
      action: () => console.log('Notifications')
    },
    {
      icon: Shield,
      title: 'Confidentialité',
      description: 'Paramètres de confidentialité',
      action: () => console.log('Privacy')
    },
    {
      icon: HelpCircle,
      title: 'Aide & Support',
      description: 'FAQ et contact',
      action: () => console.log('Help')
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="container-padding section-padding">
        <div className="space-y-6">
          {/* Profil utilisateur */}
          <div className="card p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {userInfo.name}
                </h2>
                <p className="text-gray-500">{userInfo.email}</p>
              </div>
            </div>
          </div>

          {/* Informations de contact */}
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Informations de contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-500" />
                <div>
                  <div className="font-medium text-gray-900">Email</div>
                  <div className="text-sm text-gray-500">{userInfo.email}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-500" />
                <div>
                  <div className="font-medium text-gray-900">Téléphone</div>
                  <div className="text-sm text-gray-500">{userInfo.phone}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-500" />
                <div>
                  <div className="font-medium text-gray-900">Adresse</div>
                  <div className="text-sm text-gray-500">{userInfo.address}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Menu des paramètres */}
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Paramètres
            </h3>
            <div className="space-y-3">
              {menuItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <button
                    key={index}
                    onClick={item.action}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Icon className="w-5 h-5 text-primary-500" />
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.description}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Statistiques */}
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Vos statistiques
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">12</div>
                <div className="text-sm text-gray-500">Commandes</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">102 000 FCFA</div>
                <div className="text-sm text-gray-500">Total dépensé</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
