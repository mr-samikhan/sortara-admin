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
  DeleteModalUI,
} from '@vgl/modules'

const SingleUserContainer = () => {
  const { state } = useLocation()

  const {
    onRemoveClick,
    onViewClick,
    activeStep,
    userValues,
    onCloseModal,
    modalToggler,
    setUserValues,
    onShowSnackbar,
    onSuspendConfirmation,
  } = useUsers()
  const {
    isSnackbar,
    isResetModal,
    isRemoveModal,
    isDeleteModal,
    isSuspendModal,
    suspendConfirmation,
    terminationConfirmation,
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
              description="Are you sure you want to suspend Brandon Mitchel for 7 days?"
              onConfirm={() => {
                onSuspendConfirmation(false)
                onCloseModal()
                onShowSnackbar(true)
              }}
            />
          )}
          {isDeleteModal && (
            <CustomModal
              open={isDeleteModal}
              title="Deleting account"
              onClose={() => onCloseModal()}
              onConfirm={() => {
                modalToggler('isDeleteModal', false)
                modalToggler('terminationConfirmation', true)
              }}
              description="Are you sure you want to delete Brandon Mitchel’s account? Actions are not reversable."
            />
          )}
          {terminationConfirmation && (
            <CustomModal
              width="481px !important"
              title="Deleting account"
              open={terminationConfirmation}
              onClose={() => onCloseModal()}
              onConfirm={() => {
                modalToggler('isDeleteModal', false)
                modalToggler('terminationConfirmation', true)
              }}
              description="Are you sure you want to delete Brandon Mitchel’s account? Actions are not reversable."
            >
              <DeleteModalUI
                onClose={() => onCloseModal()}
                onTerminate={() => {
                  modalToggler('terminationConfirmation', false)
                  onCloseModal()
                  onShowSnackbar(true)
                }}
              />
            </CustomModal>
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
