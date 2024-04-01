import React from 'react'
import { useSteps } from '@vgl/hooks'
import { ROUTES } from '@vgl/constants'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ON_REMOVE_ITEM, ON_TAB_CHANGE, ON_VIEW_ITEM } from '@vgl/stores'

export interface UserValues {
  isEdit: boolean
  isSnackbar?: boolean
  isResetModal: boolean
  isRemoveModal: boolean
  isSuspendModal: boolean
  isDeleteModal?: boolean
  suspendConfirmation: boolean
  terminationConfirmation: boolean
}

const useUsers = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { activeStep, onNext } = useSteps()

  const [userValues, setUserValues] = React.useState<UserValues>({
    isEdit: false,
    isSuspendModal: false,
    isRemoveModal: false,
    isResetModal: false,
    isDeleteModal: false,
    isSnackbar: false,
    suspendConfirmation: false,
    terminationConfirmation: false,
  })

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
    setUserValues((prev) => ({
      ...prev,
      isRemoveModal: true,
    }))
  }

  const onViewClick = (item: any) => {
    dispatch(ON_REMOVE_ITEM(item))
    onNext()
  }

  const onCloseModal = () => {
    setUserValues((prev) => ({
      ...prev,
      isSuspendModal: false,
      isRemoveModal: false,
      isResetModal: false,
      isDeleteModal: false,
      terminationConfirmation: false,
    }))
  }

  const onShowSnackbar = (val: boolean) => {
    setUserValues((prev) => ({
      ...prev,
      isSnackbar: val,
    }))
  }

  const onSuspendConfirmation = (val: boolean) => {
    setUserValues((prev) => ({
      ...prev,
      suspendConfirmation: val,
    }))
  }

  const modalToggler = (modal: string, val: boolean) => {
    setUserValues((prev) => ({
      ...prev,
      [modal]: val,
    }))
  }

  return {
    onTabChange,
    onRowClick,
    activeStep,
    userValues,
    onViewClick,
    setUserValues,
    onRemoveClick,
    modalToggler,
    onCloseModal,
    onShowSnackbar,
    onSuspendConfirmation,
  }
}

export default useUsers
