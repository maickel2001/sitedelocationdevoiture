export interface User {
  id: string
  name: string | null
  email: string
  role: 'USER' | 'ADMIN'
  image: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Car {
  id: string
  title: string
  description: string
  pricePerDay: number
  images: string[]
  isAvailable: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Booking {
  id: string
  userId: string
  carId: string
  startDate: Date
  endDate: Date
  totalPrice: number
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
  createdAt: Date
  updatedAt: Date
  user?: User
  car?: Car
  paymentProofs?: PaymentProof[]
}

export interface PaymentProof {
  id: string
  bookingId: string
  operator: 'MTN_MOMO' | 'MOOV_MONEY'
  amount: number
  transactionNumber?: string
  proofUrl: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  rejectionReason?: string
  submittedAt: Date
  processedAt?: Date
  createdAt: Date
  updatedAt: Date
  booking?: Booking
}

export interface SearchFilters {
  city?: string
  startDate?: string
  endDate?: string
  carType?: string
  minPrice?: number
  maxPrice?: number
}

export interface BookingFormData {
  startDate: string
  endDate: string
  totalPrice: number
}

export interface PaymentFormData {
  operator: 'MTN_MOMO' | 'MOOV_MONEY'
  amount: number
  transactionNumber?: string
  proofFile: File
}

export interface AdminPaymentAction {
  paymentId: string
  action: 'approve' | 'reject'
  rejectionReason?: string
}