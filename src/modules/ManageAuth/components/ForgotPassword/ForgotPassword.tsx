import React from 'react'
import { COLORS, FONTS } from '@vgl/constants'
import { CustomTextField } from '@vgl/components'
import { Box, Button, Typography } from '@mui/material'

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

      <Button type="submit" variant="contained" fullWidth sx={buttonStyle}>
        Submit
      </Button>
    </React.Fragment>
  )
}

export default ForgotPassword
const buttonStyle = {
  my: 2,
  height: 48,
  fontSize: 16,
  fontWeight: 500,
  fontFamily: 'DM Sans',
  bgcolor: COLORS.primary.dark,
  textTransform: 'capitalize',
}
