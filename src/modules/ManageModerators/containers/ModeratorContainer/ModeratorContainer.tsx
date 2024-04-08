import { AppLayout } from '@vgl/layout'
import { MuiCustomSnackbar } from '@vgl/components'
import { COLORS, MODERATOR_CARD_DATA } from '@vgl/constants'
import {
  CustomModal,
  useModerator,
  ModeratorCard,
  ModeratorHeader,
  AddModeratorModal,
  RemoveConfirmModal,
} from '@vgl/modules'

const ModeratorContainer = () => {
  const { modalToggler, moderatorStates, methods, onSubmit, onRowClick } =
    useModerator()
  const { isAddModal, isSnackbar, isEditModal, isRemoveModal, isConfirmation } =
    moderatorStates

  return (
    <AppLayout isHeader isSearchTextField isSidebar>
      <ModeratorHeader
        onAddNewModerator={() => modalToggler('isAddModal', true)}
        onViewInactiveAdmins={() => console.log('View Inactive Admins')}
      />
      <ModeratorCard
        onSingleItem={onRowClick}
        data={MODERATOR_CARD_DATA}
        onUpdateDetails={() => modalToggler('isEditModal', true)}
        onResetPassword={(item) => console.log('Reset Password', item)}
      />
      {isAddModal && (
        <CustomModal
          open={isAddModal}
          onClose={() => modalToggler('isAddModal', false)}
        >
          <AddModeratorModal
            methods={methods}
            onSubmit={onSubmit}
            onCancel={() => modalToggler('isAddModal', false)}
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
            onRemove={() => modalToggler('isRemoveModal', true)}
            onCancel={() => modalToggler('isEditModal', false)}
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

      {isSnackbar && (
        <MuiCustomSnackbar
          isIcon
          descWidth="auto"
          open={isSnackbar}
          message="New Moderator added!"
          sx={{ width: '600px !important' }}
          onClose={() => modalToggler('isSnackbar', false)}
          description="Riley Whitman has been successfully added as a Moderator. We have sent them an invite email to set up their account."
        />
      )}
    </AppLayout>
  )
}

export default ModeratorContainer
