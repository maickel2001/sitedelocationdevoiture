'use client'

import { useState } from 'react'
import { Search, Calendar, MapPin, Car, Filter } from 'lucide-react'
import Link from 'next/link'

// Données de test simples
const cars = [
  {
    id: '1',
    title: 'Toyota Corolla 2023',
    description: 'Berline confortable et économique, parfaite pour les déplacements urbains et interurbains.',
    pricePerDay: 25000,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
    isAvailable: true
  },
  {
    id: '2',
    title: 'Toyota Land Cruiser 4x4',
    description: '4x4 robuste et luxueux, idéal pour les voyages en famille et les terrains difficiles.',
    pricePerDay: 45000,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
    isAvailable: true
  },
  {
    id: '3',
    title: 'Honda Civic 2022',
    description: 'Berline sportive et moderne avec un design élégant. Parfaite pour les conducteurs qui recherchent style et performance.',
    pricePerDay: 30000,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    isAvailable: true
  },
  {
    id: '4',
    title: 'Nissan X-Trail SUV',
    description: 'SUV familial spacieux et confortable. Idéal pour les voyages en groupe avec beaucoup de bagages.',
    pricePerDay: 35000,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
    isAvailable: true
  },
  {
    id: '5',
    title: 'Mercedes Classe C',
    description: 'Berline de luxe offrant le meilleur en termes de confort et de technologie. Parfaite pour les occasions spéciales.',
    pricePerDay: 60000,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    isAvailable: true
  },
  {
    id: '6',
    title: 'Peugeot 208',
    description: 'Citadine moderne et économique, parfaite pour la ville. Consommation réduite et facilité de conduite.',
    pricePerDay: 20000,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
    isAvailable: true
  }
]

export default function HomePage() {
  const [filteredCars, setFilteredCars] = useState(cars)
  const [filters, setFilters] = useState({
    city: '',
    carType: '',
    minPrice: '',
    maxPrice: ''
  })

  const handleSearch = () => {
    let filtered = cars

    if (filters.city) {
      filtered = filtered.filter(car => 
        car.title.toLowerCase().includes(filters.city.toLowerCase()) ||
        car.description.toLowerCase().includes(filters.city.toLowerCase())
      )
    }

    if (filters.carType) {
      filtered = filtered.filter(car => 
        car.title.toLowerCase().includes(filters.carType.toLowerCase())
      )
    }

    if (filters.minPrice) {
      filtered = filtered.filter(car => car.pricePerDay >= parseInt(filters.minPrice))
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(car => car.pricePerDay <= parseInt(filters.maxPrice))
    }

    setFilteredCars(filtered)
  }

  const clearFilters = () => {
    setFilters({
      city: '',
      carType: '',
      minPrice: '',
      maxPrice: ''
    })
    setFilteredCars(cars)
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
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Ville */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Ville de départ"
                  value={filters.city}
                  onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Type de voiture */}
              <div className="relative">
                <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filters.carType}
                  onChange={(e) => setFilters(prev => ({ ...prev, carType: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Tous types</option>
                  <option value="berline">Berline</option>
                  <option value="suv">SUV</option>
                  <option value="4x4">4x4</option>
                  <option value="utilitaire">Utilitaire</option>
                  <option value="luxe">Voiture de luxe</option>
                </select>
              </div>

              {/* Prix minimum */}
              <div>
                <input
                  type="number"
                  placeholder="Prix min (XOF)"
                  value={filters.minPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Prix maximum */}
              <div>
                <input
                  type="number"
                  placeholder="Prix max (XOF)"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleSearch}
                className="flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Search className="w-5 h-5 mr-2" />
                Rechercher
              </button>
              <button
                onClick={clearFilters}
                className="flex items-center justify-center px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-5 h-5 mr-2" />
                Effacer les filtres
              </button>
            </div>
          </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Image */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Status badge */}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    car.isAvailable 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {car.isAvailable ? 'Disponible' : 'Indisponible'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {car.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {car.description}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">
                      {car.pricePerDay.toLocaleString('fr-FR')}
                    </span>
                    <span className="text-gray-500 text-sm"> XOF/jour</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-2">
                  <Link
                    href={`/cars/${car.id}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Voir détails
                  </Link>
                  
                  {car.isAvailable && (
                    <Link
                      href={`/booking/${car.id}`}
                      className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Réserver
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
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
