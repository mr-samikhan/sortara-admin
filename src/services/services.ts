import { AuthService } from './auth.service'

const Api = {
  auth: {
    login: AuthService.login,
    sendOtp: AuthService.sendOtp,
    verifyOtp: AuthService.verifyOtp,
    getUserProfile: AuthService.checkAdminStatus,
  },
}
export { Api }
