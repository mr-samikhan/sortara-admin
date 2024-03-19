import { COLORS } from '@vgl/constants'
import { Box, Typography } from '@mui/material'

interface ISnackbar {
  open: boolean
  message: string
  onClose: () => void
}

const Snackbar = (props: ISnackbar) => {
  const { message, open, onClose } = props

  return (
    <>
      {open && (
        <Box width="100%" onClick={onClose} sx={boxStyle}>
          <Typography
            variant="h6"
            width="100%"
            textAlign="center"
            color={COLORS.error}
            mt={{ xs: 2, md: 0 }}
          >
            {message}
          </Typography>
        </Box>
      )}
    </>
  )
}

export default Snackbar

const boxStyle = {
  left: '50%',
  position: 'absolute',
  padding: '10px 20px',
  borderRadius: '4px',
  top: { xs: 70, md: 45 },
  transform: 'translateX(-50%)',
}
