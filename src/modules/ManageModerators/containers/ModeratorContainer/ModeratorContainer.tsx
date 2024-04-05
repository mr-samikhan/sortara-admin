import { AppLayout } from '@vgl/layout'
import { MODERATOR_CARD_DATA } from '@vgl/constants'
import { ModeratorCard, ModeratorHeader } from '@vgl/modules'

const ModeratorContainer = () => {
  return (
    <AppLayout isHeader isSearchTextField isSidebar>
      <ModeratorHeader
        onAddNewModerator={() => console.log('Add New Moderator')}
        onViewInactiveAdmins={() => console.log('View Inactive Admins')}
      />
      <ModeratorCard data={MODERATOR_CARD_DATA} />
    </AppLayout>
  )
}

export default ModeratorContainer
