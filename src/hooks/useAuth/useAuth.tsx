import { useEffect } from 'react'
import { Api } from '@vgl/services'
import { auth } from '@vgl/firebase'
import { ROUTES } from '@vgl/constants'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, login, loginSuccess, logout } from '@vgl/stores'

export const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      dispatch(login())
      if (currentUser) {
        const data = await Api.auth.getUserProfile(currentUser.uid)
        dispatch(loginSuccess(data))
      } else {
        dispatch(logout())
        navigate(ROUTES.LOGIN)
        console.log('no user')
      }
    })

    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line
  }, [auth, dispatch])

  return { user, isLoading, isAuthenticated }
}

export default useAuth
