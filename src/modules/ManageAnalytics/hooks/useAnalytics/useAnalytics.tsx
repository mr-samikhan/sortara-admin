import { ON_TAB_CHANGE } from '@vgl/stores'
import { useDispatch } from 'react-redux'

const useAnalytics = () => {
  const dispatch = useDispatch()

  const onTabChange = (value: string) => {
    dispatch(ON_TAB_CHANGE(value))
  }
  return { onTabChange }
}

export default useAnalytics
