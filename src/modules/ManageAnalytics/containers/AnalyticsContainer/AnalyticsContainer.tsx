import { AppLayout } from '@vgl/layout'
import { CustomTabs } from '@vgl/components'
import { Box, Typography } from '@mui/material'
import {
  COLORS,
  ANALYTICS_TABS,
  ANALYTICS_FILTER_OPTIONS,
  ANALYTICS_ADVERTISEMENT_OPT,
  ANALYTICS_INAPP_OPTIONS,
} from '@vgl/constants'
import {
  CustomSelect,
  RenderTabsUI,
  useAnalytics,
  DateRangePicker,
  CustomFilterBox,
  AnalyticsButtons,
} from '@vgl/modules'
import { useSelector } from 'react-redux'
import { RootState } from '@vgl/stores'

const AnalyticsContainer = () => {
  const { onTabChange, onFilterChange, analyticValues, onDropdownChange } =
    useAnalytics()

  const { tabValue } = useSelector((state: RootState) => state.context)

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
          <CustomSelect
            onChange={onDropdownChange}
            options={
              tabValue === 'advertisements'
                ? ANALYTICS_ADVERTISEMENT_OPT
                : ANALYTICS_INAPP_OPTIONS
            }
          />
          <Box display="flex" alignItems="center" gap={0.5} mt={1}>
            <Typography variant="subtitle2" fontWeight={400}>
              Total count:
            </Typography>
            <Typography variant="subtitle2" fontWeight={700}>
              20
            </Typography>
          </Box>
        </Box>
        <Box display="flex" gap={2} alignItems="center">
          <Box width={{ xs: 'auto', md: 350 }}>
            <CustomFilterBox
              onChange={onFilterChange}
              value={analyticValues.value}
            />
          </Box>
          {analyticValues.value ===
            ANALYTICS_FILTER_OPTIONS[ANALYTICS_FILTER_OPTIONS.length - 1] && (
            <DateRangePicker />
          )}
        </Box>
      </Box>
      <RenderTabsUI analyticValues={analyticValues} />
    </AppLayout>
  )
}

export default AnalyticsContainer
