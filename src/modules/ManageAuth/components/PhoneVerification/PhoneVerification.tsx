import { FONTS } from '@vgl/constants'
import { FormTypes } from '@vgl/types'
import { UseFormReturn } from 'react-hook-form'
import { Box, TextField, Typography } from '@mui/material'
import { ActionButton, ParentWrapper } from '../components'

interface PhoneVerificationProps {
  onVerify: () => void
  onResendOtp: () => void
  methods: UseFormReturn<FormTypes>
  onSubmit: (data: FormTypes) => void
  onOTPChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const PhoneVerification = (props: PhoneVerificationProps) => {
  const { methods, onSubmit, onOTPChange, onResendOtp, onVerify } = props || {}
  return (
    <ParentWrapper methods={methods} onSubmit={onSubmit}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h2" style={fontStyle} color="black">
          Phone Verification
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
        Input the six digit code sent to your phone number (XXX-XXX-1234)
      </Typography>
      <Box mt={2}>
        <Typography my={0.5} variant="h6">
          Enter six digit code
        </Typography>
        <TextField onChange={onOTPChange} fullWidth placeholder="000-000" />
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
