import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'
import { COLORS, FONTS } from '@vgl/constants'
import { Box, Typography } from '@mui/material'
import { UseFormReturn } from 'react-hook-form'
import { FormTypes, ILoginValues } from '@vgl/types'
import { ActionButton, ParentWrapper } from '../components'

interface Setup2FAProps {
  isLoading: boolean
  loginValues?: ILoginValues
  onSendOtp: () => void
  methods: UseFormReturn<FormTypes>
  onSubmit: (data: FormTypes) => void
  handlePhoneChange: (value: string) => void
}

const Setup2FA = (prpos: Setup2FAProps) => {
  const {
    methods,
    onSubmit,
    handlePhoneChange,
    onSendOtp,
    isLoading,
    loginValues,
  } = prpos || {}

  return (
    <ParentWrapper
      methods={methods}
      onSubmit={onSubmit}
      error={loginValues?.error || ''}
    >
      <Box my={6}>
        <Typography variant="h2">Set up 2FA</Typography>
        <Typography variant="h4" mt={1}>
          Input phone number to set up 2FA
        </Typography>
        <Box mt={2}>
          <PhoneInput
            onChange={handlePhoneChange}
            containerStyle={{
              height: 50,
              width: '100%',
            }}
            inputStyle={{
              height: 50,
              width: '100%',
              fontSize: 16,
              fontWeight: 700,
              borderRadius: 4,
              fontFamily: FONTS.DMSANS,
              color: COLORS.grey.dark,
            }}
            buttonStyle={{
              borderRight: 'none',
              backgroundColor: '#FFFF',
            }}
            country={'us'}
          />
        </Box>

        <Box display="flex" justifyContent="center" my={2}>
          <div id="id" />
        </Box>
        <Box my={4}>
          <ActionButton
            onClick={onSendOtp}
            disabled={isLoading}
            buttonText={isLoading ? 'Loading...' : 'Submit'}
          />
        </Box>
      </Box>
    </ParentWrapper>
  )
}

export default Setup2FA
