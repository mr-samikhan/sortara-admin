import React from 'react'
import { FONTS } from '@vgl/constants'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'

interface DeleteModalUIProps {
  onClose: () => void
  onTerminate: () => void
}

const DeleteModalUI = (props: DeleteModalUIProps) => {
  const { onClose, onTerminate } = props || {}

  return (
    <React.Fragment>
      <Paper elevation={0} sx={{ width: '100%' }}>
        <Typography variant="h2" fontWeight={600} textAlign="center">
          Removing Brandon Mitchel
        </Typography>
        <Typography
          my={2}
          variant="h4"
          fontWeight={500}
          fontFamily={FONTS.INTER}
        >
          Add a note to why you’re removing user:
        </Typography>
        <Box my={2}>
          <TextField multiline rows={5} fullWidth placeholder="Type here...." />
        </Box>
        <Box my={3} display="flex" gap={2}>
          <Button
            fullWidth
            sx={padding}
            onClick={onClose}
            variant="contained"
            className="outlined-blue"
          >
            Cancel
          </Button>
          <Button
            fullWidth
            sx={padding}
            variant="contained"
            onClick={onTerminate}
            className="contained-blue"
          >
            Terminate Account
          </Button>
        </Box>
      </Paper>
    </React.Fragment>
  )
}

export default DeleteModalUI

const padding = { padding: '10px 10px' }
