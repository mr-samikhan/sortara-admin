import { AppLayout } from '@vgl/layout'
import { RootState } from '@vgl/stores'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { MuiCustomSnackbar } from '@vgl/components'
import {
  useUsers,
  CustomModal,
  SuspendUserUI,
  ViewItemDetails,
  UserAccountDetails,
} from '@vgl/modules'

const SingleUserContainer = () => {
  const { state } = useLocation()

  const {
    onRemoveClick,
    onViewClick,
    activeStep,
    userValues,
    onCloseModal,
    setUserValues,
    onShowSnackbar,
    onSuspendConfirmation,
  } = useUsers()
  const {
    isResetModal,
    isRemoveModal,
    isSnackbar,
    isSuspendModal,
    suspendConfirmation,
  } = userValues

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
            userValues={userValues}
            onViewClick={onViewClick}
            setUserValues={setUserValues}
            onRemoveClick={onRemoveClick}
          />
          {isRemoveModal && (
            <CustomModal
              open={isRemoveModal}
              title="Removing item"
              onClose={onCloseModal}
              description="Are you sure you want to delete “ItemName” Actions are not
              reversable."
              onConfirm={() => {
                setUserValues((prev) => ({ ...prev, isRemoveModal: false }))
                onShowSnackbar(true)
              }}
            />
          )}
          {isResetModal && (
            <CustomModal
              position
              open={isResetModal}
              title="Reset Password"
              confirmText="Yes Reset"
              onClose={onCloseModal}
              description="Are you sure you want to reset User Name’s password?"
              onConfirm={() => {
                setUserValues((prev) => ({ ...prev, isResetModal: false }))
                onShowSnackbar(true)
              }}
            />
          )}
          {isSnackbar && (
            <MuiCustomSnackbar
              isIcon={true}
              open={isSnackbar}
              message="Unsuspended Brandon Mitchel"
              onClose={() => onShowSnackbar(false)}
              description="Brandon Mitchel has been unsuspended from the system."
            />
          )}
          {isSuspendModal && (
            <CustomModal
              open={isSuspendModal}
              onClose={onCloseModal}
              width={'481px !important'}
            >
              <SuspendUserUI
                onClose={onCloseModal}
                onCustomSuspension={() =>
                  console.log('Suspended For Custom Days!')
                }
                onSevenDaysSuspension={() => onSuspendConfirmation(true)}
              />
            </CustomModal>
          )}
          {suspendConfirmation && (
            <CustomModal
              open={suspendConfirmation}
              title="Suspend Brandon Mitchel"
              onClose={() => onSuspendConfirmation(false)}
              onConfirm={() => {
                onSuspendConfirmation(false)
                onCloseModal()
                onShowSnackbar(true)
              }}
              description="Are you sure you want to suspend Brandon Mitchel for 7 days?"
            />
          )}
        </AppLayout>
      )

    case 1:
      return (
        <>
          <ViewItemDetails data={rowData} />
        </>
      )
  }
}

export default SingleUserContainer
