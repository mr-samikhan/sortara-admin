import { useState } from 'react'
import { FormTypes } from '@vgl/types'
import { ROUTES } from '@vgl/constants'
import { UseFormReturn, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  LoginFormResolver,
  ResetPasswordResolver,
  ForgotPasswordResolver,
} from '@vgl/utils'

interface IuseLogin {
  onNext?: () => void
}

const useLogin = (props: IuseLogin) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // const { isAuthenticated } = useSelector((state: any) => state.auth)

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate(ROUTES.USERS)
  //   }
  //   // eslint-disable-next-line
  // }, [isAuthenticated])

  const RESET_PATH_CHECK = pathname === ROUTES.RESET_PASSWORD
  const FORGOT_PASSWORD_CHECK = pathname === ROUTES.FORGOT_PASSWORD

  const [loginValues, setLoginValues] = useState({
    showPassword: false,
    phone: '',
    otp: '',
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

  //phone onChange
  const handlePhoneChange = (value: string) => {
    setLoginValues((prevState) => ({
      ...prevState,
      phone: value,
    }))
  }

  //onSend otp
  const onSendOtp = () => {
    if (loginValues.phone === '') return
    props?.onNext && props?.onNext()
    console.log('Send OTP')
  }

  //otp change
  const onOTPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    let cleanedValue = value.replace(/\D/g, '')
    if (cleanedValue.length > 3) {
      cleanedValue = `${cleanedValue.slice(0, 3)}-${cleanedValue.slice(3, 6)}`
    }
    setLoginValues((prev) => ({
      ...prev,
      otp: cleanedValue,
    }))
  }

  //on otp verify
  const onOTPVerify = () => {
    console.log('OTP Verify')
    navigate(ROUTES.PRIVACY)
  }

  //onresend otp
  const onResendOtp = () => {
    console.log('Resend OTP')
  }
  //on go back
  const onGoBack = () => navigate(ROUTES.LOGIN_2FA)

  //on agree
  const onAgree = () => {
    console.log('Agree')
    navigate(ROUTES.USERS)
  }

  return {
    onAgree,
    methods,
    onSubmit,
    onGoBack,
    onForgot,
    pathname,
    onSendOtp,
    loginValues,
    onOTPChange,
    onOTPVerify,
    onResendOtp,
    setLoginValues,
    handlePhoneChange,
    handleClickShowPassword,
  }
}

export default useLogin
