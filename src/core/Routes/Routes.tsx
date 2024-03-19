import React from 'react'
import { ROUTES } from '@vgl/constants'
import { ManageAuth } from '@vgl/screens'
import { Login2FAContainer, PrivacyPolicy } from '@vgl/modules'
import { ProtectedRoute } from './components/components'
import { Route, Routes as ReactRoutes } from 'react-router-dom'

const Routes = () => {
  const isLoggedIn = false

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
          <Route path={ROUTES.ROOT} element={<div>Home</div>} />
        </ReactRoutes>
      </ProtectedRoute>
    </React.Fragment>
  )
}

export default Routes
