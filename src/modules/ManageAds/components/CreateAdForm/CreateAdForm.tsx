import React from 'react'
import { UploadImageButton } from '../components'
import { Controller, FormProvider } from 'react-hook-form'
import { Box, Button, Grid, Typography } from '@mui/material'
import { CustomDropdown, CustomTextField, Form } from '@vgl/components'
import {
  COLORS,
  FONTS,
  ADV_RANK_OPTIONS,
  ADV_LOCATION_OPTIONS,
} from '@vgl/constants'

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
                <Controller
                  name="location"
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomDropdown
                      {...field}
                      options={ADV_LOCATION_OPTIONS}
                      optionsTitle="Location for advertisement"
                      error={methods?.formState?.errors?.location}
                      helperText={
                        methods?.formState?.errors?.location &&
                        'Location Required'
                      }
                    />
                  )}
                />
                <CustomTextField name="title" placeholder="Title" fullWidth />
                <CustomTextField
                  fullWidth
                  name="website"
                  placeholder="Website URL"
                />
                <CustomTextField
                  fullWidth
                  name="start-end-date"
                  placeholder="Start Date (mm/dd/year)  - End Date (mm/dd/year )"
                />
                <Controller
                  name="rank"
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomDropdown
                      {...field}
                      optionsTitle="Priority Ranking"
                      options={ADV_RANK_OPTIONS}
                      error={methods?.formState?.errors?.rank}
                      helperText={
                        methods?.formState?.errors?.rank && 'Rank Required'
                      }
                    />
                  )}
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
                  sx={{
                    color: COLORS.black.main,
                  }}
                  startIcon={<img src="/assets/icons/save-alt.svg" />}
                >
                  Save
                </Box>
              </Box>
              <Box my={2}>
                <Typography variant="h3" fontFamily={FONTS.DMSANS}>
                  Images
                </Typography>
                <Box my={2}>
                  <UploadImageButton title="Image for Web" />
                </Box>
                <Box my={2}>
                  <UploadImageButton title="Image for Mobile" />
                </Box>
                <Box my={2}>
                  <UploadImageButton title="Image for Tablet" />
                </Box>
                <Box my={2}>
                  <UploadImageButton
                    buttonText="Add a button"
                    bgcolor={COLORS.lightIndigo}
                    title="(optional) Add a Button"
                  />
                </Box>
                <Box my={2}>
                  <Typography variant="h3" fontFamily={FONTS.DMSANS}>
                    Target Users
                  </Typography>
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
