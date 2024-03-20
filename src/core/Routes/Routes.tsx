import React from 'react'
import { ROUTES } from '@vgl/constants'
import { AppLayout } from '@vgl/layout'
import { ManageAuth } from '@vgl/screens'
import { ProtectedRoute } from './components/components'
import { Login2FAContainer, PrivacyPolicy } from '@vgl/modules'
import { Route, Routes as ReactRoutes } from 'react-router-dom'

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
          <Route path={ROUTES.ADS} element={<AppLayout isHeader />} />
          <Route path={ROUTES.ROOT} element={<AppLayout isHeader />} />
          <Route path={ROUTES.USERS} element={<AppLayout isHeader />} />
          <Route
            path={ROUTES.MODERATORS}
            element={
              <AppLayout isSidebar isHeader isExportCSV isSearchTextField />
            }
          />
        </ReactRoutes>
      </ProtectedRoute>
    </React.Fragment>
  )
}

export default Routes
