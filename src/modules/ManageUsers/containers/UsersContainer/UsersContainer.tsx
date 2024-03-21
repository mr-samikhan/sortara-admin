import React from 'react'
import { Box } from '@mui/material'
import { AppLayout } from '@vgl/layout'
import { useUsers } from '@vgl/modules'
import { TABLE_DATA } from '@vgl/constants'
import { CustomTabs, MuiCustomTable } from '@vgl/components'

const UsersContainer = () => {
  const { onTabChange } = useUsers()
  return (
    <React.Fragment>
      <AppLayout isSidebar isHeader isExportCSV isSearchTextField>
        <Box my={2}>
          <CustomTabs onClick={onTabChange} />
        </Box>
        <Box width={{ xs: '100%', sm: '100%', md: 'auto' }} overflow="auto">
          <MuiCustomTable
            data={TABLE_DATA}
            onRowClick={(item) => console.log(item)}
          />
        </Box>
      </AppLayout>
    </React.Fragment>
  )
}

export default UsersContainer
