import { FirebaseError } from '@vgl/types'

const getErrorMessage = (error: FirebaseError | string): string => {
  const errorCode =
    typeof error === 'string' ? error : error.code || error.message || ''

  switch (errorCode) {
    case 'auth/user-not-found':
      return 'This email is not registered!'
    case 'auth/user-disabled':
      return 'Your account has been disabled by admin!'
    case 'auth/invalid-email':
      return 'That email address is invalid!'
    case 'auth/wrong-password':
      return 'Invalid Password'
    case 'auth/too-many-requests':
      return 'Access to this account has been temporarily disabled due to too many requests. Please try again later.'
    case 'auth/network-request-failed':
      return 'Network error: Please check your internet connection!'
    case 'auth/internal-error':
      return 'An internal error has occurred, please try again!'
    case 'auth/email-already-in-use':
      return 'Email is already in use!'
    case 'auth/invalid-credential':
      return 'Your email address and password did not match. Please check your credentials and try again!'
    case 'auth/not-admin':
      return 'You are not an admin user!'
    case 'permission-error':
      return 'You don`t have permission to delete Administrator!'
    case 'auth/invalid-phone-number':
      return 'Mobile number wasn’t entered properly. Please try again'
    default:
      return 'An unexpected error occurred.'
  }
}

export default getErrorMessage
