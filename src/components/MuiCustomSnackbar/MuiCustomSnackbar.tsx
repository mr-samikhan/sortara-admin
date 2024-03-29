import React from 'react'
import { Close } from '@mui/icons-material'
import { COLORS, FONTS } from '@vgl/constants'
import { Box, IconButton, Paper, Typography } from '@mui/material'

interface MuiCustomSnackbarProps {
  open: boolean
  isIcon: boolean
  message: string
  description: string
  onClose: () => void
}

const MuiCustomSnackbar = (props: MuiCustomSnackbarProps) => {
  const { onClose, message, description, isIcon } = props

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <React.Fragment>
      <Paper className="snakbar-style">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight={700} fontFamily={FONTS.DMSANS}>
            {message}
          </Typography>
          {isIcon && (
            <IconButton onClick={onClose}>
              <Close sx={iconStyle} />
            </IconButton>
          )}
          {!isIcon && (
            <Typography
              variant="h5"
              fontWeight={700}
              onClick={onClose}
              fontFamily={FONTS.DMSANS}
            >
              Undo
            </Typography>
          )}
        </Box>
        <Typography
          mt={1}
          width={329}
          variant="h5"
          fontWeight={500}
          fontFamily={FONTS.DMSANS}
        >
          {description}
        </Typography>
      </Paper>
    </React.Fragment>
  )
}

export default MuiCustomSnackbar

const iconStyle = {
  color: COLORS.white,
}
