import React from 'react'
import NorthRoundedIcon from '@mui/icons-material/NorthRounded'
import { Box, IconButton, Paper, Typography } from '@mui/material'

interface AdvertisementCardProps {
  count: number
  title: string
  percentage: number
}

const AdvertisementCard = (props: AdvertisementCardProps) => {
  const { count, title, percentage } = props

  return (
    <React.Fragment>
      <Box
        width="100%"
        height={210}
        elevation={0}
        display="flex"
        component={Paper}
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Box display="flex" alignItems="center">
          <Box display="flex" alignItems="center">
            <Typography fontSize={64} fontWeight={400}>
              {count}
            </Typography>
            <IconButton>
              <NorthRoundedIcon color="primary" />
            </IconButton>
            <Typography variant="h6" fontWeight={400}>
              {percentage}%
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2">{title}</Typography>
      </Box>
    </React.Fragment>
  )
}

export default AdvertisementCard
