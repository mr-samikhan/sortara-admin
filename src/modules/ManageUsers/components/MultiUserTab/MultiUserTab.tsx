import React from 'react'
import { Box } from '@mui/material'
import { AppLayout } from '@vgl/layout'
import { RootState } from '@vgl/stores'
import { useSelector } from 'react-redux'
import { FormProvider } from 'react-hook-form'
import { UserValues } from '../../hooks/useUsers'
import {
  Form,
  SortByUI,
  CustomTabs,
  MuiCustomTable,
  MuiCustomSnackbar,
} from '@vgl/components'
import {
  SortModalUI,
  CustomModal,
  FilterModalUI,
  EmailTemplateUI,
  SuspendDetailsModal,
  ReportDetailsModal,
} from '@vgl/modules'
import {
  TAB_VALUES,
  TABLE_DATA,
  TABLE_HEADERS,
  SUSPENDED_USER_DATA,
  SUSPENDED_USER_HEADER,
} from '@vgl/constants'

interface MultiUserTabProps {
  methods?: any
  userValues: UserValues
  onCloseModal: () => void
  onSubmit: (data: any) => void
  onTabChange: (value: string) => void
  onSuspendUser: (val: string) => void
  onResolveReport: (val: string) => void
  onRowClick: (row: { id: string }) => void
  modalToggler: (key: string, val: boolean) => void
}

const MultiUserTab = (props: MultiUserTabProps) => {
  const {
    methods,
    onSubmit,
    userValues,
    onRowClick,
    onTabChange,
    onCloseModal,
    modalToggler,
    onSuspendUser,
    onResolveReport,
  } = props || {}

  const {
    isSnackbar,
    isSortModal,
    isFilterModal,
    isReportDetails,
    isEmailTemplate,
    isConfirmationModal,
  } = userValues

  const { tabValue } = useSelector((state: RootState) => state.context)
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
            isHeader={tabValue === TAB_VALUES.USERS}
            isAction={tabValue === TAB_VALUES.USERS}
            data={
              tabValue === TAB_VALUES.SUSPENDED_USERS
                ? SUSPENDED_USER_DATA
                : TABLE_DATA
            }
            onRowClick={
              tabValue !== TAB_VALUES.USERS
                ? () => modalToggler('isReportDetails', true)
                : onRowClick
            }
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
        {/* suspended user tasks */}
        {tabValue === TAB_VALUES.SUSPENDED_USERS && isReportDetails && (
          <CustomModal
            open={isReportDetails}
            width={'600px !important'}
            onClose={() => modalToggler('isReportDetails', false)}
          >
            <SuspendDetailsModal
              onSuspend={() => modalToggler('isConfirmationModal', true)}
              onMailUser={() => modalToggler('isEmailTemplate', true)}
              onGoBack={() => modalToggler('isReportDetails', false)}
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
        {isConfirmationModal && (
          <CustomModal
            title={
              tabValue === TAB_VALUES.SUSPENDED_USERS
                ? 'Suspend User'
                : 'Unresolve Report'
            }
            confirmText="Yes, exit"
            open={isConfirmationModal}
            onConfirm={() =>
              tabValue === TAB_VALUES.SUSPENDED_USERS
                ? onSuspendUser('suspend')
                : onResolveReport('unresolved')
            }
            description="Are you sure you want to exit?"
            onClose={() => modalToggler('isConfirmationModal', false)}
          />
        )}
        {isSnackbar && (
          <MuiCustomSnackbar
            isIcon
            open={isSnackbar}
            message="Saved changes"
            onClose={() => modalToggler('isSnackbar', false)}
            description="Changes made to Megan Thompson suspension"
          />
        )}
        {/* end */}
        {/* resolve user task */}
        {tabValue === TAB_VALUES.RESOLVED && isReportDetails && (
          <CustomModal
            open={isReportDetails}
            width={'600px !important'}
            onClose={() => modalToggler('isReportDetails', false)}
          >
            <ReportDetailsModal
              btnClassName="bordered-btn"
              buttonText="Unresolve Report"
              onGoBack={() => modalToggler('isReportDetails', false)}
              onResolve={() => modalToggler('isConfirmationModal', true)}
              onMailIconClick={() => modalToggler('isEmailTemplate', true)}
            />
          </CustomModal>
        )}
        {/* end */}
      </AppLayout>
    </React.Fragment>
  )
}

export default MultiUserTab
