import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Paper, Typography } from '@mui/material'

interface CustomTooltipProps {
  onLogout: () => void
}

const CustomTooltip = (props: CustomTooltipProps) => {
  const { onLogout } = props || {}

  const navigate = useNavigate()
  return (
    <React.Fragment>
      <Box
        p={2}
        top={90}
        right={50}
        width={210}
        height={118}
        elevation={0}
        component={Paper}
        position="absolute"
      >
        {['View Profile', 'Logout'].map((item, index) => (
          <Typography
            my={1}
            key={index}
            variant="body2"
            fontWeight={400}
            textAlign="center"
            onClick={() =>
              item === 'View Profile' ? navigate('/admin/1') : onLogout()
            }
          >
            {item}
          </Typography>
        ))}
      </Box>
    </React.Fragment>
  )
}

export default CustomTooltip
