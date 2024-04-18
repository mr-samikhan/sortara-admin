import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Paper, Typography } from '@mui/material'

interface CustomTooltipProps {
  onLogout: () => void
  onClose?: () => void
}

const CustomTooltip = (props: CustomTooltipProps) => {
  const { onLogout, onClose } = props || {}

  const navigate = useNavigate()

  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        onClose && onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [tooltipRef])

  return (
    <React.Fragment>
      <Box
        p={2}
        top={90}
        right={50}
        zIndex={1}
        width={210}
        height={118}
        elevation={0}
        ref={tooltipRef}
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
