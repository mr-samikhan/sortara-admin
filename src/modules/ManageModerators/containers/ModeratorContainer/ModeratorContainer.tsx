import { AppLayout } from '@vgl/layout'
import { MODERATOR_CARD_DATA } from '@vgl/constants'
import {
  CustomModal,
  useModerator,
  ModeratorCard,
  ModeratorHeader,
  AddModeratorModal,
} from '@vgl/modules'
import { MuiCustomSnackbar } from '@vgl/components'

const ModeratorContainer = () => {
  const { modalToggler, moderatorStates, methods, onSubmit } = useModerator()
  const { isAddModal, isSnackbar, isEditModal } = moderatorStates

  return (
    <AppLayout isHeader isSearchTextField isSidebar>
      <ModeratorHeader
        onAddNewModerator={() => modalToggler('isAddModal', true)}
        onViewInactiveAdmins={() => console.log('View Inactive Admins')}
      />
      <ModeratorCard
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
            title="Update details"
            buttonText="Update"
            onCancel={() => modalToggler('isEditModal', false)}
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
