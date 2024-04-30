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
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  )

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(pathname || ROUTES.USERS)
    }
    // eslint-disable-next-line
  }, [isAuthenticated])

  return isAuthenticated ? <React.Fragment>{children}</React.Fragment> : <></>
}

export default ProtectedRoutes
