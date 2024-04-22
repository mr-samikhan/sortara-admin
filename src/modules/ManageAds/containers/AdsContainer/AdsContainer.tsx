import { AppLayout } from '@vgl/layout'
import { Ads, useAds } from '@vgl/modules'
import { Box, Button } from '@mui/material'
import { ADS_DATA, ROUTES } from '@vgl/constants'
import { MuiCustomSnackbar } from '@vgl/components'

const AdsContainer = () => {
  const { navigate, onPressEdit, onModalToggle, adValues } = useAds()
  const { isSnackbar } = adValues || {}

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
        <Ads
          title="Live Ads"
          onEdit={onPressEdit}
          data={ADS_DATA.slice(0, 1)}
          onClone={() => {
            ADS_DATA.push(ADS_DATA[0])
            onModalToggle('isSnackbar', true)
          }}
        />
        <Ads
          data={ADS_DATA}
          title="Scheduled Ads"
          onClone={() => {
            ADS_DATA.push(ADS_DATA[0])
            onModalToggle('isSnackbar', true)
          }}
        />
        <Ads
          data={ADS_DATA.slice(0, 1)}
          title="Archived"
          onClone={() => {
            ADS_DATA.push(ADS_DATA[0])
            onModalToggle('isSnackbar', true)
          }}
        />
        {isSnackbar && (
          <MuiCustomSnackbar
            isIcon
            open={isSnackbar}
            message="Cloned ad"
            onClose={() => onModalToggle('isSnackbar', false)}
            description="Cloned ad is saved to archived section!"
          />
        )}
      </Box>
    </AppLayout>
  )
}

export default AdsContainer
