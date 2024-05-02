import { ROUTES } from '@vgl/constants'
import { RootState } from '@vgl/stores'
import { useSelector } from 'react-redux'
import React, { useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface ProtectedRoutesProps {
  isLoading?: boolean
  isAuthenticated?: boolean
  children: React.ReactNode
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { isAuthenticated, isLoading, user } = useSelector(
    (state: RootState) => state.auth
  )

  const navigate = useNavigate()
  const { pathname } = useLocation()
  console.log('protected-routes')

  useLayoutEffect(() => {
    if (isLoading) return
    if (isAuthenticated && user) {
      navigate(pathname || ROUTES.USERS)
    } else if (isAuthenticated && !user) {
      navigate(ROUTES.LOGIN_2FA)
    }
    // eslint-disable-next-line
  }, [isAuthenticated, user, isLoading])

  return isAuthenticated ? <React.Fragment>{children}</React.Fragment> : <></>
}

export default ProtectedRoutes
