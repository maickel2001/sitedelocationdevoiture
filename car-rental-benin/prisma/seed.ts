import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Début du seeding...')

  // Créer des utilisateurs de test
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@carrentalbenin.com' },
    update: {},
    create: {
      email: 'admin@carrentalbenin.com',
      name: 'Administrateur',
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  })

  const testUser = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      name: 'Utilisateur Test',
      role: 'USER',
      emailVerified: new Date(),
    },
  })

  console.log('✅ Utilisateurs créés')

  // Créer des voitures de test
  const cars = await Promise.all([
    prisma.car.upsert({
      where: { id: 'car-1' },
      update: {},
      create: {
        id: 'car-1',
        title: 'Toyota Corolla 2023',
        description: 'Berline confortable et économique, parfaite pour les déplacements urbains et interurbains. Équipée de la climatisation, GPS et Bluetooth.',
        pricePerDay: 25000,
        images: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800,https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
        isAvailable: true,
      },
    }),
    prisma.car.upsert({
      where: { id: 'car-2' },
      update: {},
      create: {
        id: 'car-2',
        title: 'Toyota Land Cruiser 4x4',
        description: '4x4 robuste et luxueux, idéal pour les voyages en famille et les terrains difficiles. Équipé de 7 places et de toutes les options de confort.',
        pricePerDay: 45000,
        images: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800,https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        isAvailable: true,
      },
    }),
    prisma.car.upsert({
      where: { id: 'car-3' },
      update: {},
      create: {
        id: 'car-3',
        title: 'Honda Civic 2022',
        description: 'Berline sportive et moderne avec un design élégant. Parfaite pour les conducteurs qui recherchent style et performance.',
        pricePerDay: 30000,
        images: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800,https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
        isAvailable: true,
      },
    }),
    prisma.car.upsert({
      where: { id: 'car-4' },
      update: {},
      create: {
        id: 'car-4',
        title: 'Nissan X-Trail SUV',
        description: 'SUV familial spacieux et confortable. Idéal pour les voyages en groupe avec beaucoup de bagages.',
        pricePerDay: 35000,
        images: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800,https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        isAvailable: true,
      },
    }),
    prisma.car.upsert({
      where: { id: 'car-5' },
      update: {},
      create: {
        id: 'car-5',
        title: 'Mercedes Classe C',
        description: 'Berline de luxe offrant le meilleur en termes de confort et de technologie. Parfaite pour les occasions spéciales.',
        pricePerDay: 60000,
        images: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800,https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
        isAvailable: true,
      },
    }),
  ])

  console.log('✅ Voitures créées')

  // Créer une réservation de test
  const testBooking = await prisma.booking.create({
    data: {
      userId: testUser.id,
      carId: cars[0].id,
      startDate: new Date('2024-12-25'),
      endDate: new Date('2024-12-28'),
      totalPrice: 75000,
      status: 'PENDING',
    },
  })

  console.log('✅ Réservation de test créée')

  // Créer une preuve de paiement de test
  const testPaymentProof = await prisma.paymentProof.create({
    data: {
      bookingId: testBooking.id,
      operator: 'MTN_MOMO',
      amount: 75000,
      transactionNumber: 'TX123456789',
      proofUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      status: 'PENDING',
    },
  })

  console.log('✅ Preuve de paiement de test créée')

  console.log('🎉 Seeding terminé avec succès!')
  console.log('👤 Admin:', adminUser.email)
  console.log('👤 Utilisateur:', testUser.email)
  console.log('🚗 Voitures créées:', cars.length)
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })