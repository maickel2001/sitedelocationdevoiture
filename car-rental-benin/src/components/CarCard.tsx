'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Car, Calendar, MapPin, Star, Users } from 'lucide-react'
import { Car as CarType } from '@/types'
import Link from 'next/link'

interface CarCardProps {
  car: CarType
}

export default function CarCard({ car }: CarCardProps) {
  const [imageIndex, setImageIndex] = useState(0)

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % car.images.length)
  }

  const prevImage = () => {
    setImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Gallery */}
      <div className="relative h-48 bg-gray-200">
        {car.images.length > 0 ? (
          <>
            <Image
              src={car.images[imageIndex]}
              alt={car.title}
              fill
              className="object-cover"
            />
            
            {/* Navigation arrows */}
            {car.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  →
                </button>
                
                {/* Image indicators */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {car.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === imageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <Car className="w-16 h-16" />
          </div>
        )}
        
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {car.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {car.description}
        </p>

        {/* Features */}
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>5 places</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            <span>Cotonou</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-blue-600">
              {car.pricePerDay.toLocaleString('fr-FR')}
            </span>
            <span className="text-gray-500 text-sm"> XOF/jour</span>
          </div>
          
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm text-gray-600">4.8</span>
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
  )
}