import React from 'react'
import { logout } from '@vgl/stores'
import { useDispatch } from 'react-redux'
import { COLORS, FONTS } from '@vgl/constants'
import { Box, Button, Paper, Typography } from '@mui/material'

interface LogoutModalProps {
  onCancel: () => void
}

const LogoutModal = (props: LogoutModalProps) => {
  const { onCancel } = props || {}

  const dispatch = useDispatch()
  return (
    <React.Fragment>
      <Box component={Paper} elevation={0} p={1} width="100%">
        <Typography
          width={200}
          fontSize={24}
          fontWeight={600}
          fontFamily={FONTS.WORK_SANS}
        >
          Are you sure you want to logout?
        </Typography>
        <Box my={2}>
          <Box
            fullWidth
            height={50}
            component={Button}
            variant="contained"
            bgcolor={COLORS.black.dark}
            onClick={() => dispatch(logout())}
          >
            Logout
          </Box>
        </Box>
        <Box my={2}>
          <Box
            fullWidth
            height={50}
            onClick={onCancel}
            component={Button}
            variant="outlined"
          >
            Cancel
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default LogoutModal
