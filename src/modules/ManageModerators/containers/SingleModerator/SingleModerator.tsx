import { AppLayout } from '@vgl/layout'
import { ICurrentUser } from '@vgl/types'
import { Box, Grid, Typography } from '@mui/material'
import { ACTIVITY_DATA, ROUTES } from '@vgl/constants'
import { formatFirebaseTimestamp } from '@vgl/helpers'
import {
  MuiLoader,
  ActivityList,
  SearchTextField,
  MuiCustomSnackbar,
} from '@vgl/components'
import {
  CustomModal,
  useModerator,
  DetailsModal,
  ModeratorHero,
} from '@vgl/modules'

interface ISingleModerator {
  user: ICurrentUser | null
}

const SingleModerator = (props: ISingleModerator) => {
  const { user } = props

  const {
    methods,
    onGoBack,
    onSubmit,
    isLoading,
    onUpdateLoading,
    moderatorStates,
    setModeratorStates,
  } = useModerator()

  const { isSnackbar, isDetailsModal } = moderatorStates

  if (isLoading) {
    return <MuiLoader />
  }

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
            role={user?.role || ''}
            email={user?.email || ''}
            onGoBack={() => onGoBack(-1)}
            userImage={'/assets/images/profile-image.svg'}
            userName={`${user?.firstName} ${user?.lastName}`}
            joinedAt={formatFirebaseTimestamp(user?.createdAt) || ''}
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
          {isDetailsModal && (
            <CustomModal
              open={isDetailsModal}
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
                isLoading={onUpdateLoading}
                onClose={() => {
                  methods.reset()
                  setModeratorStates((prev) => ({
                    ...prev,
                    isDetailsModal: false,
                  }))
                }}
              />
            </CustomModal>
          )}
          {isSnackbar && (
            <MuiCustomSnackbar
              isIcon={true}
              open={isSnackbar}
              message="Moderator updated"
              description={`${methods.watch('firstName')} ${methods.watch(
                'lastName'
              )} updated successfully`}
              onClose={() =>
                setModeratorStates((prev) => ({
                  ...prev,
                  isSnackbar: false,
                }))
              }
            />
          )}
        </Grid>
      </Grid>
    </AppLayout>
  )
}

export default SingleModerator
