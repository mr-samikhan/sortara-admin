import React from 'react'
import { Avatar, Box, Button, Typography } from '@mui/material'

interface HeroProps {
  user?: {
    role: string
    email: string
    userName: string
    userImage: string
    joined: string | Date
  }
  onReset?: () => void
  onUpdate2FA?: () => void
  onUpdateDetails?: () => void
}

const Hero = (props: HeroProps) => {
  const { onReset, onUpdate2FA, onUpdateDetails, user } = props || {}

  const { userImage, userName, role, joined, email } = user || {}

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={2}>
          <Avatar
            src={userImage}
            sx={{
              width: 126,
              height: 126,
            }}
          />
          <Box>
            <Typography variant="h2">{userName}</Typography>
            <Typography my={0.5} fontSize="20px !important" variant="h2">
              {role}
            </Typography>
            <Typography
              mt={1}
              fontSize="20px !important"
              variant="h2"
              fontWeight={400}
            >
              {email}
            </Typography>
            <Typography
              mt={1}
              variant="h2"
              fontSize="18px !important"
              fontWeight={400}
            >
              Joined the team &nbsp;
              {typeof joined === 'string' ? joined : joined?.toDateString()}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" onClick={onUpdateDetails}>
          <Button variant="text" className="text-button">
            Update Details
          </Button>
          <Button variant="text" className="text-button" onClick={onReset}>
            Reset Password
          </Button>
          <Button variant="text" className="text-button" onClick={onUpdate2FA}>
            Update 2FA
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Hero
