import { Box, Grid } from '@mui/material'
import React from 'react'

const AnalyticAppActivity = () => {
  return (
    <React.Fragment>
      <Grid container justifyContent="center" my={2}>
        <Grid item md={6}>
          <Box component="img" src="/assets/images/chart.svg" alt="chart" />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default AnalyticAppActivity
