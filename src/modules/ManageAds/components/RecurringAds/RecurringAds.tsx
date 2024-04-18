import React from 'react'
import { COLORS } from '@vgl/constants'
import { Box, Chip, Paper } from '@mui/material'

interface RecurringAdsProps {
  label?: string
  options: string[]
}

const RecurringAds = (props: RecurringAdsProps) => {
  const { label, options } = props

  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null)
  return (
    <React.Fragment>
      <Box my={2}>
        <Box
          p={2}
          height={50}
          elevation={0}
          display="flex"
          component={Paper}
          alignItems="center"
          color={COLORS.white}
          bgcolor={COLORS.primary.dark}
        >
          {label || 'Select day (s):'}
        </Box>
        <Box
          my={2}
          display="flex"
          flexWrap="wrap"
          p={2}
          gap={2}
          justifyContent="center"
        >
          {options.map((item, index: number) => (
            <Box
              p={1}
              key={index}
              width={120}
              height={40}
              label={item}
              fontSize={14}
              component={Chip}
              fontWeight={400}
              bgcolor={
                selectedIndex === index ? COLORS.primary.dark : COLORS.white
              }
              color={selectedIndex === index ? COLORS.white : COLORS.black.main}
              onClick={
                selectedIndex === index
                  ? () => setSelectedIndex(null)
                  : () => setSelectedIndex(index)
              }
            />
          ))}
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default RecurringAds
