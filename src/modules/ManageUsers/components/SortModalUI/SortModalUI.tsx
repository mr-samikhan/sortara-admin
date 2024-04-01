import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { COLORS, FONTS, SORT_MODAL_OPTIONS } from '@vgl/constants'

interface SortModalUIProps {
  onClose?: () => void
}

const SortModalUI = (props: SortModalUIProps) => {
  const { onClose } = props || {}

  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const [selectedValue, setSelectedValue] = React.useState<string | null>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  const onSelectValue = (value: string) => {
    setSelectedValue(value)
  }

  return (
    <Box
      p={4}
      top={220}
      right={60}
      width={300}
      ref={dropdownRef}
      component={Paper}
      position="absolute"
    >
      <Box>
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          color={COLORS.primary.dark}
        >
          Sort by time:
        </Typography>
        {SORT_MODAL_OPTIONS.map((option, index) => (
          <React.Fragment key={index}>
            <Box
              my={1.5}
              textAlign="center"
              onClick={() => onSelectValue(option.value)}
            >
              <Typography
                variant="h5"
                fontFamily={FONTS.LATO}
                fontWeight={selectedValue === option.value ? 700 : 400}
              >
                {option.label}
              </Typography>
            </Box>
            {index === SORT_MODAL_OPTIONS.length - 1 ? (
              <Typography
                variant="h5"
                textAlign="center"
                fontFamily={FONTS.LATO}
                onClick={() => onSelectValue('customDateRange')}
                fontWeight={selectedValue === 'customDateRange' ? 700 : 400}
              >
                Custom Date Range
              </Typography>
            ) : null}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  )
}

export default SortModalUI
