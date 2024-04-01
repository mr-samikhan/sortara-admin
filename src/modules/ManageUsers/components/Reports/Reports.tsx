import React from 'react'
import { Box } from '@mui/material'
import { AppLayout } from '@vgl/layout'
import { SortModalUI, FilterModalUI } from '@vgl/modules'
import { CustomTabs, MuiCustomTable, SortByUI } from '@vgl/components'
import { TABLE_REPORTS_HEADERS } from '@vgl/constants'

interface ReportsProps {
  userValues: any
  data: any
  onCloseModal: () => void
  onTabChange: (value: string) => void
  onRowClick: (row: { id: string }) => void
  modalToggler: (key: string, val: boolean) => void
}

const Reports = (props: ReportsProps) => {
  const {
    onTabChange,
    modalToggler,
    onCloseModal,
    onRowClick,
    data,
    userValues,
  } = props || {}

  const { isFilterModal, isSortModal } = userValues
  return (
    <React.Fragment>
      <AppLayout isSidebar isHeader isExportCSV isSearchTextField>
        <Box
          my={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection={{ xs: 'column', md: 'row' }}
        >
          <CustomTabs onClick={onTabChange} />
          <SortByUI
            onFilterClick={() => modalToggler('isFilterModal', true)}
            onSortClick={() => modalToggler('isSortModal', true)}
          />
        </Box>
        {!isFilterModal && (
          <Box
            mt={7}
            overflow="auto"
            width={{ xs: '100%', sm: '100%', md: 'auto' }}
          >
            <MuiCustomTable
              isSplit
              onRowClick={onRowClick}
              reportsData={data}
              headerData={TABLE_REPORTS_HEADERS}
            />
          </Box>
        )}
        {isFilterModal && (
          <Box position="relative">
            <FilterModalUI isContent isStatus />
          </Box>
        )}
        {isSortModal && <SortModalUI onClose={onCloseModal} />}
      </AppLayout>
    </React.Fragment>
  )
}

export default Reports
