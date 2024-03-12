import { useState } from 'react'
import { ILoginForm } from '@vgl/types'
import { ROUTES } from '@vgl/constants'
import { useForm } from 'react-hook-form'
import { LoginFormResolver } from '@vgl/utils'
import { useLocation, useNavigate } from 'react-router-dom'

const useLogin = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [loginValues, setLoginValues] = useState({
    showPassword: false,
  })

  const methods = useForm({
    resolver: LoginFormResolver,
    mode: 'onChange',
  })

  //show and hide password text
  const handleClickShowPassword = () => {
    setLoginValues((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }))
  }

  //on forgot navigate
  const onForgot = () => {
    navigate(ROUTES.FORGOT_PASSWORD)
  }

  //on Login form submit
  const onSubmit = (data: ILoginForm) => {
    console.log(data)
    navigate(ROUTES.USERS)
  }

  return {
    methods,
    onSubmit,
    onForgot,
    pathname,
    loginValues,
    handleClickShowPassword,
  }
}

export default useLogin
