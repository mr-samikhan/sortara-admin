import React from 'react'
import { Routes } from '@vgl/core'
import { useAuth } from '@vgl/hooks'
import { ThemeProvider } from '@vgl/providers'
import { useNavigate } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {
  const queryClient = new QueryClient()
  const navigate = useNavigate()

  const { user, isLoading } = useAuth()

  React.useEffect(() => {
    if (!isLoading && user?.isPhoneVerified) {
      navigate('/users')
    }
    // eslint-disable-next-line
  }, [])

  if (isLoading) return <div>Loading...</div>

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
