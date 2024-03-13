import { useState } from 'react'
import { ROUTES } from '@vgl/constants'
import { FormTypes } from '@vgl/types'
import { UseFormReturn, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  LoginFormResolver,
  ResetPasswordResolver,
  ForgotPasswordResolver,
} from '@vgl/utils'

const useLogin = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const RESET_PATH_CHECK = pathname === ROUTES.RESET_PASSWORD
  const FORGOT_PASSWORD_CHECK = pathname === ROUTES.FORGOT_PASSWORD

  const [loginValues, setLoginValues] = useState({
    showPassword: false,
  })

  const methods: UseFormReturn<FormTypes> = useForm({
    resolver: RESET_PATH_CHECK
      ? ResetPasswordResolver
      : FORGOT_PASSWORD_CHECK
      ? ForgotPasswordResolver
      : LoginFormResolver,
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

  //send Forgot email
  const sendForgotEmail = () => {
    console.log('Forgot Password')
  }

  //reset password
  const resetPassword = () => {
    console.log('Password Reset')
  }

  //on Login form submit
  const onSubmit = (data: FormTypes) => {
    console.log(data)
    if (FORGOT_PASSWORD_CHECK) {
      sendForgotEmail()
    } else if (RESET_PATH_CHECK) {
      resetPassword()
    } else {
      navigate(ROUTES.LOGIN_2FA)
    }
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
