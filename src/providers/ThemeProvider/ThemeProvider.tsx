import { ReactNode } from 'react'
import { theme } from '@vgl/styles'
import { ThemeProvider as MuiThemeProvider } from '@mui/material'

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
)

export default ThemeProvider
