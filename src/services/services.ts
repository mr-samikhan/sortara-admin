import { AuthService } from './auth.service'
import { AdminService } from './admin.services'

const Api = {
  auth: {
    login: AuthService.login,
    sendOtp: AuthService.sendOtp,
    verifyOtp: AuthService.verifyOtp,
    update2FA: AuthService.update2FA,
    forgotPassword: AuthService.forgotPassword,
    getUserProfile: AuthService.checkAdminStatus,
    confirmPasswordReset: AuthService.confirmPasswordReset,
  },
  admin: {
    updateAdmin: AdminService.updateAdmin,
  },
}
export { Api }
