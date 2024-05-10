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
  reason?: string
  isNewUser: boolean
  firstName?: string
  lastName?: string
  phoneNumber?: string
  createdAt: ICreatedAt
  isPhoneVerified?: boolean
  isPrivacypolicyAccepted?: boolean
}

export type FirebaseError = {
  code?: string
  message?: string
}

export type ILoginValues = {
  otp: string
  phone: string
  error: string
  isRecaptcha: boolean
  showPassword: boolean
  confirmationObj: object
}
