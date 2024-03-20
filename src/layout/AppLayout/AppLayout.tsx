import React from 'react'
import { Grid } from '@mui/material'
import AppHeader from '../AppHeader/AppHeader'
import AppSidebar from '../AppSidebar/AppSidebar'
import AppContent from '../AppContent/AppContent'
import { useBreakPoints, useNavigation } from '@vgl/hooks'

interface AppLayoutProps {
  isHeader?: boolean
  isSidebar?: boolean
  isExportCSV?: boolean
  isNavigationIcon?: boolean
  isSearchTextField?: boolean
}

const AppLayout = (props: AppLayoutProps) => {
  const {
    isHeader,
    isSidebar,
    isExportCSV,
    isNavigationIcon,
    isSearchTextField,
  } = props || {}

  const { tabMode, mobileMode } = useBreakPoints()
  const { pathname } = useNavigation()

  let title = pathname.slice(1)
  title = title.charAt(0).toUpperCase() + title.slice(1)

  return (
    <React.Fragment>
      <Grid container>
        {isSidebar && !tabMode && !mobileMode && (
          <Grid item md={1.5}>
            <AppSidebar />
          </Grid>
        )}
        <Grid
          item
          xs={12}
          sm={12}
          md={!isSidebar ? 12 : 10.5}
          px={{ xs: 2, md: !isSidebar ? 10 : 8, sm: 2 }}
        >
          {isHeader && (
            <AppHeader
              title={title}
              isExportCSV={isExportCSV}
              isNavigationIcon={isNavigationIcon}
              isSearchTextField={isSearchTextField}
            />
          )}
          <AppContent />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default AppLayout
