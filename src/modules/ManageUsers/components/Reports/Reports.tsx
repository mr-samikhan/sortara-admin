import React from 'react'
import { Box } from '@mui/material'
import { AppLayout } from '@vgl/layout'
import { FormProvider } from 'react-hook-form'
import { TABLE_REPORTS_HEADERS } from '@vgl/constants'
import { CustomTabs, Form, MuiCustomTable, SortByUI } from '@vgl/components'
import {
  CustomModal,
  SortModalUI,
  FilterModalUI,
  EmailTemplateUI,
  ReportDetailsModal,
} from '@vgl/modules'

interface ReportsProps {
  data: any
  methods: any
  userValues: any
  onCloseModal: () => void
  onSubmit: (data: any) => void
  onTabChange: (value: string) => void
  onRowClick: (row: { id: string }) => void
  modalToggler: (key: string, val: boolean) => void
}

const Reports = (props: ReportsProps) => {
  const {
    data,
    methods,
    onSubmit,
    onTabChange,
    modalToggler,
    onRowClick,
    onCloseModal,
    userValues,
  } = props || {}

  const { isFilterModal, isSortModal, isReportDetails, isEmailTemplate } =
    userValues
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
        {isReportDetails && (
          <CustomModal
            open={isReportDetails}
            width="600px !important"
            onClose={() => modalToggler('isReportDetails', false)}
          >
            <ReportDetailsModal
              onResolve={() => console.log('resolve')}
              onGoBack={() => modalToggler('isReportDetails', false)}
              onMailIconClick={() => modalToggler('isEmailTemplate', true)}
            />
          </CustomModal>
        )}
        {isEmailTemplate && (
          <CustomModal
            open={isEmailTemplate}
            width="600px !important"
            onClose={() => modalToggler('isEmailTemplate', false)}
          >
            <FormProvider {...methods}>
              <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <EmailTemplateUI
                  username="@kelsey"
                  name="Kelsey Bett"
                  phone="+1 000-000-0000"
                  email="example@email.com"
                  userImage="/assets/images/user.png"
                  onClose={() => modalToggler('isEmailTemplate', false)}
                  onGoBack={() => modalToggler('isEmailTemplate', false)}
                />
              </Form>
            </FormProvider>
          </CustomModal>
        )}
      </AppLayout>
    </React.Fragment>
  )
}

export default Reports
