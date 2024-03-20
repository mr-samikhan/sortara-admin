import React from 'react'
import MobileHeader from './MobileHeader'
import { useBreakPoints } from '@vgl/hooks'
import { FONTS, ROUTES } from '@vgl/constants'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import { SearchTextField } from '@vgl/components'
import { Avatar, Box, Grid, IconButton, Typography } from '@mui/material'

interface AppHeaderProps {
  title: string
  profileImage?: string
  isExportCSV?: boolean
  isNavigationIcon?: boolean
  isSearchTextField?: boolean
}

type Anchor = 'top'

const AppHeader = (props: AppHeaderProps) => {
  const {
    title,
    isExportCSV,
    profileImage,
    isNavigationIcon,
    isSearchTextField,
  } = props || {}

  const navigate = useNavigate()

  const { tabMode, mobileMode } = useBreakPoints()
  const smallScreen = mobileMode || tabMode

  const [state, setState] = React.useState({
    top: false,
  })

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setState({ ...state, [anchor]: open })
    }

  return (
    <Box mt={4}>
      {smallScreen && (
        <MobileHeader toggleDrawer={toggleDrawer} state={state} />
      )}
      <Box
        my={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" gap={2}>
          {isNavigationIcon && (
            <IconButton onClick={() => navigate(-1)}>
              <img src="/assets/icons/back-arrow.svg" />
            </IconButton>
          )}
          <Typography variant="h1" fontFamily={FONTS.RECOLETA}>
            {title}
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Avatar
            className="profile-pic"
            onClick={() => navigate(ROUTES.ADMIN)}
            src={profileImage || '/assets/icons/girl.svg'}
          />
          {smallScreen && (
            <IconButton onClick={toggleDrawer('top', true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      <Grid container justifyContent="space-between">
        {isSearchTextField && (
          <Grid item md={!isExportCSV ? 12 : 7} xs={12} sm={12}>
            <SearchTextField
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '0px !important',
                },
              }}
            />
          </Grid>
        )}
        {isExportCSV && (
          <Grid item md={5} xs={12} textAlign="end">
            <Box
              alt=""
              component="img"
              sx={exportStyle}
              src="/assets/icons/export.svg"
            />
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default AppHeader

const exportStyle = {
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8,
  },
}
