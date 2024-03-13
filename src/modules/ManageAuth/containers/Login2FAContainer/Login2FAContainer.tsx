import { useSteps } from '@vgl/hooks'
import { PhoneVerification, Setup2FA, useLogin } from '@vgl/modules'

const Login2FAContainer = () => {
  const { activeStep, onNext } = useSteps()
  const {
    methods,
    onSubmit,
    handlePhoneChange,
    onSendOtp,
    onOTPChange,
    onOTPVerify,
    onResendOtp,
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
          handlePhoneChange={handlePhoneChange}
        />
      )

    case 1:
      return (
        <PhoneVerification
          methods={methods}
          onSubmit={onSubmit}
          onVerify={onOTPVerify}
          onResendOtp={onResendOtp}
          onOTPChange={onOTPChange}
        />
      )
  }
}

export default Login2FAContainer
