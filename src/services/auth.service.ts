import { ICurrentUser } from '@vgl/types'
import { COLLECTIONS, getErrorMessage } from '@vgl/constants'
import {
  auth,
  where,
  query,
  getDocs,
  firestore,
  collection,
  signInWithEmailAndPassword,
  doc,
  updateDoc,
} from '@vgl/firebase'
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  linkWithCredential,
  signInWithPhoneNumber,
} from 'firebase/auth'

interface ILogin {
  email: string
  password: string
}

class Auth {
  login = async (data: ILogin) => {
    const { email, password } = data || {}
    try {
      let adminData: ICurrentUser | null = null
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      adminData = await this.checkAdminStatus(user.uid)
      if (!adminData) {
        auth.signOut()
        const error = getErrorMessage('auth/not-admin')
        throw new Error(error)
      } else {
        const userDetails: ICurrentUser = {
          uid: user.uid,
          role: adminData.role,
          email: user.email || '',
          status: adminData.status,
          isNewUser: adminData.isNewUser || false,
          name: `${adminData.firstName} ${adminData.lastName}`,
          isPhoneVerified: adminData.isPhoneVerified || false,
          createdAt:
            (new Date(adminData?.createdAt?.seconds * 1000) as any) || 'N/A',
        }
        return { ...userDetails }
      }
    } catch (error: any) {
      console.log('error while login', error)
      const error_ = getErrorMessage(error.code || error.message || error)
      throw new Error(error_)
    }
  }

  checkAdminStatus = async (uid: string) => {
    const q = query(
      collection(firestore, COLLECTIONS.ADMIN),
      where('uid', '==', uid)
    )
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      throw new Error('auth/not-admin')
    } else {
      return querySnapshot.docs[0].data() as ICurrentUser
    }
  }

  sendOtp = async (
    values: object = {
      phone: '',
      setConfirmationObject: () => {},
      setClearCaptcha: () => {},
    }
  ) => {
    const { phone, setConfirmationObject, setClearCaptcha } = values as any
    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'id', {})
      const phoneNumberWithCountryCode = '+' + phone
      const appVerifier = recaptchaVerifier

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumberWithCountryCode,
        appVerifier
      )
      // console.log('>>>confirmationResult', confirmationResult)
      setConfirmationObject((prev: any) => ({
        ...prev,
        confirmationObj: confirmationResult,
      }))
      if (setClearCaptcha) {
        setClearCaptcha((prev: any) => ({
          ...prev,
          isRecaptcha: true,
        }))
      }
      return true
    } catch (error: any) {
      console.log(error, 'error while sending code')
      throw new Error(getErrorMessage(error.code || error.message || error))
    }
  }

  verifyOtp = async (values: object = { confirmationObject: '', otp: '' }) => {
    const { confirmationObject, otp } = values as any

    const currentUser: any = auth.currentUser

    try {
      const credential = PhoneAuthProvider.credential(
        confirmationObject.verificationId,
        otp.replace(/-/g, '')
      )
      const userCreds = await linkWithCredential(currentUser, credential)
      const adminRef = doc(firestore, COLLECTIONS.ADMIN, userCreds.user.uid)
      await updateDoc(adminRef, { phoneNumber: userCreds.user.phoneNumber })

      return true
    } catch (error: any) {
      console.log('Error while verifying', error)
      throw new Error(getErrorMessage(error.code || error.message || error))
    }
  }
}

const AuthService = new Auth()

export { AuthService }
