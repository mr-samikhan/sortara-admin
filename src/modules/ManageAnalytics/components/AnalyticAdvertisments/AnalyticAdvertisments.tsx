import React from 'react'
import { SearchTextField } from '@vgl/components'
import { Ads, AdvertisementCard } from '@vgl/modules'
import { Box, Chip, Grid, Typography } from '@mui/material'
import { ADS_DATA, ANALYTICS_ADVERTISEMENT_OPT, COLORS } from '@vgl/constants'

interface IAdvertisement {
  dropdownValue: string
}

interface AnalyticAdvertismentsProps {
  advertisementValue?: IAdvertisement
}

const AnalyticAdvertisments = (props: AnalyticAdvertismentsProps) => {
  const { advertisementValue } = props || {}

  return (
    <Grid container justifyContent="center" mt={5}>
      {advertisementValue?.dropdownValue !==
        ANALYTICS_ADVERTISEMENT_OPT[2].value && (
        <React.Fragment>
          <Grid item md={6}>
            <Box component="img" src="/assets/images/chart.svg" alt="chart" />
          </Grid>
          <Grid item md={12} xs={12} my={2}>
            <SearchTextField
              fullWidth
              placeholder="Search..."
              sx={inputStyle}
            />
            <Box my={2}>
              <Box display="flex" gap={2} alignItems="center">
                <Typography fontSize={{ xs: 15, md: 32 }} fontWeight={500}>
                  Advertisements
                </Typography>
                <Box
                  height={25}
                  component={Chip}
                  label="Total:200"
                  color={COLORS.white}
                  bgcolor={COLORS.primary.dark}
                />
              </Box>
              <Ads title="" data={ADS_DATA} hideCloneIcon={true} />
            </Box>
          </Grid>
        </React.Fragment>
      )}

      {advertisementValue?.dropdownValue ===
        ANALYTICS_ADVERTISEMENT_OPT[2].value && (
        <Grid
          item
          xs={6}
          gap={2}
          md={12}
          display="flex"
          mb={{ xs: 2, md: 0 }}
          flexDirection={{ xs: 'column', md: 'row' }}
        >
          <AdvertisementCard
            count={5}
            percentage={20}
            title="Created In-App Ads"
          />
          <AdvertisementCard
            count={12}
            percentage={0.01}
            title="Active In-App Ads"
          />
        </Grid>
      )}
    </Grid>
  )
}

export default AnalyticAdvertisments

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px !important',
  },
}
