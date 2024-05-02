import { Routes } from '@vgl/core'
import { useAuth } from '@vgl/hooks'
import { MuiLoader } from '@vgl/components'
import { ThemeProvider } from '@vgl/providers'
import CssBaseline from '@mui/material/CssBaseline'
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {
  const queryClient = new QueryClient()

  const { user, isLoading, isAuthenticated } = useAuth()
  console.log(user, isAuthenticated, '::::user-app')

  if (isLoading) return <MuiLoader />

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
