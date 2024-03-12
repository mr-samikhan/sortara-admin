import { Routes } from '@vgl/core'
<<<<<<< HEAD

function App() {
  return <Routes />
=======
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
>>>>>>> becaa3c4053ce9019123be9532c4810ee860cd31
}

export default App
