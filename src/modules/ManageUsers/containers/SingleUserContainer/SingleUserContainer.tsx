import { AppLayout } from '@vgl/layout'
import { RootState } from '@vgl/stores'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { UserAccountDetails, ViewItemDetails, useUsers } from '@vgl/modules'

const SingleUserContainer = () => {
  const { state } = useLocation()

  const { onRemoveClick, onViewClick, activeStep } = useUsers()

  const { rowData } = useSelector((state: RootState) => state.context)
  console.log('rowData', rowData)

  switch (activeStep) {
    case 0:
      return (
        <AppLayout
          isHeader
          isSidebar
          isNavigationIcon
          navigationText=" "
          px={{ xs: 2, md: 20 }}
        >
          <UserAccountDetails
            user={state}
            onViewClick={onViewClick}
            onRemoveClick={onRemoveClick}
          />
        </AppLayout>
      )

    case 1:
      return <ViewItemDetails data={rowData} />
  }
}

export default SingleUserContainer
