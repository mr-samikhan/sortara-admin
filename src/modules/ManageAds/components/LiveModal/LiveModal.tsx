import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'

interface LiveModalProps {
  onClose: () => void
  onConfirm: () => void
}

const LiveModal = (props: LiveModalProps) => {
  const { onConfirm, onClose } = props
  return (
    <React.Fragment>
      <Box width="100%">
        <Typography variant="h3" fontWeight={500} textAlign="center">
          Go live!
        </Typography>
        <Typography variant="body2" fontWeight={500} my={1}>
          Go live at scheduled time
        </Typography>
        <TextField fullWidth placeholder="mm/dd/year - mm/dd/year" />
        <Box display="flex" gap={2} my={2.5}>
          <Button
            fullWidth
            onClick={onClose}
            variant="outlined"
            className="outlined-blue"
          >
            Cancel
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={onConfirm}
            className="contained-blue"
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default LiveModal
