import { Routes } from '@vgl/core'
import { ThemeProvider } from '@vgl/providers'
import CssBaseline from '@mui/material/CssBaseline'
import { QueryClient, QueryClientProvider } from 'react-query'

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
