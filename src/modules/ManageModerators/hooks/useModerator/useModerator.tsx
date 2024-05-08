import React from 'react'
import { ROUTES } from '@vgl/constants'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@vgl/stores'
import { useMutation } from 'react-query'
import { Api } from '@vgl/services'

const useModerator = () => {
  const navigate = useNavigate()

  const { pathname } = useLocation()
  const isCurrentUserRoute = pathname.startsWith('/admin')

  const { user } = useSelector((state: RootState) => state.auth)

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
      firstName:
        moderatorStates.isEditModal || isCurrentUserRoute
          ? user?.firstName
          : '',
      lastName: isCurrentUserRoute ? user?.lastName : '',
      email: isCurrentUserRoute ? user?.email : '',
      phone: isCurrentUserRoute ? user?.phoneNumber : '',
      job: isCurrentUserRoute ? user?.role : '',
    },
  })

  React.useEffect(() => {
    if (moderatorStates.isEditModal) {
      methods.setValue('firstName', 'Riley')
    }
    // eslint-disable-next-line
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

  const onGoBack = (path: any) => {
    navigate(path)
  }

  //update admin
  const { mutate: onUpdateAdmin } = useMutation(Api.admin.updateAdmin, {
    onSuccess: () => console.log('goood'),
    onError: () => console.log('error'),
  })

  const onSubmit = (data: any) => {
    setModeratorStates({
      ...moderatorStates,
      isAddModal: false,
      isEditModal: false,
      isConfirmation: false,
      isSnackbar: true,
    })
    onUpdateAdmin({
      id: user?.uid || '',
      data: {
        firstName: data['firstName'],
        lastName: data['lastName'],
        email: data['email'],
        phoneNumber: data['phone'],
        role: data['job'],
      },
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
