import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { COLORS, FONTS } from '@vgl/constants'
import React from 'react'
import { ReportCard } from '../components'

interface SuspendDetailsModalProps {
  onGoBack: () => void
  onSuspend: () => void
  onMailUser: () => void
}

const SuspendDetailsModal = (props: SuspendDetailsModalProps) => {
  const { onGoBack, onSuspend, onMailUser } = props || {}
  return (
    <React.Fragment>
      <Box component={Paper} p={{ xs: 1, md: 2 }} elevation={0} width="100%">
        <Box display="flex" alignItems="center">
          <Box flexGrow={0.5}>
            <IconButton onClick={onGoBack}>
              <Box
                component="img"
                src="/assets/icons/back-arrow.svg"
                alt="back"
              />
            </IconButton>
          </Box>
          <Box display="flex" gap={1} alignItems="center">
            <IconButton onClick={onMailUser}>
              <Box component="img" src="/assets/icons/mail.svg" alt="back" />
            </IconButton>
            <Typography color={COLORS.primary.dark}>Email user</Typography>
          </Box>
        </Box>
        <Box>
          <ReportCard />
        </Box>
        <Box my={3}>
          <Typography
            my={1}
            variant="h2"
            fontWeight={400}
            fontFamily={FONTS.WORK_SANS}
          >
            Suspension Reason
          </Typography>
          <TextField
            select
            fullWidth
            placeholder="List"
            SelectProps={{
              ...customStyle,
            }}
          >
            {['Spam or Scam'].map((option) => (
              <MenuItem key={option} value={option} className="report-menuItem">
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box my={3}>
          <Typography
            my={1}
            variant="h2"
            fontWeight={400}
            fontFamily={FONTS.WORK_SANS}
          >
            Time duration
          </Typography>
          <Box display="flex" gap={2}>
            <Box width="50%">
              <TextField fullWidth placeholder="00 months" />
            </Box>
            <Box width="50%">
              <TextField fullWidth placeholder="00 days" />
            </Box>
          </Box>
        </Box>
        <Box my={3}>
          <Typography
            my={1}
            variant="h2"
            fontWeight={400}
            fontFamily={FONTS.WORK_SANS}
          >
            Suspended by:
          </Typography>
          <TextField fullWidth placeholder="Enter your name..." />
        </Box>
        <Box my={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={onSuspend}
            className="contained-blue"
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default SuspendDetailsModal

const customStyle: any = {
  MenuProps: {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    PaperProps: {
      style: {
        marginTop: -10,
        boxShadow: 'none',
        borderRadius: '14px',
        border: '1px solid #D0D0D0',
      },
    },
  },
}
