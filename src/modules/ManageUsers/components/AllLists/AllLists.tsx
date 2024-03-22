import React from 'react'
import { Box, Grid, Typography } from '@mui/material'

interface AllListsProps {
  count: number
}

const AllLists = (props: AllListsProps) => {
  const { count } = props || {}
  return (
    <React.Fragment>
      <Grid item md={11.5} xs={12}>
        <Box my={3}>
          <Typography
            variant="h1"
            fontSize={{ xs: '12 !important', md: '20px !important' }}
            fontWeight={400}
          >
            All Lists
          </Typography>
          <Typography
            mt={1}
            variant="h1"
            fontSize={{ xs: '12 !important', md: '20px !important' }}
            fontWeight={400}
          >
            Total Count: {count}
          </Typography>
        </Box>
      </Grid>
    </React.Fragment>
  )
}

export default AllLists
