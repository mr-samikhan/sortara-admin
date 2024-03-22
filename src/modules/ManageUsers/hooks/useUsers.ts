import { ROUTES } from '@vgl/constants'
import { ON_TAB_CHANGE } from '@vgl/stores'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const useUsers = () => {
  const dipatch = useDispatch()
  const navigate = useNavigate()

  const onTabChange = (value: string) => {
    dipatch(ON_TAB_CHANGE(value))
  }

  const onRowClick = (item: { id: string }) => {
    navigate(ROUTES.USER.replace(':id', item.id), {
      state: { id: { ...item } },
    })
  }

  return { onTabChange, onRowClick }
}

export default useUsers
