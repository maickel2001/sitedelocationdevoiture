import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { uploadImage } from '@/lib/cloudinary'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const operator = formData.get('operator') as string
    const amount = formData.get('amount') as string
    const transactionNumber = formData.get('transactionNumber') as string
    const proofFile = formData.get('proofFile') as File
    const bookingId = formData.get('bookingId') as string

    // Validation des données
    if (!operator || !amount || !proofFile || !bookingId) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires sont requis' },
        { status: 400 }
      )
    }

    // Vérifier que la réservation existe et appartient à l'utilisateur
    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        userId: session.user.id,
        status: 'PENDING'
      }
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Réservation non trouvée ou déjà traitée' },
        { status: 404 }
      )
    }

    // Validation du fichier
    if (proofFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Le fichier est trop volumineux. Taille maximum : 5 Mo' },
        { status: 400 }
      )
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    if (!allowedTypes.includes(proofFile.type)) {
      return NextResponse.json(
        { error: 'Type de fichier non autorisé' },
        { status: 400 }
      )
    }

    // Upload vers Cloudinary
    let proofUrl = ''
    try {
      const uploadResult = await uploadImage(proofFile, 'payment-proofs')
      proofUrl = (uploadResult as any).secure_url
    } catch (error) {
      console.error('Erreur upload Cloudinary:', error)
      return NextResponse.json(
        { error: 'Erreur lors de l\'upload du fichier' },
        { status: 500 }
      )
    }

    // Créer la preuve de paiement
    const paymentProof = await prisma.paymentProof.create({
      data: {
        bookingId,
        operator: operator as 'MTN_MOMO' | 'MOOV_MONEY',
        amount: parseFloat(amount),
        transactionNumber: transactionNumber || null,
        proofUrl,
        status: 'PENDING'
      },
      include: {
        booking: {
          include: {
            car: true,
            user: true
          }
        }
      }
    })

    return NextResponse.json(paymentProof, { status: 201 })
  } catch (error) {
    console.error('Erreur lors de la création de la preuve de paiement:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const isAdmin = session.user.role === 'ADMIN'

    let whereClause: any = {}
    
    if (!isAdmin) {
      // Les utilisateurs normaux ne voient que leurs propres preuves
      whereClause.booking = {
        userId: session.user.id
      }
    }
    
    if (status) {
      whereClause.status = status
    }

    const paymentProofs = await prisma.paymentProof.findMany({
      where: whereClause,
      include: {
        booking: {
          include: {
            car: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(paymentProofs)
  } catch (error) {
    console.error('Erreur lors de la récupération des preuves de paiement:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}