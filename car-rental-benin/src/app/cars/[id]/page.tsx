'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Car, Calendar, MapPin, Star, Users, Fuel, Gear, Shield } from 'lucide-react'
import { Car as CarType } from '@/types'
import Link from 'next/link'

export default function CarDetailPage() {
  const params = useParams()
  const [car, setCar] = useState<CarType | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    if (params.id) {
      fetchCar(params.id as string)
    }
  }, [params.id])

  const fetchCar = async (id: string) => {
    try {
      const response = await fetch(`/api/cars/${id}`)
      const data = await response.json()
      setCar(data)
    } catch (error) {
      console.error('Erreur lors du chargement de la voiture:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Voiture non trouvée
          </h2>
          <Link
            href="/"
            className="text-blue-600 hover:underline"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/cars" className="hover:text-blue-600">
                Voitures
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{car.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
              {car.images.length > 0 ? (
                <Image
                  src={car.images[selectedImage]}
                  alt={car.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <Car className="w-24 h-24" />
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {car.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 bg-gray-200 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${car.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Car Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {car.title}
              </h1>
              <p className="text-gray-600 text-lg">
                {car.description}
              </p>
            </div>

            {/* Price */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Prix par jour</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {car.pricePerDay.toLocaleString('fr-FR')} XOF
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">4.8</span>
                  </div>
                  <p className="text-sm text-gray-600">Excellent</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">5 places</span>
              </div>
              <div className="flex items-center space-x-3">
                <Fuel className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">Essence</span>
              </div>
              <div className="flex items-center space-x-3">
                <Gear className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">Manuelle</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">Assurée</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-3 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>Disponible à Cotonou, Bénin</span>
            </div>

            {/* Status */}
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                car.isAvailable 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {car.isAvailable ? '✓ Disponible' : '✗ Indisponible'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {car.isAvailable ? (
                <Link
                  href={`/booking/${car.id}`}
                  className="w-full bg-green-600 text-white text-center py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
                >
                  Réserver maintenant
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-400 text-white text-center py-3 px-6 rounded-lg font-semibold text-lg cursor-not-allowed"
                >
                  Indisponible
                </button>
              )}
              
              <Link
                href="/"
                className="w-full bg-gray-100 text-gray-700 text-center py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
              >
                Voir d'autres voitures
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Informations complémentaires
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Conditions de location</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Permis de conduire valide requis</li>
                <li>• Âge minimum : 21 ans</li>
                <li>• Caution : 50 000 XOF</li>
                <li>• Kilométrage illimité inclus</li>
                <li>• Assurance tous risques incluse</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Inclus dans le prix</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Assurance tous risques</li>
                <li>• Assistance 24h/24</li>
                <li>• Kilométrage illimité</li>
                <li>• Nettoyage du véhicule</li>
                <li>• Support client multilingue</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}