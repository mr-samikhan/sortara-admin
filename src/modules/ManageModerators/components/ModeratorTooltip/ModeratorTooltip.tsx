import React from 'react'
import { Box, Paper, Typography } from '@mui/material'

interface ModeratorTooltipProps {
  onClose?: () => void
  onResetPassword: () => void
  onUpdateDetails: () => void
}

const ModeratorTooltip = (props: ModeratorTooltipProps) => {
  const { onClose, onResetPassword, onUpdateDetails } = props || {}

  const tooltipRef = React.useRef<HTMLDivElement>(null)
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        onClose && onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <React.Fragment>
      <Box
        p="10px"
        width={210}
        height={112}
        display="flex"
        ref={tooltipRef}
        component={Paper}
        alignItems="center"
        flexDirection="column"
        border="1px solid #FAFAFA"
        boxShadow="box-shadow: 0px 4px 21.2px 0px #0000001A"
      >
        {['Update Details', 'Reset Password'].map((option) => (
          <Typography
            height={44}
            variant="body2"
            onClick={() => {
              setSelectedValue(option)
              if (option === 'Update Details') {
                onUpdateDetails()
              } else {
                onResetPassword()
              }
            }}
            fontWeight={selectedValue === option ? 700 : 400}
          >
            {option}
          </Typography>
        ))}
      </Box>
    </React.Fragment>
  )
}

export default ModeratorTooltip
