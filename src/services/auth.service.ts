import { ICurrentUser } from '@vgl/types'
import { getErrorMessage } from '@vgl/constants'
import {
  auth,
  where,
  query,
  getDocs,
  firestore,
  collection,
  signInWithEmailAndPassword,
} from '@vgl/firebase'

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
    const q = query(collection(firestore, 'admins'), where('uid', '==', uid))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      throw new Error('auth/not-admin')
    } else {
      return querySnapshot.docs[0].data() as ICurrentUser
    }
  }
}

const AuthService = new Auth()

export { AuthService }
