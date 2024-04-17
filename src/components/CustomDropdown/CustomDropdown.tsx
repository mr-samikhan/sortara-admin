import React from 'react'
import { Box, MenuItem, TextField, Typography } from '@mui/material'
import { COLORS } from '@vgl/constants'

interface CustomDropdownProps {
  options: string[]
  error?: boolean
  helperText?: string
  optionsTitle?: string
}

const CustomDropdown = (props: CustomDropdownProps) => {
  const { options, error, helperText, optionsTitle, ...rest } = props

  return (
    <React.Fragment>
      <TextField
        select
        fullWidth
        error={error}
        sx={inputStyle}
        inputProps={inputProps}
        helperText={helperText}
        {...rest}
      >
        {options.map((item, index) => (
          <MenuItem key={index} className="custom-dropdown" value={item}>
            {item}
          </MenuItem>
        ))}
        <Box position="absolute" top={5} textAlign="center" width="100%">
          <Typography
            variant="body2"
            textAlign="center"
            color={COLORS.primary.dark}
          >
            {optionsTitle}
          </Typography>
        </Box>
      </TextField>
    </React.Fragment>
  )
}

export default CustomDropdown

const inputStyle = {
  '& .MuiSelect-iconOutlined': {
    display: 'none',
  },
}

const inputProps = {
  MenuProps: {
    sx: {
      marginTop: 2,
      '& .MuiList-root': {
        pt: '38px !important',
      },
    },
  },
}
