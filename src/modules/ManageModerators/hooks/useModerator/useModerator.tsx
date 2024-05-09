import React from 'react'
import { Api } from '@vgl/services'
import { ROUTES } from '@vgl/constants'
import { updateUser } from '@vgl/stores'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useGetSingleUser } from '@vgl/hooks'
import { useMutation, useQueryClient } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const useModerator = () => {
  const navigate = useNavigate()

  const { id } = useParams()

  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const { pathname } = useLocation()

  const isCurrentUserRoute = pathname.startsWith('/admin')

  const { data: user, isLoading } = useGetSingleUser({
    id: id as string,
    fxn: Api.auth.getUserProfile,
    refetchLabel: 'getSingleAdmin',
  })

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
    mode: 'onChange',
  })

  React.useEffect(() => {
    if ((user && isCurrentUserRoute) || moderatorStates.isDetailsModal) {
      methods.reset({
        job: user.role,
        email: user.email,
        phone: user.phoneNumber,
        lastName: user.lastName,
        firstName: user.firstName,
      })
    }
  }, [user, isCurrentUserRoute, methods, moderatorStates.isDetailsModal])

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
  const {
    error,
    isError,
    mutate: onUpdateAdmin,
    isLoading: onUpdateLoading,
  } = useMutation(Api.admin.updateAdminViaCloudFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries('getSingleAdmin')
      dispatch(
        updateUser({
          ...user,
          ...methods.getValues(),
          role: methods.getValues().job,
        })
      )
      setModeratorStates({
        ...moderatorStates,
        isAddModal: false,
        isEditModal: false,
        isConfirmation: false,
        isDetailsModal: false,
        isSnackbar: true,
      })
    },
    onError: (error: any) => {
      if (isError && error.response.data.code === 'auth/email-already-exists') {
        methods.setError('email', {
          type: 'manual',
          message: error.response.data.message,
        })
      }
      alert(error.response.data.message)
    },
  })

  const onSubmit = (data: any) => {
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
  }

  return {
    error,
    isError,
    methods,
    onSubmit,
    onGoBack,
    isLoading,
    onRowClick,
    modalToggler,
    moderatorStates,
    onUpdateLoading,
    setModeratorStates,
  }
}

export default useModerator
