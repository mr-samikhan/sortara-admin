import React from 'react'
import { Grid } from '@mui/material'
import { useBreakPoints } from '@vgl/hooks'
import AppHeader from '../AppHeader/AppHeader'
import { useLocation } from 'react-router-dom'
import AppSidebar from '../AppSidebar/AppSidebar'
import AppContent from '../AppContent/AppContent'

interface AppLayoutProps {
  px?: any
  isHeader?: boolean
  isSidebar?: boolean
  isExportCSV?: boolean
  navigationText: string
  children?: React.ReactNode
  isNavigationIcon?: boolean
  isSearchTextField?: boolean
}

const AppLayout = (props: AppLayoutProps) => {
  const {
    px,
    children,
    isHeader,
    isSidebar,
    isExportCSV,
    navigationText,
    isNavigationIcon,
    isSearchTextField,
  } = props || {}

  const { tabMode, mobileMode } = useBreakPoints()
  const { pathname } = useLocation()

  let title = pathname.slice(1)
  title = title.charAt(0).toUpperCase() + title.slice(1)

  if (pathname.includes('/')) {
    const path = pathname.split('/')
    title = path[1].charAt(0).toUpperCase() + path[1].slice(1)
  }

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
          px={px || { xs: 2, md: !isSidebar ? 10 : 8, sm: 2 }}
        >
          {isHeader && (
            <AppHeader
              isExportCSV={isExportCSV}
              title={navigationText || title}
              isNavigationIcon={isNavigationIcon}
              isSearchTextField={isSearchTextField}
            />
          )}
          <AppContent>{children}</AppContent>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default AppLayout
