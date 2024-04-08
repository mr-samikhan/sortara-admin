import { AppLayout } from '@vgl/layout'
import { ACTIVITY_DATA } from '@vgl/constants'
import { Box, Grid, Typography } from '@mui/material'
import { ModeratorHero, useModerator } from '@vgl/modules'
import { ActivityList, SearchTextField } from '@vgl/components'

const SingleModerator = () => {
  const { onGoBack } = useModerator()

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
            onGoBack={onGoBack}
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
        </Grid>
      </Grid>
    </AppLayout>
  )
}

export default SingleModerator
