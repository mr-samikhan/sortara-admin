import { RootState } from '@vgl/stores'
import { useSelector } from 'react-redux'
import {
  AnalyticUsersTab,
  AnalyticAppActivity,
  AnalyticNotifications,
  AnalyticAdvertisments,
} from '../components'

interface RenderTabsUIProps {
  analyticValues?: any
}

const RenderTabsUI = (props: RenderTabsUIProps) => {
  const { analyticValues } = props || {}

  const { tabValue } = useSelector((state: RootState) => state.context)

  switch (tabValue) {
    case 'users':
      return <AnalyticUsersTab />
    case 'in-app-activity':
      return <AnalyticAppActivity analyticValues={analyticValues} />
    case 'advertisements':
      return <AnalyticAdvertisments advertisementValue={analyticValues} />
    case 'notification':
      return <AnalyticNotifications />
  }
}

export default RenderTabsUI
