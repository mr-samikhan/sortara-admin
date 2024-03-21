import React from 'react'
import { AppLayout } from '@vgl/layout'

const UsersContainer = () => {
  return (
    <React.Fragment>
      <AppLayout isSidebar isHeader isExportCSV isSearchTextField>
        <>Users</>
      </AppLayout>
    </React.Fragment>
  )
}

export default UsersContainer
