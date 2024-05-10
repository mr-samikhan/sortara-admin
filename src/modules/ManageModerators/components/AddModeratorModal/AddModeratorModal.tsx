import React from 'react'
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'
import { COLORS, FONTS } from '@vgl/constants'
import { Controller, FormProvider } from 'react-hook-form'
import { Box, Button, Link, Typography } from '@mui/material'
import { CustomSwitchButton, CustomTextField, Form } from '@vgl/components'

interface AddModeratorModalProps {
  methods: any
  title?: string
  disabled?: boolean
  isLoading?: boolean
  buttonText?: string
  onCancel?: () => void
  onRemove?: () => void
  onSubmit: (data: unknown) => void
}

const AddModeratorModal = (props: AddModeratorModalProps) => {
  const {
    title,
    methods,
    onSubmit,
    onRemove,
    onCancel,
    disabled,
    isLoading,
    buttonText,
  } = props || {}

  return (
    <React.Fragment>
      <Box width="100%">
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            {onRemove && (
              <Box textAlign="center">
                <Link onClick={onRemove} sx={linkStyle}>
                  Remove moderator
                </Link>
              </Box>
            )}
            <Typography mt={1.5} variant="h2">
              {title || 'Add new moderator'}
            </Typography>
            <Typography variant="body2" my={1.5}>
              Moderator Details
            </Typography>
            <Box maxHeight={550} overflow="auto">
              <Box>
                <Typography variant="body2" my={1}>
                  First name
                </Typography>
                <CustomTextField
                  fullWidth
                  name="firstName"
                  placeholder="FirstName"
                />
              </Box>
              <Box>
                <Typography variant="body2" my={1}>
                  Last name
                </Typography>
                <CustomTextField
                  fullWidth
                  name="lastName"
                  placeholder="LastName"
                />
              </Box>
              <Box>
                <Typography variant="body2" my={1}>
                  Email address
                </Typography>
                <CustomTextField
                  fullWidth
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message:
                        'Invalid email address input. Please re-enter email again.',
                    },
                  }}
                  name="email"
                  placeholder="example@email.com"
                />
              </Box>
              <Box>
                <Typography variant="body2" my={1}>
                  Phone Number
                </Typography>
                <Box mt={2}>
                  <Controller
                    name="phone"
                    defaultValue=""
                    render={({ field }) => (
                      <PhoneInput
                        country={'us'}
                        onChange={(value) => field.onChange(value)}
                        //style
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
                      />
                    )}
                  />
                  {methods.formState.errors.phone && (
                    <Typography fontSize={10} color="error">
                      {methods.formState.errors.phone.message}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box>
                <Typography variant="body2" my={1}>
                  Job Title
                </Typography>
                <CustomTextField
                  fullWidth
                  name="jobTitle"
                  placeholder="example job: Marketing Intern"
                />
              </Box>
              <Typography variant="body2" my={1}>
                Permissions
              </Typography>
              <Box my={2} display="flex" justifyContent="space-between">
                <Typography variant="body2">Admin: Inactive</Typography>
                <Controller
                  name="admin"
                  render={({ field: { onChange, value } }) => (
                    <CustomSwitchButton
                      checked={value}
                      onChange={(e) => onChange(e.target.checked)}
                    />
                  )}
                />
              </Box>
              <Typography variant="body2" fontWeight={400}>
                Allows admin to manage permissions for all admins/moderators
              </Typography>
              <Box my={2} display="flex" justifyContent="space-between">
                <Typography variant="body2">
                  Moderation Manager: Inactive
                </Typography>
                <Controller
                  name="moderator"
                  render={({ field: { onChange, value } }) => (
                    <CustomSwitchButton
                      checked={value}
                      onChange={(e) => onChange(e.target.checked)}
                    />
                  )}
                />
                {/* <CustomSwitchButton defaultChecked={false} /> */}
              </Box>
              <Typography my={1} variant="body2" fontWeight={400}>
                Allows moderator to manage Sortara users and advertisement
              </Typography>
            </Box>
            <Box display="flex" gap={2}>
              <Box
                fullWidth
                onClick={onCancel}
                component={Button}
                variant="outlined"
                className="outlined-btn"
                color="#161C20 !important"
                border="2px solid #161C20 !important"
              >
                Cancle
              </Box>
              <Box
                fullWidth
                type="submit"
                component={Button}
                variant="contained"
                bgcolor="#161C20"
                disabled={isLoading || disabled}
              >
                {isLoading ? 'Loading...' : buttonText || 'Add'}
              </Box>
            </Box>
          </Form>
        </FormProvider>
      </Box>
    </React.Fragment>
  )
}

export default AddModeratorModal

const linkStyle = {
  fontSize: 20,
  fontWeight: 700,
  fontFamily: FONTS.LATO,
}
