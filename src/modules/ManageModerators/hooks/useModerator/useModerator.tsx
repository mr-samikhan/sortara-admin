import React from 'react'
import { useForm } from 'react-hook-form'

const useModerator = () => {
  const [moderatorStates, setModeratorStates] = React.useState({
    isAddModal: false,
    isSnackbar: false,
    isEditModal: false,
    isRemoveModal: false,
    isConfirmation: false,
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
    modalToggler,
    moderatorStates,
    setModeratorStates,
  }
}

export default useModerator
