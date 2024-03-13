import React from 'react'
import { ActionButton } from '../components'
import { Box, Typography } from '@mui/material'
import { CustomTextField } from '@vgl/components'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'

interface LoginFormProps {
  onForgot: () => void
  handleClickShowPassword: () => void
  loginValues: {
    showPassword: boolean
  }
}

const LoginForm = (props: LoginFormProps) => {
  const { handleClickShowPassword, loginValues, onForgot } = props || {}

  return (
    <React.Fragment>
      <Box mt={2}>
        <Typography my={2} variant="h4">
          Email Address or Phone Number
        </Typography>
        <CustomTextField
          fullWidth
          name="email"
          placeholder="Enter Email or Phone number..."
        />
      </Box>
      <Box mt={3}>
        <Typography my={2} variant="h4">
          Password
        </Typography>
        <CustomTextField
          fullWidth
          name="password"
          placeholder="**********"
          onClick={handleClickShowPassword}
          type={!loginValues.showPassword ? 'text' : 'password'}
          icon={
            loginValues.showPassword
              ? VisibilityOutlinedIcon
              : VisibilityOffOutlinedIcon
          }
        />
      </Box>
      <Typography
        mt={2}
        variant="h4"
        textAlign="end"
        onClick={onForgot}
        sx={{ cursor: 'pointer' }}
      >
        Forgot password?
      </Typography>
      <Box my={2}>
        <ActionButton buttonText=" Sign in" />
      </Box>
    </React.Fragment>
  )
}

export default LoginForm
