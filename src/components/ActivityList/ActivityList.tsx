import React from 'react'
import { IActivity } from '@vgl/types'
import { COLORS } from '@vgl/constants'
import { NoRecordFound } from '@vgl/components'
import { Box, Paper, Typography } from '@mui/material'

interface ActivityListProps {
  data: IActivity[]
}

const ActivityList = (props: ActivityListProps) => {
  const { data } = props
  return (
    <React.Fragment>
      <NoRecordFound data={data} />
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
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body2">{item.title}</Typography>
              <Typography>{item.createdAt as any}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography variant="body2" fontWeight={400}>
                {item.description}
              </Typography>
              <Typography variant="body2">{item.url}</Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </React.Fragment>
  )
}

export default ActivityList
