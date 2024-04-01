import React from 'react'
import { COLORS } from '@vgl/constants'
import { Box, Button, Paper, Typography } from '@mui/material'

interface SortByUIProps {
  value?: string
  isFilterBtn?: boolean
  onSortClick?: () => void
  onFilterClick?: () => void
}

const SortByUI = (props: SortByUIProps) => {
  const { value, isFilterBtn, onFilterClick, onSortClick } = props

  return (
    <React.Fragment>
      <Box>
        <Box
          height={48}
          width={270}
          p="18px 20px"
          elevation={0}
          display="flex"
          component={Paper}
          borderRadius="4px"
          alignItems="center"
          onClick={onSortClick}
          border={`1px solid ${COLORS.grey.main}`}
        >
          <Typography variant="h4" color={COLORS.grey.dark}>
            {value || 'Sort by time'}
          </Typography>
        </Box>
        {!isFilterBtn && (
          <Box textAlign="end">
            <Button
              variant="text"
              className="filter-btn"
              onClick={onFilterClick}
            >
              Filter results
            </Button>
          </Box>
        )}
      </Box>
    </React.Fragment>
  )
}

export default SortByUI
