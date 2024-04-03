import { RootState } from '@vgl/stores'
import { useSelector } from 'react-redux'
import { Reports, useUsers, MultiUserTab } from '@vgl/modules'
import { TAB_VALUES, TABLE_REPORTS_DATA } from '@vgl/constants'

const UsersContainer = () => {
  const {
    methods,
    onSubmit,
    onRowClick,
    userValues,
    onTabChange,
    modalToggler,
    onCloseModal,
    onSuspendUser,
    onResolveReport,
  } = useUsers()

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
        <MultiUserTab
          methods={methods}
          onSubmit={onSubmit}
          userValues={userValues}
          onRowClick={onRowClick}
          onTabChange={onTabChange}
          onCloseModal={onCloseModal}
          modalToggler={modalToggler}
          onSuspendUser={onSuspendUser}
          onResolveReport={onResolveReport}
        />
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
          onRowClick={() =>
            modalToggler('isReportDetails', !userValues.isReportDetails)
          }
        />
      )
  }
}

export default UsersContainer
