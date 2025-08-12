'use client'

import { useState } from 'react'
import { Search, Calendar, MapPin, Car, Filter } from 'lucide-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

interface SearchFormProps {
  onSearch: (filters: any) => void
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [filters, setFilters] = useState({
    city: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    carType: '',
    minPrice: '',
    maxPrice: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(filters)
  }

  const handleInputChange = (field: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      city: '',
      startDate: null,
      endDate: null,
      carType: '',
      minPrice: '',
      maxPrice: ''
    })
    onSearch({})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Ville */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Ville de départ"
            value={filters.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Date de début */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <DatePicker
            selected={filters.startDate}
            onChange={(date) => handleInputChange('startDate', date)}
            selectsStart
            startDate={filters.startDate}
            endDate={filters.endDate}
            minDate={new Date()}
            placeholderText="Date de début"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dateFormat="dd/MM/yyyy"
          />
        </div>

        {/* Date de fin */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <DatePicker
            selected={filters.endDate}
            onChange={(date) => handleInputChange('endDate', date)}
            selectsEnd
            startDate={filters.startDate}
            endDate={filters.endDate}
            minDate={filters.startDate || new Date()}
            placeholderText="Date de fin"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dateFormat="dd/MM/yyyy"
          />
        </div>

        {/* Type de voiture */}
        <div className="relative">
          <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filters.carType}
            onChange={(e) => handleInputChange('carType', e.target.value)}
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
            onChange={(e) => handleInputChange('minPrice', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Prix maximum */}
        <div>
          <input
            type="number"
            placeholder="Prix max (XOF)"
            value={filters.maxPrice}
            onChange={(e) => handleInputChange('maxPrice', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="submit"
          className="flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Search className="w-5 h-5 mr-2" />
          Rechercher
        </button>
        <button
          type="button"
          onClick={clearFilters}
          className="flex items-center justify-center px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Filter className="w-5 h-5 mr-2" />
          Effacer les filtres
        </button>
      </div>
    </form>
  )
}