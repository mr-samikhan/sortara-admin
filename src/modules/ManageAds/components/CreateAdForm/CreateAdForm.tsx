import React from 'react'
import { COLORS, FONTS } from '@vgl/constants'
import { FormProvider } from 'react-hook-form'
import { CustomTextField, Form } from '@vgl/components'
import { Box, Button, Grid, Typography } from '@mui/material'

interface CreateAdFormProps {
  methods: any
  onSubmit: any
}

const CreateAdForm = (props: CreateAdFormProps) => {
  const { methods, onSubmit } = props
  return (
    <React.Fragment>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container justifyContent="center" mt={15} spacing={5}>
            <Grid item md={5}>
              <Typography
                my={2}
                variant="h1"
                fontWeight={900}
                fontFamily={FONTS.RECOLETA}
              >
                Create a new advertisement
              </Typography>
              <Box
                gap={2}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <CustomTextField
                  fullWidth
                  name="location"
                  placeholder="Location for Advertisement"
                />
                <CustomTextField name="title" placeholder="Title" fullWidth />
                <CustomTextField
                  name="website"
                  placeholder="Website URL"
                  fullWidth
                />
                <CustomTextField
                  name="start-end-date"
                  placeholder="Start Date (mm/dd/year)  - End Date (mm/dd/year )"
                  fullWidth
                />
                <CustomTextField
                  name="rank"
                  placeholder="Priority Ranking (Show occassionally, etc)"
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item md={5}>
              <Box display="flex" gap={2} my={2}>
                <Box
                  disabled
                  fullWidth
                  height={50}
                  color="primary"
                  component={Button}
                  variant="contained"
                  borderRadius="16px"
                >
                  Go Live
                </Box>
                <Box
                  type="submit"
                  fullWidth
                  height={50}
                  color="primary"
                  component={Button}
                  borderRadius="16px"
                  variant="contained"
                  bgcolor={COLORS.pear}
                  startIcon={<img src="/assets/icons/save-alt.svg" />}
                >
                  Save
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Form>
      </FormProvider>
    </React.Fragment>
  )
}

export default CreateAdForm
