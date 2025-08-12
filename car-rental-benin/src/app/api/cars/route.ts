import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const cars = await prisma.car.findMany({
      where: {
        isAvailable: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(cars)
  } catch (error) {
    console.error('Erreur lors de la récupération des voitures:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, pricePerDay, images } = body

    // Validation des données
    if (!title || !description || !pricePerDay || !images) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    const car = await prisma.car.create({
      data: {
        title,
        description,
        pricePerDay: parseFloat(pricePerDay),
        images,
        isAvailable: true
      }
    })

    return NextResponse.json(car, { status: 201 })
  } catch (error) {
    console.error('Erreur lors de la création de la voiture:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}