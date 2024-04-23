import { RootState } from '@vgl/stores'
import { useSelector } from 'react-redux'
import {
  AnalyticUsersTab,
  AnalyticAppActivity,
  AnalyticNotifications,
  AnalyticAdvertisments,
} from '../components'

const RenderTabsUI = () => {
  const { tabValue } = useSelector((state: RootState) => state.context)

  switch (tabValue) {
    case 'users':
      return <AnalyticUsersTab />
    case 'in-app-activity':
      return <AnalyticAppActivity />
    case 'advertisements':
      return <AnalyticAdvertisments />
    case 'notification':
      return <AnalyticNotifications />
  }
}

export default RenderTabsUI
