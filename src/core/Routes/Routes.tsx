import React from 'react'
import { ROUTES } from '@vgl/constants'
import { Route, Routes as ReactRoutes } from 'react-router-dom'
import {
  ManageAds,
  ManageAuth,
  ManageUsers,
  ManageProfile,
  ManageAnalytics,
  ManageModerators,
} from '@vgl/screens'
import {
  PrivacyPolicy,
  SingleModerator,
  Login2FAContainer,
  SingleUserContainer,
  CreateAdContainer,
  AdvertisementContainer,
} from '@vgl/modules'
import { ProtectedRoute } from './components/components'

const Routes = () => {
  return (
    <React.Fragment>
      <ReactRoutes>
        <Route path={ROUTES.LOGIN} element={<ManageAuth />} />
        <Route path={ROUTES.PRIVACY} element={<PrivacyPolicy />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ManageAuth />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ManageAuth />} />
        <Route path={ROUTES.LOGIN_2FA} element={<Login2FAContainer />} />
      </ReactRoutes>

      <ProtectedRoute>
        <ReactRoutes>
          <Route path={ROUTES.ADS} element={<ManageAds />} />
          <Route path={ROUTES.ROOT} element={<ManageUsers />} />
          <Route path={ROUTES.USERS} element={<ManageUsers />} />
          <Route path={ROUTES.ADMIN} element={<ManageProfile />} />
          <Route path={ROUTES.USER} element={<SingleUserContainer />} />
          <Route path={ROUTES.ANALYTICS} element={<ManageAnalytics />} />
          <Route path={ROUTES.MODERATOR} element={<SingleModerator />} />
          <Route path={ROUTES.MODERATORS} element={<ManageModerators />} />
          <Route path={ROUTES.CREATE_AD} element={<CreateAdContainer />} />
          <Route
            path={ROUTES.ADVERTISEMENT_DETAILS}
            element={<AdvertisementContainer />}
          />
        </ReactRoutes>
      </ProtectedRoute>
    </React.Fragment>
  )
}

export default Routes
