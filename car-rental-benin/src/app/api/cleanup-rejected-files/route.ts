import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { deleteImage } from '@/lib/cloudinary'

export async function POST() {
  try {
    // Récupérer les preuves de paiement rejetées depuis plus de 7 jours
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const rejectedPayments = await prisma.paymentProof.findMany({
      where: {
        status: 'REJECTED',
        updatedAt: {
          lt: sevenDaysAgo
        }
      },
      select: {
        id: true,
        proofUrl: true
      }
    })

    if (rejectedPayments.length === 0) {
      return NextResponse.json({ 
        message: 'Aucun fichier à nettoyer',
        count: 0
      })
    }

    let deletedCount = 0
    let errorCount = 0

    // Supprimer les fichiers Cloudinary et les enregistrements de la base
    for (const payment of rejectedPayments) {
      try {
        // Extraire l'ID public de l'URL Cloudinary
        const urlParts = payment.proofUrl.split('/')
        const publicId = urlParts[urlParts.length - 1].split('.')[0]
        const folder = urlParts[urlParts.length - 2]
        const fullPublicId = `${folder}/${publicId}`

        // Supprimer le fichier de Cloudinary
        await deleteImage(fullPublicId)

        // Supprimer l'enregistrement de la base de données
        await prisma.paymentProof.delete({
          where: { id: payment.id }
        })

        deletedCount++
      } catch (error) {
        console.error(`Erreur lors de la suppression du paiement ${payment.id}:`, error)
        errorCount++
      }
    }

    return NextResponse.json({
      message: 'Nettoyage terminé',
      total: rejectedPayments.length,
      deleted: deletedCount,
      errors: errorCount
    })

  } catch (error) {
    console.error('Erreur lors du nettoyage des fichiers rejetés:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}