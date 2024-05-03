import { useSteps } from '@vgl/hooks'
import { PhoneVerification, Setup2FA, useLogin } from '@vgl/modules'

const Login2FAContainer = () => {
  const { activeStep, onNext } = useSteps()
  const {
    methods,
    onSubmit,
    onSendOtp,
    onOTPChange,
    onOTPVerify,
    onResendOtp,
    loginValues,
    isLoading,
    handlePhoneChange,
  } = useLogin({
    onNext,
  })

  switch (activeStep) {
    case 0:
      return (
        <Setup2FA
          methods={methods}
          onSubmit={onSubmit}
          onSendOtp={onSendOtp}
          isLoading={isLoading}
          loginValues={loginValues}
          handlePhoneChange={handlePhoneChange}
        />
      )

    case 1:
      return (
        <PhoneVerification
          phoneNumber="1234"
          methods={methods}
          onSubmit={onSubmit}
          isLoading={isLoading}
          onVerify={onOTPVerify}
          loginValues={loginValues}
          onResendOtp={onResendOtp}
          onOTPChange={onOTPChange}
        />
      )
  }
}

export default Login2FAContainer
