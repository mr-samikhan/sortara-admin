import React from 'react'
import { COLORS, FONTS, SUSPENSION_REASONS } from '@vgl/constants'
import {
  Box,
  Paper,
  Button,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'

interface SuspendUserUIProps {
  onClose?: () => void
  onCustomSuspension?: () => void
  onSevenDaysSuspension?: () => void
}

const SuspendUserUI = (props: SuspendUserUIProps) => {
  const { onCustomSuspension, onSevenDaysSuspension, onClose } = props || {}

  return (
    <React.Fragment>
      <Paper elevation={0}>
        <Typography
          mt={4}
          fontSize={32}
          fontWeight={500}
          fontFamily={FONTS.INTER}
        >
          Suspend Brandon Mitchel
        </Typography>
        <Typography
          my={2}
          fontSize={20}
          fontWeight={400}
          fontFamily={FONTS.INTER}
        >
          Please select a time range for suspending the selected user.
        </Typography>
        <Box mt={2}>
          <Button
            fullWidth
            variant="contained"
            sx={suspendBtnStyle}
            onClick={onSevenDaysSuspension}
          >
            Suspend account for 7 days
          </Button>
        </Box>
        <Box mt={2}>
          <TextField
            fullWidth
            placeholder="Enter suspend days (up to 365 days)"
          />
        </Box>
        <Typography
          my={2}
          fontSize={20}
          fontWeight={500}
          fontFamily={FONTS.INTER}
        >
          Include reason for suspension
        </Typography>
        <Box my={2}>
          <TextField
            select
            fullWidth
            sx={noBorderStyle}
            defaultValue="Spam"
            label="Type reason for suspension..."
            InputLabelProps={{
              shrink: true,
            }}
          >
            {SUSPENSION_REASONS.map((item) => (
              <MenuItem className="custom-menuItem" value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Typography
          my={1}
          variant="h4"
          textAlign="center"
          fontFamily={FONTS.DMSANS}
        >
          or
        </Typography>
        <Box mt={4}>
          <TextField
            rows={4}
            multiline
            fullWidth
            placeholder="Type reason for suspension..."
          />
        </Box>
        <Box my={2} display="flex" gap={2}>
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
            onClick={onCustomSuspension}
            className="contained-blue"
          >
            Suspend
          </Button>
        </Box>
      </Paper>
    </React.Fragment>
  )
}

export default SuspendUserUI

const suspendBtnStyle = {
  padding: '10px 10px',
  bgcolor: COLORS.pear,
  color: COLORS.black.main,
}

const noBorderStyle = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 0,
    },
  },
}

const padding = { padding: '10px 10px' }
