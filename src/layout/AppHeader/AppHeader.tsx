import React from 'react'
import { FONTS } from '@vgl/constants'
import MobileHeader from './MobileHeader'
import { CustomModal } from '@vgl/modules'
import { useBreakPoints } from '@vgl/hooks'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import { Avatar, Box, Grid, IconButton, Typography } from '@mui/material'
import { CustomTooltip, LogoutModal, SearchTextField } from '@vgl/components'

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
    isTooltip: false,
    isLogoutModal: false,
  })

  const { isLogoutModal, isTooltip } = state

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

  const modalToggler = (key: string, val: boolean) => {
    setState((prevState) => ({
      ...prevState,
      [key]: val,
    }))
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
          <Box
            component={Avatar}
            className="profile-pic"
            onClick={() => modalToggler('isTooltip', !isTooltip)}
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
        {isTooltip && (
          <CustomTooltip
            onLogout={() => {
              modalToggler('isTooltip', false)
              modalToggler('isLogoutModal', true)
            }}
          />
        )}
        {isLogoutModal && (
          <CustomModal
            onClose={() => modalToggler('isLogoutModal', false)}
            open={isLogoutModal}
            sx={{
              '& .MuiDialog-paper': {
                width: '100%',
                maxWidth: '100%',
                borderRadius: '8px',
              },
            }}
          >
            <LogoutModal
              onCancel={() => {
                modalToggler('isTooltip', false)
                modalToggler('isLogoutModal', false)
              }}
            />
          </CustomModal>
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
