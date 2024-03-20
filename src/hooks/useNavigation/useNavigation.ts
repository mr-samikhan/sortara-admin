import { ROUTES } from '@vgl/constants'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const useNavigation = () => {
  const [activePage, setActivePage] = useState(0)

  const navigate = useNavigate()

  const { pathname } = useLocation()

  useEffect(() => {
    switch (pathname) {
      case ROUTES.MODERATORS:
        setActivePage(0)
        break

      case ROUTES.USERS:
        setActivePage(1)
        break
      case ROUTES.ADS:
        setActivePage(2)
        break
      case ROUTES.ANALYTICS:
        setActivePage(3)
        break

      default:
        navigate(ROUTES.MODERATORS)
        setActivePage(0)
        break
    }
  }, [pathname])

  return { activePage, pathname }
}
