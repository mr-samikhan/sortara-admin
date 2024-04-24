import React from 'react'
import { COLORS } from '@vgl/constants'
import { TextField, Typography } from '@mui/material'

const DateRangePicker = () => {
  return (
    <React.Fragment>
      <TextField placeholder="Month Day, Year" sx={inputStyle} />
      <Typography variant="subtitle2" fontWeight={400}>
        to
      </Typography>
      <TextField placeholder="Month Day, Year" sx={inputStyle} />
    </React.Fragment>
  )
}

export default DateRangePicker

const inputStyle = {
  '& input::placeholder': {
    fontSize: 16,
    fontWeight: 400,
    color: COLORS.grey.dark,
  },
}
