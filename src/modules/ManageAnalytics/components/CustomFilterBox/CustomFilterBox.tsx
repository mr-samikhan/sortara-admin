import React from 'react'
import { ANALYTICS_FILTER_OPTIONS, COLORS } from '@vgl/constants'
import { InputAdornment, MenuItem, TextField } from '@mui/material'

interface CustomFilterBoxProps {
  value: string
  onChange: (value: string) => void
}

const CustomFilterBox = (props: CustomFilterBoxProps) => {
  const { value, onChange } = props

  return (
    <React.Fragment>
      <TextField
        select
        fullWidth
        value={value}
        sx={inputStyle}
        inputProps={inputProps}
        InputProps={InputProps}
        onChange={(e) => onChange(e.target.value)}
      >
        {ANALYTICS_FILTER_OPTIONS.map((item) => (
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

const InputProps = {
  startAdornment: (
    <InputAdornment
      position="start"
      sx={{
        fontSize: 16,
        fontWeight: 400,
        color: COLORS.grey.dark,
      }}
    >
      Filter Time:
    </InputAdornment>
  ),
}

const inputStyle = {
  '& .MuiOutlinedInput-input': {
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.grey.dark,
  },
  '& .MuiSelect-icon': {
    display: 'none',
  },
}
