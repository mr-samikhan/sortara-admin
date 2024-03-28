import { COLORS } from '@vgl/constants'
import { Components } from '@mui/material'

export const MuiPaper: Components['MuiPaper'] = {
  styleOverrides: {
    root: ({ theme }: { theme: any }) => ({
      '&.user-dropdown': {
        top: 65,
        right: -10,
        padding: '10px',
        position: 'absolute',
        borderRadius: '8px',
      },
      '&.list-row': {
        padding: '20px',
        borderRadius: '4px',
      },
      '&.row': {
        padding: '20px',
        backgroundColor: COLORS.background,
      },
      [theme.breakpoints.down('md')]: {},
    }),
  },
}

export default MuiPaper
