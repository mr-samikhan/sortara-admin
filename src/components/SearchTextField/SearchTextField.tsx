import React from 'react'
import { TextField } from '@mui/material'

interface SearchTextFieldProps {
  value?: string
  className?: string
  fullWidth?: boolean
  placeholder?: string
  sx?: React.CSSProperties | object
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchTextField = (props: SearchTextFieldProps) => {
  const { value, onChange, placeholder, sx } = props || {}
  return (
    <TextField
      sx={sx}
      {...props}
      value={value}
      onChange={onChange}
      variant="outlined"
      className="search-textField"
      InputProps={{
        placeholder: placeholder || 'Search by name, phone number, email...',
        startAdornment: <img src="/assets/icons/search.svg" alt="" />,
      }}
    />
  )
}

export default SearchTextField
