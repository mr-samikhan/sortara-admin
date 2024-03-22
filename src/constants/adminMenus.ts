import { ROUTES } from './constants'

const ADMIN_MENUS = [
  {
    title: 'Moderators',
    path: ROUTES.MODERATORS,
    singlePath: '/moderator',
  },
  {
    title: 'Users',
    path: ROUTES.USERS,
    singlePath: '/user',
  },
  {
    path: ROUTES.ADS,
    singlePath: '/ad',
    title: 'Manage Ads',
  },
  {
    title: 'Analytics',
    singlePath: '/analytics',
    path: ROUTES.ANALYTICS || ROUTES.ROOT,
  },
]

export default ADMIN_MENUS
