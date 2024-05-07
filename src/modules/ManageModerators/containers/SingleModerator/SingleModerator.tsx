import { AppLayout } from '@vgl/layout'
import { ACTIVITY_DATA, ROUTES } from '@vgl/constants'
import { Box, Grid, Typography } from '@mui/material'
import { ActivityList, SearchTextField } from '@vgl/components'
import {
  CustomModal,
  DetailsModal,
  ModeratorHero,
  useModerator,
} from '@vgl/modules'

const SingleModerator = () => {
  const { onGoBack, moderatorStates, setModeratorStates, methods, onSubmit } =
    useModerator()

  return (
    <AppLayout>
      <Grid container justifyContent="center">
        <Grid
          item
          md={10}
          xs={12}
          px={{ xs: 2, md: 5, sm: 2 }}
          py={{ xs: 4, md: 5, sm: 2 }}
        >
          <ModeratorHero
            onReset={() => onGoBack(ROUTES.RESET_PASSWORD)}
            onUpdate2FA={() => {
              localStorage.setItem('isUpdate2FA', 'isUpdate2FA')
              onGoBack(ROUTES.LOGIN_2FA)
            }}
            onUpdateDetails={() =>
              setModeratorStates((prev) => ({
                ...prev,
                isDetailsModal: true,
              }))
            }
            onGoBack={() => onGoBack(-1)}
            userName="Riley Whitman"
            email="riley@sortara.com"
            joinedAt="March 2nd, 2025"
            role="Cybersecurity Analyst"
            userImage="/assets/images/profile-image.svg"
          />
          <Box my={2}>
            <Typography variant="body2" my={1}>
              Activity
            </Typography>
            <SearchTextField
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '4px !important',
                },
              }}
            />
          </Box>
          <Box>
            <ActivityList data={ACTIVITY_DATA} />
          </Box>
          {moderatorStates.isDetailsModal && (
            <CustomModal
              open={moderatorStates.isDetailsModal}
              onClose={() =>
                setModeratorStates((prev) => ({
                  ...prev,
                  isDetailsModal: false,
                }))
              }
              sx={{
                '& .MuiDialog-paper': {
                  width: '100%',
                  maxWidth: '100%',
                  borderRadius: '8px',
                },
              }}
            >
              <DetailsModal
                methods={methods}
                onSubmit={onSubmit}
                onClose={() =>
                  setModeratorStates((prev) => ({
                    ...prev,
                    isDetailsModal: false,
                  }))
                }
              />
            </CustomModal>
          )}
        </Grid>
      </Grid>
    </AppLayout>
  )
}

export default SingleModerator
