import { Components } from '@mui/material'
import { COLORS, FONTS } from '@vgl/constants'

export const MuiTable: Components['MuiTable'] = {
  styleOverrides: {
    root: ({ theme }: { theme: any }) => ({
      '&.MuiTable-root': {
        '& .MuiTableCell-head': {
          border: 0,
          fontWeight: 700,
          fontFamily: FONTS.DMSANS,
          fontSize: '18px ',
          color: COLORS.black.main,
          [theme.breakpoints.down('md')]: {
            fontSize: '10px',
          },
        },
        '& .MuiTableCell-body': {
          border: 0,
          fontWeight: 400,
          fontSize: '16px',
          fontFamily: FONTS.DMSANS,
          background: COLORS.white,
          color: COLORS.black.dark,
          [theme.breakpoints.down('md')]: {
            fontSize: '10px',
          },

          '&:first-child': {
            borderRadius: '10px 0px 0px 10px !important',
          },
          '&:last-child': {
            borderRadius: '0px 10px 10px 0px !important',
          },
        },
        '& .MuiTableRow-root': {
          height: '20px',
        },

        '& .MuiTableCell-root': {
          padding: '5px 5px',
        },
      },
    }),
  },
}

export default MuiTable
