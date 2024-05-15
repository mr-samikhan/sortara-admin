import { Api } from '@vgl/services'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useGetSingleUser } from '@vgl/hooks'
import { RootState, updateUser } from '@vgl/stores'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQueryClient } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  IModerators,
  IModeratorFormValues,
  IModeratorStateValues,
} from '@vgl/types'

interface IUseModerator {
  moderators: IModerators[] | undefined
}

const useModerator = (props: IUseModerator) => {
  const { moderators } = props || {}

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const queryClient = useQueryClient()

  const isCurrentUserRoute = pathname.startsWith('/admin')

  const { searchValue } = useSelector((state: RootState) => state.context)

  const [moderatorStates, setModeratorStates] =
    React.useState<IModeratorStateValues>({
      isAddModal: false,
      isSnackbar: false,
      isEditModal: false,
      selectedItem: null,
      filteredData: null,
      isRemoveModal: false,
      newModeratorName: '',
      isDetailsModal: false,
      isConfirmation: false,
      isInactiveAdmins: false,
    })

  const {
    isAddModal,
    isEditModal,
    selectedItem,
    isConfirmation,
    isDetailsModal,
  } = moderatorStates

  //fiter moderators
  useEffect(() => {
    if (searchValue.length > 0) {
      const filteredRes = Api.admin.filterAdmins(searchValue, moderators)
      setModeratorStates({
        ...moderatorStates,
        filteredData: filteredRes,
      })
    } else {
      setModeratorStates((prevState) => ({
        ...prevState,
        filteredData: null,
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  //get single user
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
        email: user.email,
        jobTitle: user.role,
        phone: user.phoneNumber,
        lastName: user.lastName,
        firstName: user.firstName,
        admin: user.permissions?.includes('admin'),
        moderator: user.permissions?.includes('moderator'),
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

  const onGoBack = (path: string | number) => {
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
    onSuccess: () =>
      alert(
        'Reset email sent successfully.Check your mail for further instruction.'
      ),
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
      admin: item.permissions?.includes('admin'),
      moderator: item.permissions?.includes('moderator'),
    })
    setPermissions(item.permissions || [])
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
