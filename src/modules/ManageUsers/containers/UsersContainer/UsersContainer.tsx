import React from 'react'
import { Box } from '@mui/material'
import { AppLayout } from '@vgl/layout'
import { RootState } from '@vgl/stores'
import { useSelector } from 'react-redux'
import { CustomTabs, MuiCustomTable, SortByUI } from '@vgl/components'
import { useUsers, Reports, FilterModalUI, SortModalUI } from '@vgl/modules'
import {
  TAB_VALUES,
  TABLE_DATA,
  TABLE_HEADERS,
  TABLE_REPORTS_DATA,
  SUSPENDED_USER_DATA,
  SUSPENDED_USER_HEADER,
} from '@vgl/constants'

const UsersContainer = () => {
  const {
    methods,
    onSubmit,
    onRowClick,
    userValues,
    onTabChange,
    modalToggler,
    onCloseModal,
    onResolveReport,
  } = useUsers()
  const { isFilterModal, isSortModal, isReportDetails } = userValues

  const { tabValue } = useSelector((state: RootState) => state.context)

  const sortedReports: any = [...TABLE_REPORTS_DATA].sort(
    (a, b) => new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
  )

  const groupedByDate: any = sortedReports.reduce((acc: any, report: any) => {
    const dateKey = new Date(report.createdAt).toDateString()
    if (!acc[dateKey]) {
      acc[dateKey] = []
    }
    acc[dateKey].push(report)
    return acc
  }, {})

  switch (tabValue) {
    case TAB_VALUES.USERS:
    case TAB_VALUES.RESOLVED:
    case TAB_VALUES.SUSPENDED_USERS:
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
              {tabValue !== TAB_VALUES.USERS && (
                <SortByUI
                  onFilterClick={() =>
                    modalToggler('isFilterModal', !isFilterModal)
                  }
                  onSortClick={() => modalToggler('isSortModal', true)}
                />
              )}
            </Box>
            <Box
              mt={5}
              position="relative"
              overflow={isFilterModal ? 'none' : 'auto  '}
              width={{ xs: '100%', sm: '100%', md: 'auto' }}
            >
              <MuiCustomTable
                headerData={
                  tabValue === TAB_VALUES.SUSPENDED_USERS
                    ? SUSPENDED_USER_HEADER
                    : TABLE_HEADERS
                }
                isHeader={tabValue !== TAB_VALUES.SUSPENDED_USERS}
                isAction={tabValue === TAB_VALUES.USERS}
                data={
                  tabValue === TAB_VALUES.SUSPENDED_USERS
                    ? SUSPENDED_USER_DATA
                    : TABLE_DATA
                }
                onRowClick={onRowClick}
              />
              {isFilterModal && (
                <FilterModalUI
                  isContent={
                    tabValue === TAB_VALUES.SUSPENDED_USERS ||
                    tabValue === TAB_VALUES.RESOLVED
                      ? false
                      : true
                  }
                  isStatus={tabValue === TAB_VALUES.RESOLVED ? false : true}
                />
              )}
            </Box>
            {isSortModal && <SortModalUI onClose={onCloseModal} />}
          </AppLayout>
        </React.Fragment>
      )
    case TAB_VALUES.REPORTS:
      return (
        <Reports
          methods={methods}
          onSubmit={onSubmit}
          data={groupedByDate}
          userValues={userValues}
          onTabChange={onTabChange}
          modalToggler={modalToggler}
          onCloseModal={onCloseModal}
          onResolveReport={onResolveReport}
          onRowClick={() => modalToggler('isReportDetails', !isReportDetails)}
        />
      )
  }
}

export default UsersContainer
