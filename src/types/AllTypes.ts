export type ILoginForm = {
  email: string
  password: string
}

export type IResetForm = {
  password: string
  confirmPassword: string
}

export type IForgotForm = {
  email: string
}

export type ISetup2FA = {
  phoneNumber: string
}

export type FormTypes = ILoginForm | IForgotForm | IResetForm

export type ITableData = {
  id: number
  name: string
  email: string
  role?: string
  status?: string
  createdAt?: string
  subscriptionType?: string
}

export type ICreatedAt = {
  seconds: number
  nanoseconds: number
}

export type ICurrentUser = {
  uid: string
  email: string
  name: string
  role: string
  status: string
  firstName?: string
  lastName?: string
  createdAt: ICreatedAt
  isPhoneVerified?: boolean
}

export type FirebaseError = {
  code?: string
  message?: string
}
