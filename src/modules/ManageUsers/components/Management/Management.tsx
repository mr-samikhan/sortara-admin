import React from 'react'
import { COLORS } from '@vgl/constants'
import { Box, Button, Typography } from '@mui/material'
import { UserAccountDetailsProps } from '../components'

interface IManagement {
  title: string
  btnText?: string
  onDelete?: () => void
  isSuspendbtn: boolean
  onSuspend?: () => void
  onResetPassword?: () => void
  user: UserAccountDetailsProps['user']
}

const Management = (props: IManagement) => {
  const {
    user,
    title,
    btnText,
    onDelete,
    onSuspend,
    isSuspendbtn,
    onResetPassword,
  } = props || {}
  return (
    <React.Fragment>
      <Typography
        variant="h1"
        fontSize={{ xs: '15px !important', md: '20px !important' }}
      >
        {title}
      </Typography>
      {isSuspendbtn && (
        <Box my={2}>
          <Button
            fullWidth
            color="primary"
            onClick={onSuspend}
            variant="contained"
            className="outlined-btn"
          >
            Suspend User
          </Button>
        </Box>
      )}
      {btnText === 'Reset Password' && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my={2}
        >
          <Typography
            variant="h1"
            fontSize={{ xs: '15px !important', md: '20px !important' }}
          >
            Subscription
          </Typography>
          <Typography
            variant="h1"
            fontWeight={400}
            fontSize={{ xs: '15px !important', md: '20px !important' }}
          >
            {user.status ? 'Active' : 'Inactive'}
          </Typography>
        </Box>
      )}
      <Box my={1.5}>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={onDelete || onResetPassword}
          sx={buttonStyle}
        >
          {btnText}
        </Button>
      </Box>
    </React.Fragment>
  )
}

export default Management

const buttonStyle = {
  bgcolor: COLORS.primary.dark,
}
