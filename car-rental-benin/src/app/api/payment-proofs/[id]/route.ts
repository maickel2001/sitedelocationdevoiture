import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendBookingConfirmation, sendBookingRejection } from '@/lib/email'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Accès non autorisé' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { action, rejectionReason } = body

    if (!action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Action invalide' },
        { status: 400 }
      )
    }

    if (action === 'reject' && !rejectionReason) {
      return NextResponse.json(
        { error: 'Motif de refus requis' },
        { status: 400 }
      )
    }

    // Récupérer la preuve de paiement avec la réservation
    const paymentProof = await prisma.paymentProof.findUnique({
      where: { id: params.id },
      include: {
        booking: {
          include: {
            car: true,
            user: true
          }
        }
      }
    })

    if (!paymentProof) {
      return NextResponse.json(
        { error: 'Preuve de paiement non trouvée' },
        { status: 404 }
      )
    }

    if (paymentProof.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Cette preuve de paiement a déjà été traitée' },
        { status: 400 }
      )
    }

    // Traitement de la transaction
    const result = await prisma.$transaction(async (tx) => {
      // Mettre à jour le statut de la preuve de paiement
      const updatedPaymentProof = await tx.paymentProof.update({
        where: { id: params.id },
        data: {
          status: action === 'approve' ? 'APPROVED' : 'REJECTED',
          rejectionReason: action === 'reject' ? rejectionReason : null,
          processedAt: new Date()
        }
      })

      if (action === 'approve') {
        // Confirmer la réservation
        await tx.booking.update({
          where: { id: paymentProof.bookingId },
          data: { status: 'CONFIRMED' }
        })

        // Marquer la voiture comme indisponible pour les dates de la réservation
        // (Cette logique peut être ajustée selon vos besoins)
      } else {
        // Annuler la réservation
        await tx.booking.update({
          where: { id: paymentProof.bookingId },
          data: { status: 'CANCELLED' }
        })
      }

      return updatedPaymentProof
    })

    // Envoyer l'email de confirmation ou de refus
    try {
      if (action === 'approve') {
        await sendBookingConfirmation(
          paymentProof.booking.user.email,
          paymentProof.booking.user.name || 'Client',
          paymentProof.booking.car.title,
          paymentProof.booking.startDate.toLocaleDateString('fr-FR'),
          paymentProof.booking.endDate.toLocaleDateString('fr-FR'),
          paymentProof.booking.totalPrice
        )
      } else {
        await sendBookingRejection(
          paymentProof.booking.user.email,
          paymentProof.booking.user.name || 'Client',
          paymentProof.booking.car.title,
          rejectionReason
        )
      }
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email:', emailError)
      // Ne pas faire échouer la transaction pour une erreur d'email
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Erreur lors du traitement de la preuve de paiement:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Accès non autorisé' },
        { status: 403 }
      )
    }

    // Récupérer la preuve de paiement pour supprimer le fichier Cloudinary
    const paymentProof = await prisma.paymentProof.findUnique({
      where: { id: params.id }
    })

    if (!paymentProof) {
      return NextResponse.json(
        { error: 'Preuve de paiement non trouvée' },
        { status: 404 }
      )
    }

    // Supprimer la preuve de paiement
    await prisma.paymentProof.delete({
      where: { id: params.id }
    })

    // Note: La suppression du fichier Cloudinary peut être gérée par un cron job
    // ou une tâche planifiée pour éviter de bloquer la réponse

    return NextResponse.json({ message: 'Preuve de paiement supprimée avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression de la preuve de paiement:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}