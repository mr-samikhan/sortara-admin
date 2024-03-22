import { ROUTES } from '@vgl/constants'
import { useSelector } from 'react-redux'
import React, { useLayoutEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

interface ProtectedRoutesProps {
  isLoading?: boolean
  isAuthenticated?: boolean
  children: React.ReactNode
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { isAuthenticated } = useSelector((state: any) => state.auth)

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    if (isAuthenticated) {
      navigate(
        pathname === ROUTES.ROOT || ROUTES.LOGIN ? ROUTES.USERS : pathname
      )
    } else {
      navigate(ROUTES.LOGIN)
    }
    // eslint-disable-next-line
  }, [isAuthenticated])

  return isAuthenticated ? <React.Fragment>{children}</React.Fragment> : <></>
}

export default ProtectedRoutes
