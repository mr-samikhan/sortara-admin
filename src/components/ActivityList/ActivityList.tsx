import React from 'react'
import { COLORS } from '@vgl/constants'
import { Box, Paper, Typography } from '@mui/material'

interface IActivityItems {
  date: string
  title: string
  advertisementLink: string
  advertisementMessage: string
}

interface ActivityListProps {
  data: IActivityItems[]
}

const ActivityList = (props: ActivityListProps) => {
  const { data } = props
  return (
    <React.Fragment>
      {data.map((item, index) => (
        <Box mt={1.5} key={index}>
          <Box
            px={2}
            p={1.5}
            elevation={0}
            component={Paper}
            border={`1px solid ${COLORS.grey.main}`}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">{item.title}</Typography>
              <Typography>{item.date}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography variant="body2" fontWeight={400}>
                {item.advertisementMessage}
              </Typography>
              <Typography variant="body2">{item.advertisementLink}</Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </React.Fragment>
  )
}

export default ActivityList
