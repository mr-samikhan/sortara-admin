import React from 'react'
import { FONTS } from '@vgl/constants'
import { Hero } from '@vgl/components'
import { Box, IconButton, Typography } from '@mui/material'

interface ModeratorHeroProps {
  role: string
  email: string
  userName: string
  userImage: string
  onGoBack: () => void
  joinedAt: string | Date
}

const ModeratorHero = (props: ModeratorHeroProps) => {
  const { onGoBack, userImage, userName, role, joinedAt, email } = props

  return (
    <React.Fragment>
      <Box display="flex" gap={2} alignItems="center">
        <IconButton onClick={onGoBack}>
          <Box component="img" src="/assets/icons/back-arrow.svg" />
        </IconButton>
        <Typography variant="h1" fontFamily={FONTS.DMSANS}>
          Moderators
        </Typography>
      </Box>
      <Box my={2}>
        <Hero
          user={{
            role,
            email,
            userName,
            userImage,
            joined: joinedAt,
          }}
        />
      </Box>
      <Typography variant="body2">Permissions Granted</Typography>
    </React.Fragment>
  )
}

export default ModeratorHero
