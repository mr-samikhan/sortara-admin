import { Components } from '@mui/material'
import { COLORS, FONTS } from '@vgl/constants'

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
      '&.search-textField': {
        '& .MuiOutlinedInput-root': {
          borderRadius: 30,
          fontFamily: FONTS.DMSANS,
          '& input': {
            height: 40,
            fontSize: 16,
            color: COLORS.grey.dark,
            padding: '10px 0px 10px 10px',
          },
          '& .Mui-focused': {
            backgroundColor: COLORS.grey.light,
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: '1px solid #D0D0D0',
        },
      },
    },
  },
}

export default MuiTextField
