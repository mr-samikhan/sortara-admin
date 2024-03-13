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
