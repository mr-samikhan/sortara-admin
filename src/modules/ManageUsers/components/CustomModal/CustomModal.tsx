import React from 'react'
import { COLORS, FONTS } from '@vgl/constants'
import { Box, Button, Modal, Paper, Typography } from '@mui/material'

interface CustomModalProps {
  title?: string
  open: boolean
  position?: boolean
  className?: string
  description?: string
  onClose?: () => void
  confirmText?: string
  onCancel?: () => void
  onConfirm?: () => void
  width?: number | string
  children?: React.ReactNode
}

const CustomModal = (props: CustomModalProps) => {
  const {
    open,
    title,
    width,
    onClose,
    onCancel,
    onConfirm,
    children,
    position,
    className,
    description,
    confirmText,
  } = props
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={onClose}
        sx={modalBgStyle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={width}
          component={Paper}
          className={className || 'user-modal'}
          sx={position ? positionStyle : null}
        >
          {children ? (
            <React.Fragment>{children}</React.Fragment>
          ) : (
            <React.Fragment>
              <Typography my={2} variant="h3" fontWeight={600}>
                {title}
              </Typography>
              <Typography
                my={1}
                width={298}
                variant="h4"
                color="#34333B"
                fontFamily={FONTS.INTER}
                textAlign={position ? 'start' : 'center'}
              >
                {description}
              </Typography>
              <Box
                my={2}
                gap={2}
                width="100%"
                display="flex"
                px={position ? 0 : 2}
              >
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  className="outlined-blue"
                  onClick={onCancel || onClose}
                >
                  Cancel
                </Button>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  onClick={onConfirm}
                  className="contained-blue"
                >
                  {confirmText || 'Yes, I confirm'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Modal>
    </React.Fragment>
  )
}

export default CustomModal

const modalBgStyle = {
  '& .MuiBackdrop-root': {
    background: COLORS.background,
  },
}

const positionStyle = {
  justifyContent: 'start !important',
  alignItems: 'start !important',
}
