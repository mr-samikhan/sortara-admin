import { Box, Grid } from '@mui/material'

const AnalyticAdvertisments = () => {
  return (
    <Grid container justifyContent="center" mt={5}>
      <Grid item md={6}>
        <Box component="img" src="/assets/images/chart.svg" alt="chart" />
      </Grid>
    </Grid>
  )
}

export default AnalyticAdvertisments
