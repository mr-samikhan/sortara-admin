import React from 'react'
import { tabValue } from '@vgl/stores'
import { useSelector } from 'react-redux'
import { useBreakPoints } from '@vgl/hooks'
import { Box, Typography } from '@mui/material'
import { COLORS, FONTS, USER_TAB_LABELS } from '@vgl/constants'

interface IOptions {
  label: string
  value: string
}

interface ICustomTabs {
  color?: string
  bgcolor?: string
  options?: IOptions[]
  onClick: (value: string) => void
}

const CustomTabs = ({ onClick, options, color, bgcolor }: ICustomTabs) => {
  const tabs = useSelector(tabValue)

  const { mobileMode } = useBreakPoints()

  const ARRAY = options || USER_TAB_LABELS
  return (
    <React.Fragment>
      <Box
        display="flex"
        gap={{ xs: 0, md: 2 }}
        width={{ md: 726, xs: 'auto' }}
      >
        {ARRAY.map(({ label, value }, index) => (
          <Box key={index}>
            <Typography
              p={2}
              height={40}
              display="flex"
              borderRadius="4px"
              alignItems="center"
              justifyContent="center"
              fontFamily={FONTS.DMSANS}
              sx={{ cursor: 'pointer' }}
              onClick={() => onClick(value)}
              width={{ xs: 'auto', md: 179 }}
              fontWeight={tabs === value ? 700 : 400}
              variant={mobileMode ? 'subtitle1' : 'h4'}
              color={tabs === value ? color || COLORS.black.main : ''}
              bgcolor={tabs === value ? bgcolor || COLORS.white : 'transparent'}
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
