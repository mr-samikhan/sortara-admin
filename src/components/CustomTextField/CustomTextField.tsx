import React from 'react'
import { Theme } from '@emotion/react'
import { Controller, useFormContext } from 'react-hook-form'
import {
  SxProps,
  MenuItem,
  TextField,
  IconButton,
  SvgIconProps,
  InputAdornment,
} from '@mui/material'

interface CustomTextFieldProps {
  rows?: number
  name: string
  select?: boolean
  disabled?: boolean
  fullWidth?: boolean
  multiline?: boolean
  className?: string
  sx?: SxProps<Theme>
  onClick?: () => void
  placeholder?: string
  defaultValue?: string | number
  type?: 'text' | 'number' | 'password'
  icon?: React.ComponentType<SvgIconProps>
  options?: Array<{ value: string | number; label: string }>
}
export const CustomTextField = (props: CustomTextFieldProps) => {
  const {
    sx,
    name,
    select,
    options,
    onClick,
    className,
    defaultValue,
    icon: Icon,
  } = props || {}

  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <React.Fragment>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ''}
        render={({ field }) => (
          <TextField
            {...props}
            {...field}
            className={className}
            error={!!errors[name]}
            sx={
              sx || {
                ...inputStyle,
                textAlign: 'left',
              }
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {Icon && (
                    <IconButton onClick={onClick}>
                      {Icon && typeof Icon == 'string' && (
                        <img src={Icon} alt="icon" />
                      )}
                      {Icon && typeof Icon !== 'string' && (
                        <Icon onClick={onClick} />
                      )}
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            helperText={errors[name] ? <>{errors[name]?.message}</> : ''}
          >
            {select &&
              options?.map(
                (option: { value: string | number; label: string }) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                )
              )}
          </TextField>
        )}
      />
    </React.Fragment>
  )
}

export default CustomTextField
const inputStyle = {
  '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button':
    {
      '-webkit-appearance': 'none',
      margin: 0,
    },
}
