import React from 'react'
import { Avatar, Box, Button, Typography } from '@mui/material'

interface HeroProps {
  user?: {
    role: string
    email: string
    joined: string
    lastName: string
    firstName: string
  }
  onReset?: () => void
  onUpdate2FA?: () => void
  onUpdateDetails?: () => void
}

const Hero = (props: HeroProps) => {
  const { onReset, onUpdate2FA, onUpdateDetails } = props || {}
  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={2}>
          <Avatar
            src="/assets/icons/girl.svg"
            sx={{
              width: 126,
              height: 126,
            }}
          />
          <Box>
            <Typography variant="h2">Aubrey Carson</Typography>
            <Typography my={0.5} fontSize="20px !important" variant="h2">
              Chief Technology Officer
            </Typography>
            <Typography
              mt={1}
              fontSize="20px !important"
              variant="h2"
              fontWeight={400}
            >
              aubrey@sortara.com
            </Typography>
            <Typography
              mt={1}
              variant="h2"
              fontSize="18px !important"
              fontWeight={400}
            >
              Joined the team on March 2nd, 2025
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
