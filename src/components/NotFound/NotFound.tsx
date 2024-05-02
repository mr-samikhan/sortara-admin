import React from 'react'
import { FONTS, ROUTES } from '@vgl/constants'
import { Box, Link, Paper, Typography } from '@mui/material'

const NotFound = () => {
  return (
    <React.Fragment>
      <Box component={Paper} elevation={0}>
        <Box
          display="flex"
          height="100vh"
          textAlign="center"
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <Typography color="error" variant="h1" fontFamily={FONTS.RECOLETA}>
              404 Not Found
            </Typography>
            <Typography
              color="error"
              variant="body2"
              component={Link}
              href={ROUTES.USERS}
              fontFamily={FONTS.RECOLETA}
            >
              Go Back
            </Typography>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default NotFound
