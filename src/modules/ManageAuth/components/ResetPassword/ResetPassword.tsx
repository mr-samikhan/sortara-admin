import React from 'react'
import { COLORS } from '@vgl/constants'
import { CustomTextField } from '@vgl/components'
import { Box, Button, Typography } from '@mui/material'

const ResetPassword = () => {
  return (
    <React.Fragment>
      <Box>
        <Typography>Change Password</Typography>
        <Typography>
          Password must contain at least one uppercase letter, lowercase letter,
          special symbol, and one number.
        </Typography>
      </Box>
      <Box mt={3}>
        <Typography my={2} variant="h4">
          New password
        </Typography>
        <CustomTextField fullWidth name="password" placeholder="**********" />
      </Box>
      <Box mt={3}>
        <Typography my={2} variant="h4">
          Re-enter new password
        </Typography>
        <CustomTextField
          fullWidth
          name="confirmPassword"
          placeholder="**********"
        />
      </Box>
      <Button type="submit" variant="contained" fullWidth sx={buttonStyle}>
        Confirm password changes
      </Button>
    </React.Fragment>
  )
}

export default ResetPassword
const buttonStyle = {
  my: 2,
  height: 48,
  fontSize: 16,
  fontWeight: 500,
  fontFamily: 'DM Sans',
  bgcolor: COLORS.primary.dark,
  textTransform: 'capitalize',
}
