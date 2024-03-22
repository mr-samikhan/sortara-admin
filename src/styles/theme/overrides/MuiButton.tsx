import { COLORS, FONTS } from '@vgl/constants'
import { Components } from '@mui/material'

export const MuiButton: Components['MuiButton'] = {
  defaultProps: {
    variant: 'contained',
  },
  styleOverrides: {
    root: ({ theme }: { theme: any }) => ({
      fontSize: 16,
      fontWeight: 500,
      fontFamily: 'DM Sans',
      textTransform: 'capitalize',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
      },
      '&.rounded-button': {
        height: 48,
        fontWeight: 700,
        borderRadius: '14px',
        color: COLORS.primary.dark,
        background: COLORS.lightIndigo,
        border: `2px solid ${COLORS.primary.dark}`,
      },
      '&.sidebar-btn': {
        height: 28,
        fontSize: 20,
        fontWeight: 400,
        color: COLORS.blue,
        fontFamily: FONTS.DMSANS,
        padding: '7px 17px 7px 17px',
      },
      '&.selected-sidebar-btn': {
        height: 28,
        fontSize: 20,
        fontWeight: 700,
        color: COLORS.blue,
        fontFamily: FONTS.DMSANS,
        padding: '7px 17px 7px 17px',
        background: COLORS.background,
      },
      '&.text-button': {
        fontSize: 20,
        fontWeight: 700,
        fontFamily: 'Lato',
        textDecoration: 'underline',
        [theme.breakpoints.down('md')]: {
          fontSize: 12,
        },
      },
      '&.outlined-btn': {
        background: 'transparent',
        color: COLORS.primary.dark,
        border: `1px solid ${COLORS.grey.main}`,
      },
    }),
  },
}
export default MuiButton
