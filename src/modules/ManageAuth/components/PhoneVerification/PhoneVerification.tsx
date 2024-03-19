import { FONTS } from '@vgl/constants'
import { FormTypes } from '@vgl/types'
import { UseFormReturn } from 'react-hook-form'
import { Box, TextField, Typography } from '@mui/material'
import { ActionButton, ParentWrapper } from '../components'

interface PhoneVerificationProps {
  email?: string
  isEmail?: boolean
  phoneNumber?: string
  onVerify: () => void
  onResendOtp: () => void
  methods: UseFormReturn<FormTypes>
  onSubmit: (data: FormTypes) => void
  onOTPChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  loginValues: {
    showPassword: boolean
    phone: string
    otp: string
  }
}

const PhoneVerification = (props: PhoneVerificationProps) => {
  const {
    email,
    methods,
    onSubmit,
    isEmail,
    onVerify,
    onOTPChange,
    onResendOtp,
    loginValues,
    phoneNumber,
  } = props || {}
  return (
    <ParentWrapper methods={methods} onSubmit={onSubmit}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h2" style={fontStyle} color="black">
          {isEmail ? 'Email Verification' : 'Phone Verification'}
        </Typography>
        <Typography
          variant="h6"
          color="black"
          sx={resendStyle}
          onClick={onResendOtp}
        >
          Resend code
        </Typography>
      </Box>
      <Typography variant="h4" style={fontStyle} width={300} mt={0.5}>
        {isEmail
          ? `Input the six digit code sent to your email (${email})`
          : `Input the six digit code sent to your phone number (XXX-XXX-${phoneNumber})`}
      </Typography>
      <Box mt={2}>
        <Typography my={0.5} variant="h6">
          Enter six digit code
        </Typography>
        <TextField
          fullWidth
          placeholder="000-000"
          onChange={onOTPChange}
          value={loginValues.otp}
        />
      </Box>
      <Box my={3}>
        <ActionButton buttonText="Verify" onClick={onVerify} />
      </Box>
    </ParentWrapper>
  )
}

export default PhoneVerification

const fontStyle = {
  fontFamily: FONTS.INTER,
}

const resendStyle = {
  cursor: 'pointer',
}
