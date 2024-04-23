import React from 'react'
import { COLORS } from '@vgl/constants'
import { MenuItem, TextField } from '@mui/material'

const CustomFilterBox = () => {
  return (
    <React.Fragment>
      <TextField
        select
        fullWidth
        inputProps={inputProps}
        sx={{
          '& .MuiOutlinedInput-input': {},
          '& .MuiSelect-icon': {
            display: 'none',
          },
        }}
      >
        {[
          'All',
          'Today',
          'Yesterday',
          'Last 7 days',
          'Last 30 days',
          'Custom',
        ].map((item) => (
          <MenuItem value={item} className="analytics-dropdown">
            {item}
          </MenuItem>
        ))}
      </TextField>
    </React.Fragment>
  )
}

export default CustomFilterBox

const inputProps = {
  MenuProps: {
    sx: {
      marginTop: 1,
      '& .MuiPaper-root': {
        boxShadow: 'none',
        borderRadius: '14px',
        border: `1px solid ${COLORS.grey.main}`,
      },
    },
  },
}
