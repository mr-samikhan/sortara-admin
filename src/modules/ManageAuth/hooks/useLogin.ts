import { Api } from '@vgl/services'
import { auth } from '@vgl/firebase'
import { ROUTES } from '@vgl/constants'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { FormTypes, ILoginValues } from '@vgl/types'
import { RootState, loginSuccess } from '@vgl/stores'
import { useDispatch, useSelector } from 'react-redux'
import { UseFormReturn, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  LoginFormResolver,
  ResetPasswordResolver,
  ForgotPasswordResolver,
} from '@vgl/utils'

interface IuseLogin {
  onNext?: () => void
  activeStep?: number
}

const useLogin = (props: IuseLogin) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const { isAuthenticated, user, isLoading } = useSelector(
    (state: RootState) => state.auth
  )
  console.log(user, isAuthenticated, '::::user login')

  React.useEffect(() => {
    if (isLoading) return

    if (!auth.currentUser) {
      navigate(ROUTES.LOGIN)
    } else if (auth.currentUser && pathname === ROUTES.LOGIN) {
      navigate(ROUTES.USERS)
    } else if (auth.currentUser) {
      navigate(pathname || ROUTES.USERS)
    }
    // eslint-disable-next-line
  }, [isAuthenticated, isLoading, auth.currentUser])

  const RESET_PATH_CHECK = pathname === ROUTES.RESET_PASSWORD
  const FORGOT_PASSWORD_CHECK = pathname === ROUTES.FORGOT_PASSWORD

  const [loginValues, setLoginValues] = useState<ILoginValues>({
    error: '',
    phone: '',
    otp: '',
    confirmationObj: {},
    showPassword: false,
    isRecaptcha: false,
  })

  const methods: UseFormReturn<FormTypes> = useForm({
    resolver: RESET_PATH_CHECK
      ? ResetPasswordResolver
      : FORGOT_PASSWORD_CHECK
      ? ForgotPasswordResolver
      : LoginFormResolver,
    mode: 'onChange',
  })

  const { mutate: onLogin, isLoading: loginLoading } = useMutation(
    Api.auth.login,
    {
      onSuccess: (data) => {
        dispatch(loginSuccess(data))
      },
      onError: (error: any) => {
        setLoginValues((prev) => ({
          ...prev,
          error: error?.message,
        }))
      },
    }
  )

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
  const onSubmit = (data: FormTypes | any) => {
    console.log(data)
    if (FORGOT_PASSWORD_CHECK) {
      sendForgotEmail()
    } else if (RESET_PATH_CHECK) {
      resetPassword()
    } else {
      onLogin(data)
      // navigate(ROUTES.LOGIN_2FA)
    }
  }

  //phone onChange
  const handlePhoneChange = (value: string) => {
    setLoginValues((prevState) => ({
      ...prevState,
      phone: value,
    }))
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

  //on go back
  const onGoBack = () => navigate(ROUTES.LOGIN_2FA)

  //otp

  //send otp mutation
  const { mutate: onSendOTP_, isLoading: isOtpSendingLoading } = useMutation(
    Api.auth.sendOtp,
    {
      onSuccess: () =>
        props.activeStep === 0
          ? props?.onNext && props?.onNext()
          : console.log("Don't have next"),
      onError: (error: any) => {
        setLoginValues((prev) => ({
          ...prev,
          error: error.message,
        }))
        console.log(error, 'error')
      },
    }
  )

  //onVerify Otp
  const { mutate: onOTPVerify_, isLoading: isVerifiyingLoading } = useMutation<
    any,
    any,
    any
  >(Api.auth.verifyOtp, {
    onSuccess: () => navigate(ROUTES.PRIVACY),
    onError: (error: any) => {
      setLoginValues((prev) => ({
        ...prev,
        error: error.message,
      }))
      console.log(error, 'error')
    },
  })

  //on accept privacy policy
  const { mutate: onAcceptPrivacyPolicy, isLoading: isPrivacyPolicyLoading } =
    useMutation(Api.admin.updateAdmin, {
      onSuccess: () => navigate(ROUTES.USERS),
      onError: (error: any) => {
        setLoginValues((prev) => ({
          ...prev,
          error: error.message,
        }))
        console.log(error, 'error')
      },
    })

  //onSend otp
  const onSendOtp = () => {
    if (loginValues.phone === '') return
    onSendOTP_({
      phone: loginValues.phone,
      setClearCaptcha: setLoginValues,
      setConfirmationObject: setLoginValues,
    })
  }

  //on otp verify
  const onOTPVerify = () => {
    if (loginValues.otp === '' || !loginValues.confirmationObj) return
    onOTPVerify_({
      confirmationObject: loginValues.confirmationObj,
      otp: loginValues.otp,
    })
  }

  //onresend otp
  const onResendOtp = () => {
    loginValues.confirmationObj = {}
    onSendOTP_({
      phone: loginValues.phone,
      setConfirmationObject: setLoginValues,
    })
  }

  //on agree
  const onAgree = () => {
    onAcceptPrivacyPolicy({
      id: user?.uid || '',
      data: { isPrivacypolicyAccepted: true },
    })
  }

  //end

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
    loginLoading,
    setLoginValues,
    handlePhoneChange,
    handleClickShowPassword,
    isLoading:
      isOtpSendingLoading || isVerifiyingLoading || isPrivacyPolicyLoading,
  }
}

export default useLogin
