import React from 'react'
import { ROUTES } from '@vgl/constants'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const useModerator = () => {
  const navigate = useNavigate()

  const [moderatorStates, setModeratorStates] = React.useState({
    isAddModal: false,
    isSnackbar: false,
    isEditModal: false,
    isRemoveModal: false,
    isConfirmation: false,
    isInactiveAdmins: false,
    isDetailsModal: false,
  })

  const methods = useForm({
    defaultValues: {
      firstName: moderatorStates.isEditModal ? 'Riley' : '',
      lastName: '',
      email: '',
      phone: '',
      role: '',
    },
  })

  React.useEffect(() => {
    if (moderatorStates.isEditModal) {
      methods.setValue('firstName', 'Riley')
    }
  }, [moderatorStates.isEditModal])

  const modalToggler = (key: string, val: boolean) => {
    setModeratorStates((prevState) => ({
      ...prevState,
      [key]: val,
    }))
  }

  const onRowClick = (id: string) => {
    navigate(`${ROUTES.MODERATOR}${id}`)
  }

  const onGoBack = (path: string | number) => {
    navigate(path)
  }

  const onSubmit = (data: unknown) => {
    setModeratorStates({
      ...moderatorStates,
      isAddModal: false,
      isEditModal: false,
      isConfirmation: false,
      isSnackbar: true,
    })
    console.log(data)
  }

  return {
    methods,
    onSubmit,
    onGoBack,
    onRowClick,
    modalToggler,
    moderatorStates,
    setModeratorStates,
  }
}

export default useModerator
