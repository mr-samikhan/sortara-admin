import palette from './palette'
import typography from './typography'
import { BoxProps } from '@mui/material/Box'
import MuiTextField from './overrides/MuiTextField'
import createTheme from '@mui/material/styles/createTheme'
import { responsiveFontSizes } from '@mui/material/styles'
import { COLORS } from '@vgl/constants'

declare module '@mui/material/styles' {
  interface Theme {}
  interface Palette {
    dark: {
      main: React.CSSProperties['color']
    }
  }
  interface PaletteOptions {
    dark?: {
      main?: React.CSSProperties['color']
    }
  }
}

declare module '@mui/material/Button' {
  interface ButtonOwnProps {
    light?: boolean
  }
}
declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    dark: true
  }
}
declare module '@mui/material/Chip' {
  interface ChipOwnProps {
    light?: boolean
  }
}
declare module '@mui/material/TextField' {
  interface TextFieldPropsSizeOverrides {
    xs?: true
  }
}
declare module '@mui/material/InputBase' {
  interface InputBasePropsSizeOverrides {
    xs?: true
  }
}

declare module '@mui/material/Grid' {
  interface GridOwnProps {
    vCenter?: boolean
    fullHeight?: boolean
  }
}

declare module '@mui/material/Paper' {
  interface PaperOwnProps extends BoxProps {}
}

let theme = createTheme({
  palette,
  typography: typography,
  components: {
    MuiTextField,
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          fontSize: 16,
          fontWeight: 500,
          fontFamily: 'DM Sans',
          textTransform: 'capitalize',
          '&.rounded-button': {
            height: 48,
            fontWeight: 700,
            borderRadius: '14px',
            color: COLORS.primary.dark,
            background: COLORS.lightIndigo,
            border: `2px solid ${COLORS.primary.dark}`,
          },
        },
      },
    },
  },
})

theme = responsiveFontSizes(theme)

export default theme
