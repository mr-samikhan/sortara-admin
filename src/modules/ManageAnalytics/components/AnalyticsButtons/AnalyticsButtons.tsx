import React from 'react'
import { FONTS } from '@vgl/constants'
import { Box, Link, Typography } from '@mui/material'

interface AnalyticsButtonsProps {
  onStripeClick: () => void
  onCrashlyticsClick: () => void
  onGoogleAnalyticsClick: () => void
}

const AnalyticsButtons = (props: AnalyticsButtonsProps) => {
  const { onStripeClick, onCrashlyticsClick, onGoogleAnalyticsClick } = props

  return (
    <React.Fragment>
      <Box display="flex" gap={0.5} alignItems="center" mt={1}>
        <Typography variant="h6" fontWeight={500}>
          View
        </Typography>
        <Box
          component={Link}
          fontSize={14}
          fontWeight={500}
          fontFamily={FONTS.DMSANS}
          onClick={onGoogleAnalyticsClick}
        >
          Google Anaytics
        </Box>
        <Typography variant="h6" fontWeight={500}>
          report
        </Typography>
      </Box>
      <Box display="flex" gap={0.5} alignItems="center" mt={1}>
        <Typography variant="h6" fontWeight={500}>
          View
        </Typography>
        <Box
          fontSize={14}
          component={Link}
          fontWeight={500}
          fontFamily={FONTS.DMSANS}
          onClick={onCrashlyticsClick}
        >
          Crashlytics
        </Box>
        <Typography variant="h6" fontWeight={500}>
          report
        </Typography>
      </Box>
      <Box display="flex" gap={0.5} alignItems="center" mt={1}>
        <Typography variant="h6" fontWeight={500}>
          View
        </Typography>
        <Box
          fontSize={14}
          component={Link}
          fontWeight={500}
          onClick={onStripeClick}
          fontFamily={FONTS.DMSANS}
        >
          Stripe
        </Box>
        <Typography variant="h6" fontWeight={500}>
          analytics
        </Typography>
      </Box>
    </React.Fragment>
  )
}

export default AnalyticsButtons
