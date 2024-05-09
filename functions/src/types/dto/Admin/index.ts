export interface CreateAdminDto {
  role: string
  email: string
  password: string
  userName: string
}

export interface UpdateAdminDto {
  id: string
  role: string
  email: string
  firstName: string
  lastName: string
  phoneNumber?: string
}
