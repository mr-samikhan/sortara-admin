import { AuthService } from './auth.service'
import { AdminService } from './admin.services'

const Api = {
  auth: {
    login: AuthService.login,
    sendOtp: AuthService.sendOtp,
    verifyOtp: AuthService.verifyOtp,
    forgotPassword: AuthService.forgotPassword,
    getUserProfile: AuthService.checkAdminStatus,
    confirmPasswordReset: AuthService.confirmPasswordReset,
  },
  admin: {
    updateAdmin: AdminService.updateAdmin,
  },
}
export { Api }
