import { ICurrentUser } from '@vgl/types'
import { COLLECTIONS, getErrorMessage } from '@vgl/constants'
import {
  doc,
  auth,
  where,
  query,
  getDocs,
  updateDoc,
  firestore,
  collection,
  signInWithEmailAndPassword,
} from '@vgl/firebase'
import {
  unlink,
  PhoneAuthProvider,
  RecaptchaVerifier,
  linkWithCredential,
  confirmPasswordReset,
  signInWithPhoneNumber,
  sendPasswordResetEmail,
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
      // setClearCaptcha: () => {},
    }
  ) => {
    const { phone, setConfirmationObject } = values as any
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'id', {})
    try {
      const phoneNumberWithCountryCode = '+' + phone
      const appVerifier = recaptchaVerifier

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumberWithCountryCode,
        appVerifier
      )
      setConfirmationObject((prev: any) => ({
        ...prev,
        confirmationObj: confirmationResult,
      }))

      if (recaptchaVerifier) {
        recaptchaVerifier.clear()
      }
      return true
    } catch (error: any) {
      if (recaptchaVerifier) {
        recaptchaVerifier.clear()
      }
      console.log(error, 'error while sending code')
      throw new Error(getErrorMessage(error.code || error.message || error))
    }
  }

  verifyOtp: any = async (
    values: any = { confirmationObject: '', otp: '' }
  ) => {
    const { confirmationObject, otp } = values as any

    const currentUser: any = auth.currentUser

    try {
      const credential = PhoneAuthProvider.credential(
        confirmationObject.verificationId,
        otp.replace(/-/g, '')
      )
      const userCreds = await linkWithCredential(currentUser, credential)
      const adminRef = doc(firestore, COLLECTIONS.ADMIN, userCreds.user.uid)
      await updateDoc(adminRef, {
        isNewUser: false,
        isPhoneVerified: true,
        phoneNumber: userCreds.user.phoneNumber,
      })

      return true
    } catch (error: any) {
      console.log('Error while verifying', error)
      throw new Error(getErrorMessage(error.code || error.message || error))
    }
  }

  forgotPassword = async (email: string) => {
    return new Promise((resolve, reject) => {
      const actionCodeSettings = {
        url: 'https://sortara-admin.web.app',
        continueUrl: 'https://sortara-admin.web.app/reset-password',
        handleCodeInApp: false,
      }
      sendPasswordResetEmail(auth, email, actionCodeSettings)
        .then(() => {
          resolve({ message: 'Email sent successfully' })
        })
        .catch((error) => {
          reject(error.code || error.message)
        })
    })
  }

  confirmPasswordReset = async (values = { oobCode: '', newPassword: '' }) => {
    const { oobCode, newPassword } = values || {}
    return new Promise((resolve, reject) => {
      try {
        if (!oobCode && !newPassword) return
        confirmPasswordReset(auth, oobCode, newPassword).then(() => {
          localStorage.removeItem('oobCode')
          resolve('Password reset successfully.')
        })
      } catch (error) {
        localStorage.removeItem('oobCode')
        reject(error)
      }
    })
  }

  update2FA = async (
    values: object = {
      phone: '',
      currentUser: '',
      setConfirmationObject: () => {},
    }
  ) => {
    let { currentUser } = values as any
    const { phone, setConfirmationObject } = values as any
    try {
      const user = auth.currentUser
      if (user) {
        const result = await unlink(user, 'phone')
        currentUser = { ...currentUser, isPhoneVerified: false }
        console.log('Current User', currentUser)
        //update admin data
        await updateDoc(doc(firestore, COLLECTIONS.ADMIN, user.uid), {
          isPhoneVerified: false,
        })
        console.log('Phone number unlinked', result)
        await this.sendOtp({
          phone: phone,
          setConfirmationObject: setConfirmationObject,
        })
        return true
      }
    } catch (error) {
      console.error('Error unlinking phone number:', error)
      return error
    }
  }
}

const AuthService = new Auth()

export { AuthService }
