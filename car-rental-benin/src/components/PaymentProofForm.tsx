'use client'

import { useState } from 'react'
import { Upload, Smartphone, FileText, CheckCircle, AlertCircle } from 'lucide-react'

interface PaymentProofFormProps {
  bookingId: string
  totalPrice: number
  onSuccess: () => void
}

export default function PaymentProofForm({ bookingId, totalPrice, onSuccess }: PaymentProofFormProps) {
  const [formData, setFormData] = useState({
    operator: 'MTN_MOMO' as 'MTN_MOMO' | 'MOOV_MONEY',
    amount: totalPrice,
    transactionNumber: '',
    proofFile: null as File | null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validation de la taille (5 Mo max)
      if (file.size > 5 * 1024 * 1024) {
        setError('Le fichier est trop volumineux. Taille maximum : 5 Mo')
        return
      }

      // Validation du type MIME
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
      if (!allowedTypes.includes(file.type)) {
        setError('Type de fichier non autorisé. Formats acceptés : JPG, JPEG, PNG, PDF')
        return
      }

      setFormData(prev => ({
        ...prev,
        proofFile: file
      }))
      setError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.proofFile) {
      setError('Veuillez sélectionner un fichier de preuve de paiement')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Création du FormData pour l'upload
      const submitData = new FormData()
      submitData.append('operator', formData.operator)
      submitData.append('amount', formData.amount.toString())
      submitData.append('transactionNumber', formData.transactionNumber)
      submitData.append('proofFile', formData.proofFile)
      submitData.append('bookingId', bookingId)

      const response = await fetch('/api/payment-proofs', {
        method: 'POST',
        body: submitData
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          onSuccess()
        }, 2000)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de l\'envoi de la preuve de paiement')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          Preuve de paiement envoyée !
        </h3>
        <p className="text-green-600">
          Votre preuve de paiement a été reçue et sera traitée sous 24h.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
        Envoyer la preuve de paiement
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Opérateur Mobile Money */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Opérateur Mobile Money utilisé
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
              <input
                type="radio"
                name="operator"
                value="MTN_MOMO"
                checked={formData.operator === 'MTN_MOMO'}
                onChange={(e) => handleInputChange('operator', e.target.value)}
                className="mr-3"
              />
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                  <Smartphone className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">MTN MoMo</span>
              </div>
            </label>
            
            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
              <input
                type="radio"
                name="operator"
                value="MOOV_MONEY"
                checked={formData.operator === 'MOOV_MONEY'}
                onChange={(e) => handleInputChange('operator', e.target.value)}
                className="mr-3"
              />
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <Smartphone className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">Moov Money</span>
              </div>
            </label>
          </div>
        </div>

        {/* Montant */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Montant envoyé (XOF)
          </label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => handleInputChange('amount', parseFloat(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Montant en XOF"
            required
          />
        </div>

        {/* Numéro de transaction (optionnel) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Numéro de transaction (optionnel)
          </label>
          <input
            type="text"
            value={formData.transactionNumber}
            onChange={(e) => handleInputChange('transactionNumber', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: TX123456789"
          />
          <p className="text-sm text-gray-500 mt-1">
            Ce numéro peut être trouvé sur le reçu de votre transaction Mobile Money
          </p>
        </div>

        {/* Upload de la preuve */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preuve de paiement *
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
              className="hidden"
              id="proofFile"
              required
            />
            <label htmlFor="proofFile" className="cursor-pointer">
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Cliquez pour sélectionner un fichier
                  </p>
                  <p className="text-sm text-gray-500">
                    ou glissez-déposez votre fichier ici
                  </p>
                </div>
                <div className="text-xs text-gray-500">
                  <p>Formats acceptés : JPG, JPEG, PNG, PDF</p>
                  <p>Taille maximum : 5 Mo</p>
                </div>
              </div>
            </label>
          </div>
          
          {formData.proofFile && (
            <div className="mt-3 flex items-center space-x-2 text-sm text-green-600">
              <FileText className="w-4 h-4" />
              <span>{formData.proofFile.name}</span>
              <span className="text-gray-500">
                ({(formData.proofFile.size / 1024 / 1024).toFixed(2)} Mo)
              </span>
            </div>
          )}
        </div>

        {/* Bouton de soumission */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading || !formData.proofFile}
            className={`px-8 py-3 text-lg font-semibold rounded-lg transition-colors ${
              loading || !formData.proofFile
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {loading ? 'Envoi en cours...' : 'Envoyer la preuve de paiement'}
          </button>
        </div>

        {/* Informations importantes */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Informations importantes :</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Assurez-vous que le montant correspond exactement au prix de votre réservation</li>
            <li>• La preuve de paiement doit être claire et lisible</li>
            <li>• Votre réservation sera validée sous 24h après vérification</li>
            <li>• En cas de problème, contactez notre support client</li>
          </ul>
        </div>
      </form>
    </div>
  )
}