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
    newModeratorName: '',
    isRemoveModal: false,
    isDetailsModal: false,
    isConfirmation: false,
    isInactiveAdmins: false,
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
  }, [methods.watch])

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

  //delete moderator
  const { mutate: onDeleteModerator_, isLoading: onDelLoading } = useMutation(
    Api.admin.deleteAdmin,
    {
      onSuccess: () => modalToggler('isConfirmation', false),
      onError: (error) => console.log(error),
    }
  )

  const onSubmit = (data: any) => {
    if (moderatorStates.isAddModal) {
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
    } else if (moderatorStates.isEditModal) {
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
    } else if (moderatorStates.isConfirmation) {
      onDeleteModerator_({
        id: 'IJ2NULfLJEZFWX5XBFzaTbvEd522',
        data: {
          status: 'inactive',
          reason: methods.watch('reason'),
        },
      })
    }
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
    moderatorStates,
    onUpdateLoading,
    setModeratorStates,
  }
}

export default useModerator
