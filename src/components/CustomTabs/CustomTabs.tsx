import React from 'react'
import { tabValue } from '@vgl/stores'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import { COLORS, FONTS, USER_TAB_LABELS } from '@vgl/constants'

interface ICustomTabs {
  onClick: (value: string) => void
}

const CustomTabs = ({ onClick }: ICustomTabs) => {
  const tabs = useSelector(tabValue)
  return (
    <React.Fragment>
      <Box
        display="flex"
        gap={{ xs: 0, md: 8 }}
        width={{ md: 726, xs: 'auto' }}
      >
        {USER_TAB_LABELS.map(({ label, value }, index) => (
          <Box key={index}>
            <Typography
              p={2}
              height={40}
              variant="h4"
              display="flex"
              borderRadius="4px"
              alignItems="center"
              justifyContent="center"
              fontFamily={FONTS.DMSANS}
              sx={{ cursor: 'pointer' }}
              onClick={() => onClick(value)}
              fontWeight={tabs === value ? 700 : 400}
              bgcolor={tabs === value ? COLORS.white : 'transparent'}
            >
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
    </React.Fragment>
  )
}

export default CustomTabs
