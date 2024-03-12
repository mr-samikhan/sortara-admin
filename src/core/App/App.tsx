import { Routes } from '@vgl/core'
import { QueryClient, QueryClientProvider } from 'react-query'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@vgl/providers'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
