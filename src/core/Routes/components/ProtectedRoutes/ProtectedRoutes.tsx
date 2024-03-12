import { ROUTES } from '@vgl/constants'
import React, { useLayoutEffect } from 'react'

import { useNavigate } from 'react-router-dom'

interface ProtectedRoutesProps {
  isLoading?: boolean
  isAuthenticated?: boolean
  children: React.ReactNode
}

const ProtectedRoutes = ({ children, ...props }: ProtectedRoutesProps) => {
  const { isAuthenticated, isLoading } = props || {}

  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.ROOT)
    } else {
      navigate(ROUTES.LOGIN)
    }
    // eslint-disable-next-line
  }, [isAuthenticated])

  if (isLoading) {
    return <>Loading...</>
  }

  return isAuthenticated ? <React.Fragment>{children}</React.Fragment> : <></>
}

export default ProtectedRoutes
