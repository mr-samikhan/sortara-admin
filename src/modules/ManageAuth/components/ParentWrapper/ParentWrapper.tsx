import React from 'react'
import { Box, Typography } from '@mui/material'
import { Form } from '@vgl/components'
import { COLORS } from '@vgl/constants'
import { FormTypes } from '@vgl/types'
import { BrandImage } from '@vgl/modules'
import { FormProvider, UseFormReturn } from 'react-hook-form'

interface ParentWrapperProps {
  error?: string
  children: React.ReactNode
  methods: UseFormReturn<FormTypes>
  onSubmit: (data: FormTypes) => void
}

const ParentWrapper = (props: ParentWrapperProps) => {
  const { methods, onSubmit, children, error } = props || {}
  return (
    <React.Fragment>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box p={5} bgcolor={COLORS.background}>
            <BrandImage />
            {error && (
              <Typography color="error" textAlign="center">
                {error}
              </Typography>
            )}
            <Box
              height="80vh"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box border={`2px solid ${COLORS.grey.main}`} width={460} p={4}>
                {children}
              </Box>
            </Box>
          </Box>
        </Form>
      </FormProvider>
    </React.Fragment>
  )
}

export default ParentWrapper
