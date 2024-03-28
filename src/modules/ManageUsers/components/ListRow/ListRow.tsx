import React from 'react'
import { FONTS } from '@vgl/constants'
import { Box, Paper, Typography } from '@mui/material'

interface ListRowProps {
  key: number
  listName: string
  onViewClick: () => void
  onRemoveClick: () => void
}

const ListRow = (props: ListRowProps) => {
  const { onViewClick, onRemoveClick, listName } = props || {}

  return (
    <React.Fragment>
      <Paper className="row" sx={{ mt: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            fontWeight={700}
            fontFamily={FONTS.DMSANS}
            fontSize={{ xs: 15, md: '18px' }}
          >
            {listName}
          </Typography>
          <Typography
            sx={textStyle}
            fontWeight={400}
            onClick={onViewClick}
            fontFamily={FONTS.DMSANS}
            fontSize={{ xs: 15, md: '16px' }}
          >
            View
          </Typography>
        </Box>
        <Typography
          sx={textStyle}
          fontWeight={400}
          onClick={onRemoveClick}
          fontFamily={FONTS.DMSANS}
          fontSize={{ xs: 15, md: '16px' }}
        >
          Remove
        </Typography>
      </Paper>
    </React.Fragment>
  )
}

export default ListRow

const textStyle = { cursor: 'pointer' }
