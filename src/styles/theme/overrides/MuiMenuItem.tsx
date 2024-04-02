import { Components } from '@mui/material'
import { COLORS, FONTS } from '@vgl/constants'

export const MuiMenuItem: Components['MuiMenuItem'] = {
  styleOverrides: {
    root: {
      '&.custom-menuItem': {
        '&.MuiMenuItem-root': {
          margin: 'auto',
          width: 232,
          height: 34,
          fontSize: 20,
          display: 'flex',
          fontWeight: 400,
          alignSelf: 'center',
          justifyContent: 'center',
          fontFamily: FONTS.DMSANS,
        },
        '&.Mui-selected': {
          fontSize: 20,
          fontWeight: 700,
          borderRadius: '14px',
          fontFamily: FONTS.LATO,
          background: COLORS.magenta,
        },
      },
      '&.report-menuItem': {
        '&.MuiMenuItem-root': {
          margin: 'auto',
          display: 'flex',
          padding: '10px',
          borderRadius: '14px',
          justifyContent: 'center',
          background: 'transparent',
        },
        '&.Mui-selected': {
          fontSize: 20,
          fontWeight: 700,
          borderRadius: '14px',
          fontFamily: FONTS.LATO,
        },
      },
    },
  },
}
export default MuiMenuItem
