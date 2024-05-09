import React from 'react'
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'
import { CustomTextField, Form } from '@vgl/components'
import { Controller, FormProvider } from 'react-hook-form'
import { Box, Button, Paper, Typography } from '@mui/material'
import { COLORS, FONTS, VALIDATION_PATTERNS } from '@vgl/constants'

interface DetailsModalProps {
  methods: any
  isLoading: boolean
  onClose: () => void
  onSubmit: (data: unknown) => void
}

const DetailsModal = (props: DetailsModalProps) => {
  const { onSubmit, methods, onClose, isLoading } = props
  return (
    <React.Fragment>
      <FormProvider {...methods}>
        <Form
          onSubmit={methods.handleSubmit((data: unknown) => {
            onSubmit(data)
          })}
        >
          <Box component={Paper} elevation={0} p={3}>
            <Typography variant="h2">Update Details</Typography>
            <Box my={2} maxHeight={550} overflow="auto">
              <Typography my={1} variant="body2" color={COLORS.black.dark}>
                First name
              </Typography>
              <CustomTextField
                fullWidth
                name="firstName"
                placeholder="Enter first name..."
              />
              <Typography variant="body2" color={COLORS.black.dark} my={1}>
                Last name
              </Typography>
              <CustomTextField
                fullWidth
                name="lastName"
                placeholder="Enter last name..."
              />
              <Typography variant="body2" color={COLORS.black.dark} my={1}>
                Email address
              </Typography>
              <CustomTextField
                fullWidth
                name="email"
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: VALIDATION_PATTERNS.EMAIL,
                    message:
                      'Invalid email address input. Please re-enter email again.',
                  },
                }}
                placeholder="Enter email address..."
              />
              <Typography variant="body2" color={COLORS.black.dark} my={1}>
                Phone Number
              </Typography>
              <Controller
                name="phone"
                control={methods.control}
                render={({ field }) => (
                  <PhoneInput
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    containerStyle={{
                      height: 50,
                      width: '100%',
                    }}
                    inputStyle={{
                      height: 50,
                      width: '100%',
                      fontSize: 16,
                      fontWeight: 700,
                      borderRadius: 4,
                      fontFamily: FONTS.DMSANS,
                      color: COLORS.grey.dark,
                    }}
                    buttonStyle={{
                      borderRight: 'none',
                      backgroundColor: '#FFFF',
                    }}
                    country={'us'}
                  />
                )}
              />
              {
                //show error message
                methods.watch('phone') === '' && (
                  <Typography color="error" variant="caption">
                    Phone number is required
                  </Typography>
                )
              }
              <Typography variant="body2" color={COLORS.black.dark} my={1}>
                Job Title
              </Typography>
              <CustomTextField
                fullWidth
                name="job"
                placeholder="Enter job title..."
              />
            </Box>
            <Box my={2} display="flex" gap={2}>
              <Box
                p={1}
                fullWidth
                component={Button}
                variant="outlined"
                onClick={onClose}
                border="2px solid"
                color={COLORS.black.dark}
                borderColor={COLORS.black.dark}
              >
                Cancle
              </Box>
              <Box
                fullWidth
                type="submit"
                component={Button}
                variant="contained"
                disabled={isLoading}
                bgcolor={COLORS.black.dark}
              >
                {isLoading ? 'Loading...' : 'Confirm Changes'}
              </Box>
            </Box>
          </Box>
        </Form>
      </FormProvider>
    </React.Fragment>
  )
}

export default DetailsModal
