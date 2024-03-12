import { Store } from '@vgl/stores'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'

interface ReduxProviderProps {
  children?: ReactNode
}

const ReduxProvider = ({ children }: ReduxProviderProps) => (
  <Provider store={Store}>{children}</Provider>
)

export default ReduxProvider
