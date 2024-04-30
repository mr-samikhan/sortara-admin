import { AuthService } from './auth.service'

const Api = {
  auth: {
    login: AuthService.login,
    getUserProfile: AuthService.checkAdminStatus,
  },
}
export { Api }
