import { AuthService } from './auth.service'
import { AdminService } from './admin.services'

const Api = {
  auth: {
    login: AuthService.login,
    sendOtp: AuthService.sendOtp,
    verifyOtp: AuthService.verifyOtp,
    update2FA: AuthService.update2FA,
    forgotPassword: AuthService.forgotPassword,
    getUserProfile: AuthService.getCurrentUser,
    confirmPasswordReset: AuthService.confirmPasswordReset,
  },
  admin: {
    getAdmin: AdminService.getAdmin,
    getAdmins: AdminService.getAdmins,
    deleteAdmin: AdminService.deleteAdmin,
    createAdmin: AdminService.createAdmin,
    updateAdmin: AdminService.updateAdmin,
    filterAdmins: AdminService.filterAdmins,
    getInActiveAdmins: AdminService.getInActiveAdmins,
    updateAdminViaCloudFunction: AdminService.updateAdminViaCloudFunction,
  },
}
export { Api }
