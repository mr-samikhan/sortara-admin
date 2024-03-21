import { COLORS } from '@vgl/constants'
import { Components } from '@mui/material'

export const MuiAvatar: Components['MuiAvatar'] = {
  styleOverrides: {
    root: {
      '&.profile-pic': {
        cursor: 'pointer',
        border: `5px solid ${COLORS.black.dark}`,
        '&:hover': {
          transform: 'scale(1.1)',
        },
      },
    },
  },
}

export default MuiAvatar
