import React from 'react'
import { ActionButton } from '../components'
import { COLORS, FONTS } from '@vgl/constants'
import { Box, Typography } from '@mui/material'
import { CustomTextField } from '@vgl/components'

const ResetPassword = () => {
  return (
    <React.Fragment>
      <Box>
        <Typography
          fontSize={28}
          fontWeight={900}
          fontFamily={FONTS.RECOLETA}
          color={COLORS.black.main}
        >
          Change Password
        </Typography>
        <Typography
          variant="subtitle1"
          fontFamily={FONTS.DMSANS}
          color={COLORS.black.dark}
        >
          Password must contain at least one uppercase letter, lowercase letter,
          special symbol, and one number.
        </Typography>
      </Box>
      <Box mt={3}>
        <Typography
          my={2}
          variant="h4"
          fontWeight={500}
          fontFamily={FONTS.DMSANS}
        >
          New password
        </Typography>
        <CustomTextField
          fullWidth
          type="password"
          name="password"
          placeholder="**********"
        />
      </Box>
      <Box mt={3}>
        <Typography my={2} variant="h4">
          Re-enter new password
        </Typography>
        <CustomTextField
          fullWidth
          type="password"
          name="confirmPassword"
          placeholder="**********"
        />
      </Box>
      <Box my={2}>
        <ActionButton buttonText=" Confirm password changes" />
      </Box>
    </React.Fragment>
  )
}

export default ResetPassword
