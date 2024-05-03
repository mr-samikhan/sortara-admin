import { AuthService } from './auth.service'
import { AdminService } from './admin.services'

const Api = {
  auth: {
    login: AuthService.login,
    sendOtp: AuthService.sendOtp,
    verifyOtp: AuthService.verifyOtp,
    getUserProfile: AuthService.checkAdminStatus,
  },
  admin: {
    updateAdmin: AdminService.updateAdmin,
  },
}
export { Api }
