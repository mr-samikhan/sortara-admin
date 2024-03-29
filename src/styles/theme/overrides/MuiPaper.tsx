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
      '&.reactions': {
        p: 1,
        width: 45,
        height: 22,
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px',
        justifyContent: 'center',
        border: `1px solid ${COLORS.grey.main}`,
      },
      '&.user-modal': {
        top: '50%',
        padding: 30,
        width: 460,
        left: '50%',
        display: 'flex',
        borderRadius: '4px',
        alignItems: 'center',
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'center',
        transform: 'translate(-50%, -50%)',
      },
      '&.snakbar-style': {
        right: 20,
        width: 450,
        bottom: 20,
        padding: 20,
        color: '#fff',
        position: 'fixed',
        borderRadius: '14px',
        background: '#474747',
        [theme.breakpoints.down('md')]: {
          width: '80%',
        },
      },
      [theme.breakpoints.down('md')]: {},
    }),
  },
}

export default MuiPaper
