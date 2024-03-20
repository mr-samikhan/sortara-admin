import { ROUTES } from './constants'

const ADMIN_MENUS = [
  {
    path: ROUTES.MODERATORS,
    title: 'Moderators',
  },
  {
    path: ROUTES.USERS,
    title: 'Users',
  },
  {
    path: ROUTES.ADS,
    title: 'Manage Ads',
  },
  {
    path: ROUTES.ANALYTICS || ROUTES.ROOT,
    title: 'Analytics',
  },
]

export default ADMIN_MENUS
