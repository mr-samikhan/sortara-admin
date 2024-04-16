import { AppLayout } from '@vgl/layout'
import { Ads, useAds } from '@vgl/modules'
import { Box, Button } from '@mui/material'
import { ADS_DATA, ROUTES } from '@vgl/constants'

const AdsContainer = () => {
  const { navigate } = useAds()

  return (
    <AppLayout isHeader isSidebar isSearchTextField navigationText="Manage Ads">
      <Box my={2}>
        <Box
          fullWidth
          component={Button}
          variant="contained"
          textTransform="unset"
          className="contained-blue"
          onClick={() => navigate(ROUTES.CREATE_AD)}
        >
          Create a new advertisement
        </Box>
        <Ads data={ADS_DATA.slice(0, 1)} title="Live Ads" />
        <Ads data={ADS_DATA} title="Scheduled Ads" />
        <Ads data={ADS_DATA.slice(0, 1)} title="Archived" />
      </Box>
    </AppLayout>
  )
}

export default AdsContainer
