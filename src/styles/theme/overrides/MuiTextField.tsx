import { Components } from '@mui/material'
import { COLORS } from '@vgl/constants'

export const MuiTextField: Components['MuiTextField'] = {
  defaultProps: {
    variant: 'outlined',
  },
  styleOverrides: {
    root: {
      '& input::placeholder': {
        color: COLORS.grey.dark,
      },
      '& .MuiOutlinedInput-root': {
        backgroundColor: COLORS.white,
        fontSize: 16,
        fontWeight: 400,
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: `1px solid ${COLORS.grey.main}`,
      },
    },
  },
}

export default MuiTextField
