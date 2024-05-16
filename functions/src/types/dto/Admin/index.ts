import { Timestamp } from 'firebase-admin/firestore'

export interface CreateAdminDto {
  role: string
  email: string
  password: string
  firstName: string
  lastName: string
  jobTitle?: string
  phoneNumber?: string
  permissions?: string[]
  currentStatus?: {
    date: Timestamp
    status: 'active' | 'inactive' | 'pending'
  }
  statusHistory?: {
    date: Timestamp
    status: 'active' | 'inactive' | 'pending'
  }[]
}

export interface UpdateAdminDto {
  id: string
  role: string
  email: string
  firstName: string
  lastName: string
  phoneNumber?: string
  permissions?: string[]
  currentStatus?: {
    date: Timestamp
    status: 'active' | 'inactive' | 'pending'
  }
  statusHistory?: {
    date: Timestamp
    status: 'active' | 'inactive' | 'pending'
  }[]
}
