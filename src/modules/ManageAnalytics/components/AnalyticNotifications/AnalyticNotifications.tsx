import React from 'react'
import { CustomChart, MuiCustomTable } from '@vgl/components'
import { AdvertisementCard } from '../components'
import { Box, Chip, Grid, Typography } from '@mui/material'
import { COLORS, TABLE_DATA, TABLE_HEADERS } from '@vgl/constants'

interface AnalyticNotificationsProps {
  analyticValues?: any
}

const AnalyticNotifications = (props: AnalyticNotificationsProps) => {
  const { analyticValues } = props

  const RenderSteps = () => {
    switch (analyticValues.dropdownValue) {
      case 'summary':
        return (
          <Grid item container md={12} spacing={2}>
            {[
              {
                count: 12,
                title: 'Active Email Notifications',
                percentage: 20,
              },
              {
                count: 12,
                title: 'Active In-App Notifications',
                percentage: 20,
              },
              {
                count: 0.03,
                title: 'Active Push Notifications',
                percentage: 20,
              },
            ].map((item, index) => (
              <Grid item md={index % 3 === 0 ? 12 : 6}>
                <AdvertisementCard
                  key={index}
                  count={item.count}
                  title={item.title}
                  percentage={item.percentage}
                />
              </Grid>
            ))}
          </Grid>
        )

      default:
        return (
          <React.Fragment>
            <Box display="flex" gap={2} alignItems="center" my={2}>
              <Typography fontSize={{ xs: 15, md: 32 }} fontWeight={500}>
                Users
              </Typography>
              <Box
                width={150}
                height={25}
                component={Chip}
                color={COLORS.white}
                label={`Total: ${200}`}
                bgcolor={COLORS.primary.dark}
              />
            </Box>
            <Box my={2}>
              <MuiCustomTable
                data={TABLE_DATA}
                headerData={TABLE_HEADERS}
                onRowClick={() => console.log('row clicked')}
              />
            </Box>
          </React.Fragment>
        )
    }
  }
  return (
    <React.Fragment>
      <Grid container justifyContent="center">
        <Grid item md={6} m="auto" my={2}>
          {/* <Box component="img" src="/assets/images/chart.svg" alt="chart" /> */}
          <CustomChart />
        </Grid>
        <Grid item md={12} xs={12} my={2}>
          <RenderSteps />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default AnalyticNotifications
