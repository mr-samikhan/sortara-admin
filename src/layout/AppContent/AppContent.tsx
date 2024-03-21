import React from 'react'

export interface AppContentProps {
  children: React.ReactNode
}
const AppContent = ({ children }: AppContentProps) => {
  return <React.Fragment>{children}</React.Fragment>
}

export default AppContent
