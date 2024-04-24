import React from 'react'
import { useDispatch } from 'react-redux'
import { ON_TAB_CHANGE } from '@vgl/stores'

const useAnalytics = () => {
  const dispatch = useDispatch()

  const [analyticValues, setAnalyticValues] = React.useState({
    value: 'All',
    dropdownValue: '',
  })

  const onTabChange = (value: string) => {
    dispatch(ON_TAB_CHANGE(value))
  }

  const onFilterChange = (value: string) => {
    setAnalyticValues((prev: any) => ({ ...prev, value }))
  }

  const onDropdownChange = (value: string) => {
    setAnalyticValues((prev: any) => ({ ...prev, dropdownValue: value }))
  }

  return { onTabChange, onFilterChange, analyticValues, onDropdownChange }
}

export default useAnalytics
