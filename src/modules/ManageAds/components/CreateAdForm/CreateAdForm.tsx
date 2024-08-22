import React from 'react'
import { useAds } from '@vgl/modules'
import { useBreakPoints } from '@vgl/hooks'
import { useLocation } from 'react-router-dom'
import CheckIcon from '@mui/icons-material/Check'
import { Controller, FormProvider } from 'react-hook-form'
import { RecurringAds, UploadImageButton } from '../components'
import { Box, Button, Grid, IconButton, Typography } from '@mui/material'
import {
  Form,
  CustomDropdown,
  CustomTextField,
  CustomAutoComplete,
  DateRangeInput,
} from '@vgl/components'
import {
  FONTS,
  DAYS,
  TIME,
  COLORS,
  ADV_RANK_OPTIONS,
  ADV_LOCATION_OPTIONS,
} from '@vgl/constants'

interface CreateAdFormProps {
  methods: any
  onSubmit: any
  onLivePress?: () => void
  onDeletePress?: (key: string, val: boolean) => void
}

const CreateAdForm = (props: CreateAdFormProps) => {
  const { methods, onSubmit, onDeletePress, onLivePress } = props

  const { state } = useLocation()

  const { adValues, setAdValues, isLoading } = useAds()

  const { mobileMode } = useBreakPoints()

  return (
    <React.Fragment>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid
            container
            justifyContent="center"
            mt={{
              xs: 0,
              md: 15,
            }}
            spacing={5}
          >
            <Grid item md={5} xs={12}>
              <Box display="flex" gap={2} alignItems="center" my={2}>
                <Typography
                  variant="h1"
                  fontWeight={900}
                  fontFamily={FONTS.RECOLETA}
                >
                  {state?.isEdit ? 'Edit' : 'Create a new'} advertisement
                </Typography>
                {state?.isEdit && (
                  <IconButton
                    onClick={() =>
                      onDeletePress && onDeletePress('isDelete', true)
                    }
                  >
                    <Box component="img" src="/assets/icons/delete-icon.svg" />
                  </IconButton>
                )}
              </Box>
              {mobileMode && (
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
              )}
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
                {/* <CustomTextField
                  fullWidth
                  name="start-end-date"
                  placeholder="Start Date (mm/dd/year)  - End Date (mm/dd/year )"
                /> */}
                <DateRangeInput />
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
              {methods.watch('rank') !== '' && (
                <React.Fragment>
                  <RecurringAds options={DAYS} />
                  <RecurringAds options={TIME} label="Select time (s):" />
                </React.Fragment>
              )}
            </Grid>
            <Grid item md={5} xs={12}>
              {!mobileMode && (
                <Box display="flex" gap={2} my={2}>
                  <Box
                    // disabled
                    fullWidth
                    height={50}
                    color="primary"
                    component={Button}
                    variant="contained"
                    borderRadius="16px"
                    onClick={onLivePress}
                    startIcon={<CheckIcon />}
                    bgcolor={COLORS.blue}
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
                    disabled={isLoading}
                    sx={{
                      color: COLORS.black.main,
                    }}
                    startIcon={<img src="/assets/icons/save-alt.svg" />}
                  >
                    {isLoading ? 'Loading...' : 'Save'}
                  </Box>
                </Box>
              )}
              <Box my={2}>
                <Typography variant="h3" fontFamily={FONTS.DMSANS}>
                  Images
                </Typography>
                {/* <Box my={2}>
                  <UploadImageButton title="Image for Web" />
                </Box>
                <Box my={2}>
                  <UploadImageButton title="Image for Mobile" />
                </Box>
                <Box my={2}>
                  <UploadImageButton title="Image for Tablet" />
                </Box> */}
                {adValues?.buttons.map((option, index) => (
                  <Box my={2} key={index}>
                    <UploadImageButton
                      options={adValues.buttons}
                      index={index}
                      adValues={adValues}
                      setAdValues={setAdValues}
                      title={option.label}
                      buttonText="Add Image"
                    />
                  </Box>
                ))}
                <Box my={2}>
                  <UploadImageButton
                    buttonText="Add a button"
                    bgcolor={COLORS.lightIndigo}
                    title="(optional) Add a Button"
                    adValues={adValues}
                    setAdValues={setAdValues}
                    onClick={() =>
                      setAdValues((prev) => ({
                        ...prev,
                        isaddButton: true,
                        isRemoveButton: true,
                      }))
                    }
                  />
                </Box>
                <Box my={2}>
                  <Typography variant="h3" fontFamily={FONTS.DMSANS}>
                    Target Users
                  </Typography>
                </Box>
                <Box display="flex" gap={2} flexDirection="column">
                  <Controller
                    name="country"
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CustomAutoComplete
                        {...field}
                        name="country"
                        methods={methods}
                        error={methods?.formState?.errors?.country}
                        helperText={
                          methods?.formState?.errors?.country &&
                          'Country Required'
                        }
                      />
                    )}
                  />
                  <Controller
                    name="state"
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CustomAutoComplete
                        {...field}
                        name="state"
                        title="State"
                        methods={methods}
                        placeholder="State"
                        error={methods?.formState?.errors?.state}
                        helperText={
                          methods?.formState?.errors?.state && 'State Required'
                        }
                      />
                    )}
                  />
                  <Controller
                    name="city"
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CustomAutoComplete
                        {...field}
                        title="City"
                        name="city"
                        methods={methods}
                        placeholder="City"
                        error={methods?.formState?.errors?.city}
                        helperText={
                          methods?.formState?.errors?.city && 'City Required'
                        }
                      />
                    )}
                  />
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
