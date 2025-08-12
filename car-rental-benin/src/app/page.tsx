'use client'

import { useState, useEffect } from 'react'
import { Search, Calendar, MapPin, Car, Filter } from 'lucide-react'
import { Car as CarType } from '@/types'
import CarCard from '@/components/CarCard'
import SearchForm from '@/components/SearchForm'

export default function HomePage() {
  const [cars, setCars] = useState<CarType[]>([])
  const [filteredCars, setFilteredCars] = useState<CarType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const response = await fetch('/api/cars')
      const data = await response.json()
      setCars(data)
      setFilteredCars(data)
    } catch (error) {
      console.error('Erreur lors du chargement des voitures:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (filters: any) => {
    let filtered = cars

    if (filters.city) {
      filtered = filtered.filter(car => 
        car.title.toLowerCase().includes(filters.city.toLowerCase()) ||
        car.description.toLowerCase().includes(filters.city.toLowerCase())
      )
    }

    if (filters.startDate && filters.endDate) {
      // Logique de filtrage par dates (à implémenter selon la disponibilité)
    }

    if (filters.minPrice) {
      filtered = filtered.filter(car => car.pricePerDay >= filters.minPrice)
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(car => car.pricePerDay <= filters.maxPrice)
    }

    setFilteredCars(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Location de Voitures au Bénin
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Trouvez la voiture parfaite pour vos déplacements au Bénin
            </p>
            <div className="flex items-center justify-center space-x-4 text-blue-200">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Partout au Bénin</span>
              </div>
              <div className="flex items-center">
                <Car className="w-5 h-5 mr-2" />
                <span>Large gamme de véhicules</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>Réservation flexible</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>

      {/* Cars Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Véhicules disponibles
          </h2>
          <div className="flex items-center space-x-2 text-gray-600">
            <Filter className="w-5 h-5" />
            <span>{filteredCars.length} véhicules trouvés</span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-300 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 h-4 rounded mb-2 w-3/4"></div>
                <div className="bg-gray-300 h-6 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Aucun véhicule trouvé
            </h3>
            <p className="text-gray-500">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pourquoi choisir Car Rental Bénin ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Large gamme de véhicules</h3>
              <p className="text-gray-600">
                Des berlines aux 4x4, nous avons le véhicule qu'il vous faut
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Réservation simple</h3>
              <p className="text-gray-600">
                Réservez en quelques clics, paiement Mobile Money sécurisé
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Service partout au Bénin</h3>
              <p className="text-gray-600">
                Présents dans toutes les grandes villes du Bénin
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
