import React from 'react'
import { FONTS } from '@vgl/constants'
import { ReportCard } from '../components'
import { Close } from '@mui/icons-material'
import { CustomTextField } from '@vgl/components'
import { Box, Paper, Button, Typography, IconButton } from '@mui/material'

interface EmailTemplateUIProps {
  name: string
  email: string
  phone: string
  userImage: string
  username: string
  onClose: () => void
  onGoBack: () => void
}

const EmailTemplateUI = (props: EmailTemplateUIProps) => {
  const { onGoBack, onClose, name } = props || {}
  return (
    <React.Fragment>
      <Box elevation={0} component={Paper} width="100%" p={{ xs: 1, md: 0 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton onClick={onGoBack}>
            <img src="/assets/icons/back-arrow.svg" alt="arrow-back" />
          </IconButton>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Box my={2}>
          <Typography
            variant="h2"
            fontWeight={400}
            fontFamily={FONTS.WORK_SANS}
          >
            Emailing {name}
          </Typography>
        </Box>
        <ReportCard />
        <Box my={2}>
          <Typography
            my={1}
            variant="h2"
            fontWeight={400}
            fontFamily={FONTS.WORK_SANS}
          >
            Subject
          </Typography>
          <CustomTextField
            fullWidth
            name="subject"
            placeholder="Type here..."
          />
        </Box>
        <Box my={2}>
          <Typography
            my={1}
            variant="h2"
            fontWeight={400}
            fontFamily={FONTS.WORK_SANS}
          >
            CC
          </Typography>
          <CustomTextField
            fullWidth
            name="cc"
            placeholder="Enter email..."
            rules={{
              required: 'CC is required',
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Invalid email',
              },
            }}
          />
        </Box>
        <Box my={2}>
          <Typography
            my={1}
            variant="h2"
            fontWeight={400}
            fontFamily={FONTS.WORK_SANS}
          >
            BCC
          </Typography>
          <CustomTextField
            fullWidth
            name="bcc"
            placeholder="Enter email..."
            rules={{
              required: 'BCC is required',
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Invalid email',
              },
            }}
          />
        </Box>
        <Box my={2}>
          <Typography
            my={1}
            variant="h2"
            fontWeight={400}
            fontFamily={FONTS.WORK_SANS}
          >
            Message
          </Typography>
          <CustomTextField
            fullWidth
            name="message"
            placeholder="Type Message here..."
          />
        </Box>
        <Box my={2}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            className="contained-blue"
          >
            Send
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default EmailTemplateUI
