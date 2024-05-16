import { Timestamp } from 'firebase/firestore'

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
  permissions?: string[]
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

export type ICurrentStatus = {
  date: Timestamp
  status: 'pending' | 'active' | 'inactive'
}

export type IModerators = {
  id: string
  name: string
  role: string
  email: string
  status: string
  title?: string
  jobTitle: string
  lastName: string
  reason?: string
  userImage: string
  firstName: string
  phoneNumber: string
  description?: string
  permissions?: string[]
  activities?: IActivity[]
  currentStatus?: ICurrentStatus
  statusHistory?: ICurrentStatus[]
}

export type IModeratorFormValues = {
  id?: string
  job?: string
  email: string
  phone: string
  jobTitle: string
  lastName: string
  firstName: string
}

export type IModeratorStateValues = {
  filteredData: any
  isAddModal: boolean
  isSnackbar: boolean
  isEditModal: boolean
  isRemoveModal: boolean
  isDetailsModal: boolean
  isConfirmation: boolean
  newModeratorName: string
  isInactiveAdmins: boolean
  selectedItem: IModeratorFormValues | null
}

export type IActivity = {
  id: string
  ref: string
  url: string
  title: string
  activity: string
  collection: string
  description: string
  createdAt: ICreatedAt
}
