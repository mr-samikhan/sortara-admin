import { App } from '@vgl/core'
import ReactDOM from 'react-dom/client'
import { ReduxProvider } from '@vgl/providers'
import { BrowserRouter } from 'react-router-dom'
import './styles/common.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReduxProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>
)
