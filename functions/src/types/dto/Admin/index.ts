export interface CreateAdminDto {
  role: string
  email: string
  password: string
  firstName: string
  lastName: string
  jobTitle?: string
  phoneNumber?: string
  permissions?: string[]
}

export interface UpdateAdminDto {
  id: string
  role: string
  email: string
  firstName: string
  lastName: string
  phoneNumber?: string
}
