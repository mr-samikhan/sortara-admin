import { useSteps } from '@vgl/hooks'
import { ROUTES } from '@vgl/constants'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ON_REMOVE_ITEM, ON_TAB_CHANGE, ON_VIEW_ITEM } from '@vgl/stores'

const useUsers = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { activeStep, onNext } = useSteps()

  const onTabChange = (value: string) => {
    dispatch(ON_TAB_CHANGE(value))
  }

  const onRowClick = (item: { id: string }) => {
    navigate(ROUTES.USER.replace(':id', item.id), {
      state: { ...item },
    })
  }

  const onRemoveClick = (item: any) => {
    dispatch(ON_VIEW_ITEM(item))
    onNext()
  }

  const onViewClick = (item: any) => {
    dispatch(ON_REMOVE_ITEM(item))
    onNext()
  }

  return { onTabChange, onRowClick, onRemoveClick, onViewClick, activeStep }
}

export default useUsers
