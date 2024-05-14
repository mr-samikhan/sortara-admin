import React from 'react'
import { COLORS, FONTS } from '@vgl/constants'
import { FormProvider } from 'react-hook-form'
import { IModeratorFormValues } from '@vgl/types'
import { Box, Button, Typography } from '@mui/material'
import { CustomTextField, Form } from '@vgl/components'

interface RemoveConfirmModalProps {
  methods: any
  onCancel: () => void
  onSubmit: (data: IModeratorFormValues) => void
}

const RemoveConfirmModal = (props: RemoveConfirmModalProps) => {
  const { onCancel, methods, onSubmit } = props || {}
  return (
    <React.Fragment>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box width="100%">
            <Typography
              variant="body2"
              fontWeight={600}
              textAlign="center"
              fontFamily={FONTS.WORK_SANS}
            >
              Removing moderator
            </Typography>
            <Typography
              textAlign="center"
              variant="subtitle2"
              fontFamily={FONTS.INTER}
            >
              Add a note to why you’re removing admin:
            </Typography>
            <Box my={2}>
              <CustomTextField
                rows={6}
                multiline
                fullWidth
                name="reason"
                placeholder="Type here...."
              />

              <Box my={2} display="flex" gap={3}>
                <Box
                  fullWidth
                  component={Button}
                  variant="outlined"
                  onClick={onCancel}
                  border={`2px solid ${COLORS.black.dark}`}
                >
                  Cancel
                </Box>
                <Box
                  p={1.5}
                  fullWidth
                  type="submit"
                  component={Button}
                  variant="contained"
                  bgcolor={COLORS.black.dark}
                >
                  Terminate Account
                </Box>
              </Box>
            </Box>
          </Box>
        </Form>
      </FormProvider>
    </React.Fragment>
  )
}

export default RemoveConfirmModal
