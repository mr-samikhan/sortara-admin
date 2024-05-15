import React from 'react'
import { TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { ON_SEARCH_CHANGE } from '@vgl/stores'

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

  const dispatch = useDispatch()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(ON_SEARCH_CHANGE(e.target.value))
  }

  return (
    <TextField
      sx={sx}
      {...props}
      value={value}
      variant="outlined"
      className="search-textField"
      onChange={onChange || handleInputChange}
      InputProps={{
        placeholder: placeholder || 'Search by name, phone number, email...',
        startAdornment: <img src="/assets/icons/search.svg" alt="" />,
      }}
    />
  )
}

export default SearchTextField
