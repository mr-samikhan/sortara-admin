import React from 'react'
import { useSteps } from '@vgl/hooks'
import { ROUTES } from '@vgl/constants'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ON_REMOVE_ITEM, ON_TAB_CHANGE, ON_VIEW_ITEM } from '@vgl/stores'

export interface UserValues {
  isEdit: boolean
  isSortModal: boolean
  isSnackbar?: boolean
  isResetModal: boolean
  isRemoveModal: boolean
  isFilterModal: boolean
  isSuspendModal: boolean
  isDeleteModal?: boolean
  isReportDetails: boolean
  isEmailTemplate: boolean
  suspendConfirmation: boolean
  isConfirmationModal: boolean
  terminationConfirmation: boolean
}

const useUsers = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { activeStep, onNext } = useSteps()

  const [userValues, setUserValues] = React.useState<UserValues>({
    isEdit: false,
    isSnackbar: false,
    isSortModal: false,
    isResetModal: false,
    isFilterModal: false,
    isRemoveModal: false,
    isDeleteModal: false,
    isSuspendModal: false,
    isReportDetails: false,
    isEmailTemplate: false,
    suspendConfirmation: false,
    isConfirmationModal: false,
    terminationConfirmation: false,
  })

  const methods = useForm()

  const onTabChange = (value: string) => {
    dispatch(ON_TAB_CHANGE(value))
    onCloseModal()
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
      isFilterModal: false,
      isSortModal: false,
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

  const onResolveReport = (val: string) => {
    if (val === 'resolved') {
      modalToggler('isConfirmationModal', false)
      modalToggler('isReportDetails', false)
      onShowSnackbar(true)
    } else {
      modalToggler('isConfirmationModal', false)
      modalToggler('isReportDetails', false)
      onShowSnackbar(true)
    }
  }

  const onSuspendUser = (val: string) => {
    if (val === 'suspend') {
      modalToggler('isConfirmationModal', false)
      modalToggler('isReportDetails', false)
      modalToggler('isEmailTemplate', false)
      onShowSnackbar(true)
    } else {
      console.log(val)
    }
  }

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return {
    methods,
    onSubmit,
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
    onResolveReport,
    onSuspendUser,
    onSuspendConfirmation,
  }
}

export default useUsers
