import { AppLayout } from '@vgl/layout'
import { COLORS } from '@vgl/constants'
import { useGetModerators } from '@vgl/hooks'
import { MuiCustomSnackbar, MuiLoader } from '@vgl/components'
import {
  CustomModal,
  useModerator,
  ModeratorCard,
  ModeratorHeader,
  AddModeratorModal,
  RemoveConfirmModal,
  ViewInActiveModal,
} from '@vgl/modules'

const ModeratorContainer = () => {
  const {
    methods,
    onSubmit,
    onRowClick,
    isAddLoading,
    modalToggler,
    moderatorStates,
    onUpdateDetails,
    clearOutValues,
    onUpdateLoading,
    onResetPassword,
  } = useModerator()
  const {
    isAddModal,
    isSnackbar,
    isEditModal,
    selectedItem,
    isRemoveModal,
    isConfirmation,
    isInactiveAdmins,
    newModeratorName,
  } = moderatorStates

  const { moderators, moderatorsLoading } = useGetModerators({})

  if (moderatorsLoading) return <MuiLoader />

  return (
    <AppLayout isHeader isSearchTextField isSidebar>
      <ModeratorHeader
        onAddNewModerator={() => modalToggler('isAddModal', true)}
        onViewInactiveAdmins={() => modalToggler('isInactiveAdmins', true)}
      />
      <ModeratorCard
        data={moderators}
        onSingleItem={onRowClick}
        onUpdateDetails={onUpdateDetails}
        onResetPassword={onResetPassword}
      />
      {isAddModal && (
        <CustomModal
          open={isAddModal}
          onClose={() => modalToggler('isAddModal', false)}
        >
          <AddModeratorModal
            methods={methods}
            onSubmit={onSubmit}
            isLoading={isAddLoading}
            onCancel={() => {
              methods.reset()
              modalToggler('isAddModal', false)
            }}
          />
        </CustomModal>
      )}
      {isEditModal && (
        <CustomModal
          open={isEditModal}
          onClose={() => modalToggler('isEditModal', false)}
        >
          <AddModeratorModal
            methods={methods}
            onSubmit={onSubmit}
            buttonText="Update"
            title="Update details"
            isLoading={onUpdateLoading}
            onRemove={() => modalToggler('isRemoveModal', true)}
            onCancel={() => {
              clearOutValues()
              modalToggler('isEditModal', false)
            }}
          />
        </CustomModal>
      )}

      {isRemoveModal && (
        <CustomModal
          open={isRemoveModal}
          title="Removing Moderator"
          onClose={() => modalToggler('isRemoveModal', false)}
          description="Are you sure? Actions are not reversable."
          cancelSx={{
            border: `2px solid ${COLORS.black.dark} !important`,
            color: `${COLORS.black.dark} !important`,
          }}
          confirmSx={{
            bgcolor: `${COLORS.black.dark} !important`,
          }}
          onConfirm={() => {
            modalToggler('isEditModal', false)
            modalToggler('isRemoveModal', false)
            modalToggler('isConfirmation', true)
          }}
        />
      )}

      {isConfirmation && (
        <CustomModal
          open={isConfirmation}
          onClose={() => modalToggler('isConfirmation', false)}
        >
          <RemoveConfirmModal
            methods={methods}
            onSubmit={onSubmit}
            onCancel={() => modalToggler('isConfirmation', false)}
          />
        </CustomModal>
      )}

      {isInactiveAdmins && (
        <CustomModal
          open={isInactiveAdmins}
          className="inActive-modal"
          sx={{ backgroundColor: 'transparent !important' }}
          onClose={() => modalToggler('isInactiveAdmins', false)}
        >
          <ViewInActiveModal
            onClose={() => modalToggler('isInactiveAdmins', false)}
          />
        </CustomModal>
      )}

      {isSnackbar && (
        <MuiCustomSnackbar
          isIcon
          descWidth="auto"
          open={isSnackbar}
          message="New Moderator added!"
          sx={{ width: '600px !important' }}
          onClose={() => modalToggler('isSnackbar', false)}
          description={`${
            selectedItem?.firstName || newModeratorName
          } has been successfully added as a Moderator. We have sent them an invite email to set up their account.`}
        />
      )}
    </AppLayout>
  )
}

export default ModeratorContainer
