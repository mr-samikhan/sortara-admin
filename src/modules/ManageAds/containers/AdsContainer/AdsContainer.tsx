import { Ads } from '@vgl/modules'
import { AppLayout } from '@vgl/layout'
import { ADS_DATA } from '@vgl/constants'
import { Box, Button } from '@mui/material'

const AdsContainer = () => {
  return (
    <AppLayout isHeader isSidebar isSearchTextField navigationText="Manage Ads">
      <Box my={2}>
        <Box
          fullWidth
          component={Button}
          variant="contained"
          textTransform="unset"
          className="contained-blue"
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
