import { ON_TAB_CHANGE } from '@vgl/stores'
import { useDispatch } from 'react-redux'

const useUsers = () => {
  const dipatch = useDispatch()

  const onTabChange = (value: string) => {
    dipatch(ON_TAB_CHANGE(value))
  }
  return { onTabChange }
}

export default useUsers
