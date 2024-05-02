import { Api } from '@vgl/services'
import { auth } from '@vgl/firebase'
import { ROUTES } from '@vgl/constants'
import React, { useEffect } from 'react'
import { ICurrentUser } from '@vgl/types'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, loginSuccess, logout } from '@vgl/stores'

export const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = React.useState(false)

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const data = await Api.auth.getUserProfile(currentUser.uid)
        dispatch(loginSuccess(data))
        navigateBasedOnUserData(data)
      } else {
        dispatch(logout())
        navigate(ROUTES.LOGIN)
      }
      setIsLoading(false)
    })

    return () => unsubscribe()

    // eslint-disable-next-line
  }, [dispatch, auth.currentUser])

  const navigateBasedOnUserData = (userData: ICurrentUser) => {
    if (userData.isNewUser) {
      navigate(ROUTES.RESET_PASSWORD)
    } else if (!userData.isPhoneVerified) {
      navigate(ROUTES.LOGIN_2FA)
    }

    if (!userData.isPrivacypolicyAccepted) {
      navigate(ROUTES.PRIVACY)
    }
  }

  return { user, isLoading, isAuthenticated }
}

export default useAuth
