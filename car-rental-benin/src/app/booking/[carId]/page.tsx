'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Calendar, CreditCard, Smartphone, Upload, CheckCircle } from 'lucide-react'
import { Car as CarType } from '@/types'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import PaymentProofForm from '@/components/PaymentProofForm'

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [car, setCar] = useState<CarType | null>(null)
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const [showPaymentInstructions, setShowPaymentInstructions] = useState(false)
  const [bookingId, setBookingId] = useState<string | null>(null)

  useEffect(() => {
    if (params.carId) {
      fetchCar(params.carId as string)
    }
  }, [params.carId])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=' + encodeURIComponent(window.location.pathname))
    }
  }, [status, router])

  useEffect(() => {
    if (startDate && endDate && car) {
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      setTotalPrice(days * car.pricePerDay)
    }
  }, [startDate, endDate, car])

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

  const handleBooking = async () => {
    if (!startDate || !endDate || !car) return

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carId: car.id,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          totalPrice
        })
      })

      if (response.ok) {
        const data = await response.json()
        setBookingId(data.id)
        setShowPaymentInstructions(true)
      } else {
        throw new Error('Erreur lors de la création de la réservation')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la création de la réservation')
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Voiture non trouvée
          </h2>
        </div>
      </div>
    )
  }

  if (showPaymentInstructions) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Réservation créée avec succès !
              </h1>
              <p className="text-gray-600">
                Votre réservation a été enregistrée. Veuillez effectuer le paiement pour la confirmer.
              </p>
            </div>

            {/* Réservation Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Résumé de votre réservation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Véhicule</p>
                  <p className="font-semibold">{car.title}</p>
                </div>
                <div>
                  <p className="text-gray-600">Période</p>
                  <p className="font-semibold">
                    {startDate?.toLocaleDateString('fr-FR')} - {endDate?.toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Prix total</p>
                  <p className="font-semibold text-2xl text-blue-600">
                    {totalPrice.toLocaleString('fr-FR')} XOF
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Numéro de réservation</p>
                  <p className="font-semibold font-mono">{bookingId}</p>
                </div>
              </div>
            </div>

            {/* Mobile Money Instructions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Paiement Mobile Money
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* MTN MoMo */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-800">MTN MoMo</h3>
                      <p className="text-yellow-600 text-sm">Paiement rapide et sécurisé</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-600">Numéro MTN MoMo</p>
                      <p className="font-mono font-semibold text-lg">+229 XX XX XX XX</p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-600">Montant à envoyer</p>
                      <p className="font-semibold text-lg text-yellow-800">
                        {totalPrice.toLocaleString('fr-FR')} XOF
                      </p>
                    </div>
                  </div>
                </div>

                {/* Moov Money */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-800">Moov Money</h3>
                      <p className="text-blue-600 text-sm">Alternative de paiement</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-600">Numéro Moov Money</p>
                      <p className="font-mono font-semibold text-lg">+229 YY YY YY YY</p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-600">Montant à envoyer</p>
                      <p className="font-semibold text-lg text-blue-800">
                        {totalPrice.toLocaleString('fr-FR')} XOF
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Instructions de paiement :</h3>
                <ol className="list-decimal list-inside space-y-1 text-blue-700 text-sm">
                  <li>Choisissez votre opérateur Mobile Money préféré</li>
                  <li>Envoyez le montant exact à l'un des numéros ci-dessus</li>
                  <li>Conservez le reçu de transaction ou la capture d'écran</li>
                  <li>Uploadez la preuve de paiement ci-dessous</li>
                  <li>Votre réservation sera confirmée après validation</li>
                </ol>
              </div>
            </div>

            {/* Payment Proof Form */}
            {bookingId && (
              <PaymentProofForm 
                bookingId={bookingId} 
                totalPrice={totalPrice}
                onSuccess={() => {
                  alert('Preuve de paiement envoyée avec succès ! Votre réservation sera validée sous 24h.')
                  router.push('/dashboard')
                }}
              />
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Réserver votre véhicule
          </h1>

          {/* Car Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Véhicule sélectionné</h2>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                {car.images.length > 0 ? (
                  <img 
                    src={car.images[0]} 
                    alt={car.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-400">Image</span>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{car.title}</h3>
                <p className="text-gray-600">{car.description}</p>
                <p className="text-blue-600 font-semibold">
                  {car.pricePerDay.toLocaleString('fr-FR')} XOF/jour
                </p>
              </div>
            </div>
          </div>

          {/* Date Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Sélectionnez vos dates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de début
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  minDate={new Date()}
                  placeholderText="Sélectionnez la date de début"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de fin
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  minDate={startDate || new Date()}
                  placeholderText="Sélectionnez la date de fin"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
          </div>

          {/* Price Calculation */}
          {startDate && endDate && (
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Calcul du prix</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Prix par jour :</span>
                  <span>{car.pricePerDay.toLocaleString('fr-FR')} XOF</span>
                </div>
                <div className="flex justify-between">
                  <span>Nombre de jours :</span>
                  <span>{Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} jours</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Prix total :</span>
                  <span className="text-blue-600">{totalPrice.toLocaleString('fr-FR')} XOF</span>
                </div>
              </div>
            </div>
          )}

          {/* Booking Button */}
          <div className="text-center">
            <button
              onClick={handleBooking}
              disabled={!startDate || !endDate}
              className={`px-8 py-4 text-lg font-semibold rounded-lg transition-colors ${
                startDate && endDate
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Créer la réservation
            </button>
          </div>

          {/* Terms */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              En créant cette réservation, vous acceptez nos{' '}
              <a href="/terms" className="text-blue-600 hover:underline">
                conditions générales
              </a>{' '}
              et notre{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">
                politique de confidentialité
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}