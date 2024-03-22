import { AppLayout } from '@vgl/layout'
import { useLocation } from 'react-router-dom'
import { UserAccountDetails } from '@vgl/modules'

const SingleUserContainer = () => {
  const { state } = useLocation()

  return (
    <AppLayout
      isHeader
      isSidebar
      isNavigationIcon
      navigationText=" "
      px={{ xs: 2, md: 20 }}
    >
      <UserAccountDetails user={state} />
    </AppLayout>
  )
}

export default SingleUserContainer
