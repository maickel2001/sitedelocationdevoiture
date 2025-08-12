import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const car = await prisma.car.findUnique({
      where: {
        id: params.id
      }
    })

    if (!car) {
      return NextResponse.json(
        { error: 'Voiture non trouvée' },
        { status: 404 }
      )
    }

    return NextResponse.json(car)
  } catch (error) {
    console.error('Erreur lors de la récupération de la voiture:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, description, pricePerDay, images, isAvailable } = body

    const car = await prisma.car.update({
      where: {
        id: params.id
      },
      data: {
        title,
        description,
        pricePerDay: parseFloat(pricePerDay),
        images,
        isAvailable
      }
    })

    return NextResponse.json(car)
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la voiture:', error)
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
    await prisma.car.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({ message: 'Voiture supprimée avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression de la voiture:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}