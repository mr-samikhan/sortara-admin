import { useLogin } from '@vgl/modules'
import { ActionButton } from '../components'
import { COLORS, FONTS, PRIVACY_POLICY } from '@vgl/constants'
import { Box, Container, Grid, IconButton, Typography } from '@mui/material'

const PrivacyPolicy = () => {
  const { onGoBack, onAgree, isLoading } = useLogin({})

  return (
    <Container maxWidth="xl">
      <Grid container justifyContent="center" my={2}>
        <Grid item md={3}>
          <Box my={1}>
            <IconButton onClick={onGoBack}>
              <img src="/assets/icons/back-arrow.svg" alt="back-arrow" />
            </IconButton>
          </Box>
          <Typography
            gutterBottom
            fontSize={28}
            fontWeight={900}
            fontFamily={FONTS.RECOLETA}
            color={COLORS.primary.main}
          >
            Legalities and Privacy Commitments
          </Typography>
          <Box sx={boxStyle}>
            <Typography
              style={fontStyle}
              variant="subtitle1"
              color={COLORS.primary.main}
            >
              <div dangerouslySetInnerHTML={{ __html: PRIVACY_POLICY }} />
            </Typography>
          </Box>
          <Box mt={3}>
            <ActionButton
              onClick={onAgree}
              borderRadius="14px"
              buttonText="I Agree"
              isLoading={isLoading}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default PrivacyPolicy

const boxStyle = {
  height: '586px',
  overflowY: 'auto',
}

const fontStyle = {
  fontFamily: FONTS.DMSANS,
}
