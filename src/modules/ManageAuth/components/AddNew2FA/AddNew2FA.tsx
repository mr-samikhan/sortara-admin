import React from 'react'
import 'react-phone-input-2/lib/style.css'
import { ActionButton } from '../components'
import PhoneInput from 'react-phone-input-2'
import { COLORS, FONTS } from '@vgl/constants'
import { CustomTextField } from '@vgl/components'
import { Box, Button, Typography } from '@mui/material'

interface AddNew2FAProps {
  isEmail?: boolean
}

const AddNew2FA = (props: AddNew2FAProps) => {
  const { isEmail } = props || {}
  return (
    <React.Fragment>
      <Box py={4} px={2}>
        <Typography variant="h3">Add New 2FA</Typography>
        <Box mt={2}>
          <Typography fontWeight={700} fontFamily="Inter" variant="subtitle2">
            {isEmail ? 'Email address' : 'Phone Number'}
          </Typography>
          {isEmail ? (
            <CustomTextField
              fullWidth
              name="email"
              placeholder="Enter Email..."
            />
          ) : (
            <Box mt={2}>
              <PhoneInput
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
            </Box>
          )}
        </Box>
        <Box mt={4}>
          <Box my={2}>
            <Button variant="contained" className="rounded-button" fullWidth>
              {isEmail ? 'Switch to Mobile 2FA' : 'Switch to Email 2FA'}
            </Button>
          </Box>
          <Box my={2}>
            <ActionButton buttonText="Update" />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default AddNew2FA
