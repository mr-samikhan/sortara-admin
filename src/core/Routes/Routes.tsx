import React from 'react'
import { ROUTES } from '@vgl/constants'
import { ProtectedRoute } from './components/components'
import { Route, Routes as ReactRoutes } from 'react-router-dom'
import {
  ManageAds,
  ManageAuth,
  ManageUsers,
  ManageAnalytics,
  ManageModerators,
} from '@vgl/screens'
import {
  PrivacyPolicy,
  Login2FAContainer,
  SingleUserContainer,
} from '@vgl/modules'

const Routes = () => {
  const isLoggedIn = true

  return (
    <React.Fragment>
      <ReactRoutes>
        <Route path={ROUTES.LOGIN} element={<ManageAuth />} />
        <Route path={ROUTES.PRIVACY} element={<PrivacyPolicy />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ManageAuth />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ManageAuth />} />
        <Route path={ROUTES.LOGIN_2FA} element={<Login2FAContainer />} />
      </ReactRoutes>

      <ProtectedRoute isAuthenticated={isLoggedIn} isLoading={false}>
        <ReactRoutes>
          <Route path={ROUTES.ADS} element={<ManageAds />} />
          <Route path={ROUTES.ROOT} element={<ManageUsers />} />
          <Route path={ROUTES.USERS} element={<ManageUsers />} />
          <Route path={ROUTES.USER} element={<SingleUserContainer />} />
          <Route path={ROUTES.ANALYTICS} element={<ManageAnalytics />} />
          <Route path={ROUTES.MODERATORS} element={<ManageModerators />} />
        </ReactRoutes>
      </ProtectedRoute>
    </React.Fragment>
  )
}

export default Routes
