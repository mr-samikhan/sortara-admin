import { Routes } from '@vgl/core'
import { ThemeProvider } from '@vgl/providers'
import CssBaseline from '@mui/material/CssBaseline'
import { QueryClient, QueryClientProvider } from 'react-query'
// import { useSelector } from 'react-redux'
// import React from 'react'
// import { useNavigate } from 'react-router-dom'

function App() {
  const queryClient = new QueryClient()
  // const navigate = useNavigate()
  // const { isAuthenticated } = useSelector((state: any) => state.auth)

  // React.useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/users')
  //   } else {
  //     navigate('/login')
  //   }
  //   // eslint-disable-next-line
  // }, [])
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
