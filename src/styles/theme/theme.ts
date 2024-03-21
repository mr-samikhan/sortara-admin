import palette from './palette'
import typography from './typography'
import { BoxProps } from '@mui/material/Box'
import MuiTable from './overrides/MuiTable'
import MuiAvatar from './overrides/MuiAvatar'
import MuiButton from './overrides/MuiButton'
import MuiTextField from './overrides/MuiTextField'
import createTheme from '@mui/material/styles/createTheme'
import { responsiveFontSizes } from '@mui/material/styles'

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
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },

  palette,
  typography: typography,
  components: {
    MuiTextField,
    MuiButton,
    MuiAvatar,
    MuiTable,
  },
})

theme = responsiveFontSizes(theme)

export default theme
