import React from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useBreakPoints, useNavigation } from '@vgl/hooks'
import { ADMIN_MENUS, COLORS, MODERATOR_MENUS } from '@vgl/constants'

const AppSidebar = () => {
  const navigate = useNavigate()
  const { activePage } = useNavigation()

  const { tabMode, mobileMode } = useBreakPoints()

  const user = {
    role: 'moderator',
  }

  const smallScreen = mobileMode || tabMode
  const menusCheck = user.role === 'admin' ? ADMIN_MENUS : MODERATOR_MENUS
  return (
    <React.Fragment>
      {!smallScreen && (
        <Box
          height={1024}
          display="flex"
          maxHeight={1024}
          alignItems="center"
          flexDirection="column"
          bgcolor={COLORS.white}
          padding="50px 0px 50px 0px"
          borderRight={`1px solid ${COLORS.grey.main}`}
        >
          <img src="/assets/icons/sortara.svg" alt="" />
          <Box
            mt={4}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            {menusCheck.map(({ title, path }, index) => {
              index = user.role === 'admin' ? index : index + 1
              return (
                <Box mt={2} key={index}>
                  <Button
                    variant="text"
                    sx={{ width: '100%' }}
                    onClick={() => navigate(path)}
                    className={
                      activePage === index
                        ? 'selected-sidebar-btn'
                        : 'sidebar-btn'
                    }
                  >
                    {title}
                  </Button>
                </Box>
              )
            })}
          </Box>
        </Box>
      )}
    </React.Fragment>
  )
}

export default AppSidebar
