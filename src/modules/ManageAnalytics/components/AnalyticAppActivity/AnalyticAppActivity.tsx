import React from 'react'
import { SearchTextField } from '@vgl/components'
import { Ads, AdvertisementCard } from '@vgl/modules'
import { Box, Chip, Grid, Typography } from '@mui/material'
import { ADS_DATA, ANALYTICS_INAPP_OPTIONS, COLORS } from '@vgl/constants'

interface IAnalytics {
  dropdownValue: string
}

interface AnalyticAppActivityProps {
  analyticValues?: IAnalytics
}

const AnalyticAppActivity = (props: AnalyticAppActivityProps) => {
  const { analyticValues } = props || {}

  return (
    <React.Fragment>
      <Grid container justifyContent="center" my={2}>
        {analyticValues?.dropdownValue !== ANALYTICS_INAPP_OPTIONS[5].value && (
          <>
            <Grid item md={6}>
              <Box component="img" src="/assets/images/chart.svg" alt="chart" />
            </Grid>
            <Grid item md={12} xs={12} my={2}>
              <SearchTextField
                fullWidth
                placeholder="Search..."
                sx={inputStyle}
              />
              <Box display="flex" gap={2} alignItems="center" my={2}>
                <Typography fontSize={{ xs: 15, md: 32 }} fontWeight={500}>
                  Lists
                </Typography>
                <Box
                  width={150}
                  height={25}
                  component={Chip}
                  label="Total: 200"
                  color={COLORS.white}
                  bgcolor={COLORS.primary.dark}
                />
              </Box>
              <Ads title="" data={ADS_DATA} hideCloneIcon={true} />
            </Grid>
          </>
        )}
        {analyticValues?.dropdownValue === ANALYTICS_INAPP_OPTIONS[5].value && (
          <Grid container spacing={2}>
            {[
              { count: 12, title: 'Lists created', percentage: 20 },
              { count: 12, title: 'Items Added', percentage: 20 },
              { count: 0.03, title: 'Comments Added', percentage: 20 },
              { count: 3, title: 'Likes Added', percentage: 0.01 },
              { count: 3, title: 'Items Shared', percentage: 0.01 },
            ].map((item, index) => (
              <Grid item md={index === 2 ? 12 : 6}>
                <AdvertisementCard
                  key={index}
                  count={item.count}
                  title={item.title}
                  percentage={item.percentage}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  )
}

export default AnalyticAppActivity

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px !important',
  },
}
