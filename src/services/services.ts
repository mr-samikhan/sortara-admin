import { AuthService } from './auth.service'
import { AdsServices } from './ads.services'
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
  ads: {
    getAds: AdsServices.getAds,
    createAd: AdsServices.createAd,
  },
}
export { Api }
