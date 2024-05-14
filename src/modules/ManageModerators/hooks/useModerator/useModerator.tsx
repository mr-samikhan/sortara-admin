import React from 'react'
import { Api } from '@vgl/services'
import { updateUser } from '@vgl/stores'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useGetSingleUser } from '@vgl/hooks'
import { useMutation, useQueryClient } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  IModerators,
  IModeratorFormValues,
  IModeratorStateValues,
} from '@vgl/types'

const useModerator = () => {
  const navigate = useNavigate()

  const { id } = useParams()

  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const { pathname } = useLocation()

  const isCurrentUserRoute = pathname.startsWith('/admin')

  const [moderatorStates, setModeratorStates] =
    React.useState<IModeratorStateValues>({
      isAddModal: false,
      isSnackbar: false,
      isEditModal: false,
      newModeratorName: '',
      isRemoveModal: false,
      isDetailsModal: false,
      isConfirmation: false,
      isInactiveAdmins: false,
      selectedItem: null,
    })

  const {
    isAddModal,
    isEditModal,
    isDetailsModal,
    isConfirmation,
    selectedItem,
  } = moderatorStates

  const { data: user, isLoading } = useGetSingleUser({
    id: id as string,
    fxn: Api.auth.getUserProfile,
    refetchLabel: 'getSingleAdmin',
  })

  const methods = useForm({
    mode: 'onChange',
  })

  React.useEffect(() => {
    if ((user && isCurrentUserRoute) || isDetailsModal) {
      methods.reset({
        job: user.role,
        email: user.email,
        phone: user.phoneNumber,
        lastName: user.lastName,
        firstName: user.firstName,
      })
    }
  }, [user, isCurrentUserRoute, methods, isDetailsModal])

  //permissions
  const [permissions, setPermissions] = React.useState<string[]>([])

  const updatePermissions = (permission: string, isChecked: boolean) => {
    setPermissions((prev) => {
      const newPermissions = [...prev]
      if (isChecked) {
        if (!newPermissions.includes(permission)) {
          newPermissions.push(permission)
        }
      } else {
        const index = newPermissions.indexOf(permission)
        if (index > -1) {
          newPermissions.splice(index, 1)
        }
      }
      return newPermissions
    })
  }

  React.useEffect(() => {
    const subscription = methods.watch((value, { name }) => {
      if (name === 'admin') {
        updatePermissions('admin', value.admin)
      }
      if (name === 'moderator') {
        updatePermissions('moderator', value.moderator)
      }
    })
    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.watch])

  const modalToggler = (key: string, val: boolean) => {
    setModeratorStates((prevState) => ({
      ...prevState,
      [key]: val,
    }))
  }

  const onRowClick = (item: IModerators) => {
    //navigate and send state
    navigate('/moderator/' + item.id, { state: { user: { ...item } } })
  }

  const onGoBack = (path: string) => {
    navigate(path)
  }

  //add moderator
  const { mutate: onAddAdmin, isLoading: isAddLoading } = useMutation(
    Api.admin.createAdmin,
    {
      onSuccess: () => {
        setModeratorStates({
          ...moderatorStates,
          isAddModal: false,
          newModeratorName: `${methods.watch('firstName')} ${methods.watch(
            'lastName'
          )}`,
          isSnackbar: true,
        })
        methods.reset()
      },
      onError: (error: any) => {
        alert(error.response.data.message)
      },
    }
  )

  //update moderator
  const {
    error,
    isError,
    mutate: onUpdateAdmin,
    isLoading: onUpdateLoading,
  } = useMutation(Api.admin.updateAdminViaCloudFunction, {
    onSuccess: () => {
      if (isEditModal) {
        queryClient.invalidateQueries('getAdmins')
        setModeratorStates({
          ...moderatorStates,
          selectedItem: null,
        })
      } else {
        queryClient.invalidateQueries('getSingleAdmin')
        dispatch(
          updateUser({
            ...user,
            ...methods.getValues(),
            role: methods.getValues().job,
          })
        )
      }

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

  //delete moderator
  const { mutate: onDeleteModerator_, isLoading: onDelLoading } = useMutation(
    Api.admin.deleteAdmin,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getAdmins')
        modalToggler('isConfirmation', false)
      },
      onError: (error) => console.log(error),
    }
  )

  //reset password
  const { mutate: onResetPassword_ } = useMutation(Api.auth.forgotPassword, {
    onSuccess: () => console.log('email sent'),
    onError: () => console.log('Error while sending reset email'),
  })

  const onSubmit = (data: IModeratorFormValues) => {
    const dataTobeSent = {
      firstName: data['firstName'],
      lastName: data['lastName'],
      email: data['email'],
      phoneNumber: data['phone'],
      role: data['jobTitle'],
      permissions: permissions || [],
    }

    if (isAddModal) {
      onAddAdmin({
        data: {
          ...data,
          role: 'Moderator',
          password: 'Abcd@123',
          jobTitle: data['jobTitle'],
          phoneNumber: data['phone'],
          permissions: permissions || [],
        },
      })
    } else if (isEditModal) {
      onUpdateAdmin({
        id: selectedItem?.id || '',
        data: { ...dataTobeSent },
      })
    } else if (isConfirmation) {
      onDeleteModerator_({
        id: selectedItem?.id || '',
        data: {
          status: 'inactive',
          reason: methods.watch('reason'),
        },
      })
    } else if (isCurrentUserRoute || isDetailsModal) {
      onUpdateAdmin({
        id: user?.uid || '',
        data: { ...dataTobeSent },
      })
    }
  }

  const onUpdateDetails = (item: IModerators) => {
    methods.reset({
      email: item.email,
      jobTitle: item.role,
      phone: item.phoneNumber,
      lastName: item.lastName,
      firstName: item.firstName,
    })
    setModeratorStates((prev: any) => ({
      ...prev,
      selectedItem: item,
    }))

    modalToggler('isEditModal', true)
  }

  const clearOutValues = () => {
    methods.reset({
      email: '',
      jobTitle: '',
      phone: '',
      lastName: '',
      firstName: '',
    })
  }

  const onResetPassword = (item: IModerators) => {
    onResetPassword_(item.email)
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
    onDelLoading,
    isAddLoading,
    clearOutValues,
    moderatorStates,
    onUpdateDetails,
    onUpdateLoading,
    onResetPassword,
    setModeratorStates,
  }
}

export default useModerator
