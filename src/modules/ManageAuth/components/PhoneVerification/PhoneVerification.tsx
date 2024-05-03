import { FONTS } from '@vgl/constants'
import { UseFormReturn } from 'react-hook-form'
import { FormTypes, ILoginValues } from '@vgl/types'
import { Box, TextField, Typography } from '@mui/material'
import { ActionButton, ParentWrapper } from '../components'

interface PhoneVerificationProps {
  email?: string
  isEmail?: boolean
  isLoading?: boolean
  phoneNumber?: string
  onVerify: () => void
  onResendOtp: () => void
  loginValues: ILoginValues
  methods: UseFormReturn<FormTypes>
  onSubmit: (data: FormTypes) => void
  onOTPChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const PhoneVerification = (props: PhoneVerificationProps) => {
  const {
    email,
    methods,
    onSubmit,
    isEmail,
    onVerify,
    isLoading,
    onOTPChange,
    onResendOtp,
    loginValues,
    phoneNumber,
  } = props || {}
  return (
    <ParentWrapper
      methods={methods}
      onSubmit={onSubmit}
      error={loginValues.error}
    >
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
      <Box display="flex" justifyContent="center" my={2}>
        <Box id="id"></Box>
      </Box>
      <Box my={3}>
        <ActionButton
          onClick={onVerify}
          buttonText="Verify"
          disabled={isLoading}
          isLoading={isLoading}
        />
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
