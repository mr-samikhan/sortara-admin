import React from 'react'
import { FONTS } from '@vgl/constants'
import { ActionButton } from '../components'
import { Box, Typography } from '@mui/material'
import { CustomTextField } from '@vgl/components'

const ForgotPassword = () => {
  return (
    <React.Fragment>
      <Box>
        <Typography fontSize={28} fontFamily={FONTS.RECOLETA} fontWeight={900}>
          Forgot Password?
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography
          my={1}
          variant="h4"
          fontWeight={500}
          fontFamily={FONTS.DMSANS}
        >
          Email address or phone number
        </Typography>
        <CustomTextField
          fullWidth
          name="email"
          placeholder="Enter email or phone number"
        />
      </Box>
      <Box my={2}>
        <ActionButton buttonText="Submit" />
      </Box>
    </React.Fragment>
  )
}

export default ForgotPassword
