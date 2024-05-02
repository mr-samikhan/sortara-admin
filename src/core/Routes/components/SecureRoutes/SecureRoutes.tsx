import { auth } from '@vgl/firebase'
import { ROUTES } from '@vgl/constants'
import { Navigate, Outlet } from 'react-router-dom'

const SecureRoutes = () => {
  const { currentUser } = auth
  if (!currentUser) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <Outlet />
}

export default SecureRoutes
