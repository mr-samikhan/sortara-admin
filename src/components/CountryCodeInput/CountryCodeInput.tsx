import React from 'react'
import { Typography } from '@mui/material'
import PhoneInput from 'react-phone-input-2'
import { Controller } from 'react-hook-form'
import { COLORS, FONTS } from '@vgl/constants'

interface CountryCodeInputProps {
  name: string
  methods: any
}

const CountryCodeInput = (props: CountryCodeInputProps) => {
  const { name, methods } = props || {}

  return (
    <React.Fragment>
      <Controller
        name={name || 'phone'}
        rules={{
          required: 'Phone number is required',
        }}
        render={({ field }) => (
          <PhoneInput
            country={'us'}
            value={field.value}
            inputStyle={inputStyle}
            buttonStyle={borderStyle}
            containerStyle={containerStyle}
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
      {methods.formState.errors.phone && (
        <Typography fontSize={10} color="error">
          {methods.formState.errors.phone.message}
        </Typography>
      )}
    </React.Fragment>
  )
}

export default CountryCodeInput

const containerStyle = {
  height: 50,
  width: '100%',
}

const inputStyle = {
  height: 50,
  width: '100%',
  fontSize: 16,
  fontWeight: 700,
  borderRadius: 4,
  fontFamily: FONTS.DMSANS,
  color: COLORS.grey.dark,
}

const borderStyle = {
  borderRight: 'none',
  backgroundColor: '#FFFF',
}
