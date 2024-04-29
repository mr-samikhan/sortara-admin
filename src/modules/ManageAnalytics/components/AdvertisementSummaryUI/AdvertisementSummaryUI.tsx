import React from 'react'
import { AdvertisementCard } from '../components'
import { ADVERTISEMENT_CARD_DATA, COLORS } from '@vgl/constants'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'

const AdvertisementSummaryUI = () => {
  const [isExpanded, setIsExpanded] = React.useState(false)

  return (
    <React.Fragment>
      <Box component={Paper} elevation={0} my={3} p={4} borderRadius="14px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography>All Time</Typography>
            <Typography>1/01/23 to 1/23/23</Typography>
          </Box>
          <Box
            variant="text"
            fontSize={18}
            fontWeight={700}
            component={Button}
            color={COLORS.primary.dark}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Collapse' : 'View Summary'}
          </Box>
        </Box>
      </Box>
      {isExpanded && (
        <Box my={3}>
          <Grid item container md={12} spacing={2}>
            {ADVERTISEMENT_CARD_DATA.map((item, index) => (
              <Grid item md={index % 3 === 0 ? 12 : 6} xs={6}>
                <AdvertisementCard
                  key={index}
                  count={item.count}
                  title={item.title}
                  percentage={item.percentage}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </React.Fragment>
  )
}

export default AdvertisementSummaryUI
