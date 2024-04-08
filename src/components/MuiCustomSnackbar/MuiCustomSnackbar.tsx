import React from 'react'
import { Close } from '@mui/icons-material'
import { COLORS, FONTS } from '@vgl/constants'
import { Box, IconButton, Paper, Typography } from '@mui/material'

interface MuiCustomSnackbarProps {
  sx: object
  open: boolean
  isIcon: boolean
  message: string
  description: string
  onClose: () => void
  descWidth?: number | string
}

const MuiCustomSnackbar = (props: MuiCustomSnackbarProps) => {
  const { onClose, message, description, isIcon, sx, descWidth } = props

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
      <Box component={Paper} className="snakbar-style" sx={sx}>
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
          width={descWidth || 329}
          variant="h5"
          fontWeight={500}
          fontFamily={FONTS.DMSANS}
        >
          {description}
        </Typography>
      </Box>
    </React.Fragment>
  )
}

export default MuiCustomSnackbar

const iconStyle = {
  color: COLORS.white,
}
