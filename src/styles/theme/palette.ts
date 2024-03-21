import { COLORS } from '@vgl/constants'
import { PaletteOptions } from '@mui/material/styles'

export const palette: PaletteOptions = {
  background: {
    default: COLORS.background,
  },
  primary: {
    main: COLORS.primary.main,
    dark: COLORS.primary.dark,
  },
  secondary: {
    main: COLORS.pear,
  },
  info: {
    main: COLORS.blue,
    light: COLORS.lightIndigo,
  },
  dark: {
    main: '#000000',
  },
  success: {
    main: COLORS.success,
  },
  warning: {
    main: COLORS.pear,
  },
}

export default palette
