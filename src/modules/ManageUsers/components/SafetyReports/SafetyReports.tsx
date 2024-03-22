import React from 'react'
import { COLORS } from '@vgl/constants'
import { Box, Grid, Typography } from '@mui/material'

interface SafetyReportsProps {
  status: string
  sentTo: string
  subject: string
  message: string
  reportDate: string
  reportTitle: string
}

const SafetyReports = (props: SafetyReportsProps) => {
  const { reportTitle, reportDate, status, sentTo, subject, message } =
    props || {}
  return (
    <React.Fragment>
      <Grid item md={11.5} xs={12}>
        <Box my={2}>
          <Typography
            variant="h1"
            fontSize={{ xs: '15px !important', md: '20px !important' }}
          >
            Safety Reports
          </Typography>
        </Box>
        <Box bgcolor={COLORS.white} borderRadius="4px" p={2}>
          <Typography
            variant="h1"
            fontSize={{ xs: '12px !important', md: '20px !important' }}
          >
            {reportTitle}
          </Typography>
          <Box display="flex" gap={3} mt={1.5}>
            <Typography
              variant="h1"
              fontSize={{ xs: '12px !important', md: '20px !important' }}
            >
              Time and Date of Report
            </Typography>
            <Typography
              mt={1}
              variant="h1"
              fontWeight={400}
              fontSize={{ xs: '8px !important', md: '20px !important' }}
            >
              {reportDate}
            </Typography>
          </Box>
          <Box display="flex" gap={3}>
            <Typography
              variant="h1"
              fontSize={{ xs: '12px !important', md: '20px !important' }}
            >
              Status
            </Typography>
            <Typography
              variant="h1"
              fontWeight={400}
              fontSize={{ xs: '10px !important', md: '20px !important' }}
            >
              {status}
            </Typography>
          </Box>
          <Box bgcolor={COLORS.background} my={2} p={2} borderRadius="4px">
            <Box display="flex" gap={3}>
              <Typography
                variant="h1"
                fontSize={{ xs: '12px !important', md: '20px !important' }}
              >
                Email Sent to:
              </Typography>
              <Typography
                variant="h1"
                fontWeight={400}
                fontSize={{ xs: '10px !important', md: '20px !important' }}
              >
                {sentTo}
              </Typography>
            </Box>
            <Box display="flex" gap={3} my={1.5}>
              <Typography
                variant="h1"
                fontSize={{ xs: '12px !important', md: '20px !important' }}
              >
                Subject
              </Typography>
              <Typography
                variant="h1"
                fontWeight={400}
                fontSize={{ xs: '10px !important', md: '20px !important' }}
              >
                {subject}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h1"
                fontSize={{ xs: '12px !important', md: '18px !important' }}
                fontWeight={400}
              >
                <div dangerouslySetInnerHTML={{ __html: message }} />
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </React.Fragment>
  )
}

export default SafetyReports
