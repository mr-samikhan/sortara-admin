import React from 'react'
import { useForm } from 'react-hook-form'

const useModerator = () => {
  const [moderatorStates, setModeratorStates] = React.useState({
    isAddModal: false,
    isSnackbar: false,
    isEditModal: false,
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
    return setModeratorStates({
      ...moderatorStates,
      [key]: val,
    })
  }

  const onSubmit = (data: unknown) => {
    setModeratorStates({
      ...moderatorStates,
      isAddModal: false,
      isEditModal: false,
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
