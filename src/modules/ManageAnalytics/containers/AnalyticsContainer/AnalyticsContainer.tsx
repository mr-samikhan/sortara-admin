import { AppLayout } from '@vgl/layout'
import { CustomTabs } from '@vgl/components'
import { Box, Typography } from '@mui/material'
import {
  COLORS,
  ANALYTICS_TABS,
  ANALYTICS_ADVERTISEMENT_OPT,
} from '@vgl/constants'
import {
  CustomSelect,
  RenderTabsUI,
  useAnalytics,
  CustomFilterBox,
  AnalyticsButtons,
} from '@vgl/modules'

const AnalyticsContainer = () => {
  const { onTabChange } = useAnalytics()

  return (
    <AppLayout isHeader isSidebar>
      <AnalyticsButtons
        onStripeClick={() => console.log('stripe')}
        onCrashlyticsClick={() => console.log('crashltics')}
        onGoogleAnalyticsClick={() => console.log('google analytics')}
      />
      <Box
        my={2}
        display="flex"
        alignItems="center"
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent={{ xs: 'center', md: 'space-between' }}
      >
        <CustomTabs
          onClick={onTabChange}
          color={COLORS.white}
          options={ANALYTICS_TABS}
          bgcolor={COLORS.primary.dark}
        />
        <Box component="img" src="/assets/icons/export.svg" alt="export" />
      </Box>
      <Box
        my={4}
        display="flex"
        justifyContent="space-between"
        flexDirection={{ xs: 'column', md: 'row' }}
      >
        <Box>
          <CustomSelect options={ANALYTICS_ADVERTISEMENT_OPT} />
          <Box display="flex" alignItems="center" gap={0.5} mt={1}>
            <Typography variant="subtitle2" fontWeight={400}>
              Total count:
            </Typography>
            <Typography variant="subtitle2" fontWeight={700}>
              20
            </Typography>
          </Box>
        </Box>
        <Box width={{ xs: 'auto', md: 350 }}>
          <CustomFilterBox />
        </Box>
      </Box>
      <RenderTabsUI />
    </AppLayout>
  )
}

export default AnalyticsContainer
