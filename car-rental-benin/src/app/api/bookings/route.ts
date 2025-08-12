import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { carId, startDate, endDate, totalPrice } = body

    // Validation des données
    if (!carId || !startDate || !endDate || !totalPrice) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Vérifier que la voiture existe et est disponible
    const car = await prisma.car.findUnique({
      where: { id: carId }
    })

    if (!car) {
      return NextResponse.json(
        { error: 'Voiture non trouvée' },
        { status: 404 }
      )
    }

    if (!car.isAvailable) {
      return NextResponse.json(
        { error: 'Cette voiture n\'est pas disponible' },
        { status: 400 }
      )
    }

    // Vérifier les conflits de dates
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        carId,
        status: {
          in: ['PENDING', 'CONFIRMED']
        },
        OR: [
          {
            startDate: {
              lte: new Date(endDate)
            },
            endDate: {
              gte: new Date(startDate)
            }
          }
        ]
      }
    })

    if (conflictingBooking) {
      return NextResponse.json(
        { error: 'Cette voiture n\'est pas disponible pour les dates sélectionnées' },
        { status: 400 }
      )
    }

    // Créer la réservation
    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        carId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalPrice: parseFloat(totalPrice),
        status: 'PENDING'
      },
      include: {
        car: true,
        user: true
      }
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Erreur lors de la création de la réservation:', error)
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
      whereClause.userId = session.user.id
    }
    
    if (status) {
      whereClause.status = status
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      include: {
        car: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        paymentProofs: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}