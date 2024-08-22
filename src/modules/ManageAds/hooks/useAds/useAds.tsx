import React from 'react'
import { useForm } from 'react-hook-form'
import { BUTTONS_ARRAY, ROUTES } from '@vgl/constants'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { Api } from '@vgl/services'

export interface AdValuesProps {
  buttons: any[]
  isLive: boolean
  isEdit: boolean
  isDelete?: boolean
  isSnackbar: boolean
  isaddButton: boolean
  isRemoveButton: boolean
}

const useAds = () => {
  const navigate = useNavigate()

  const { state } = useLocation()

  const [adValues, setAdValues] = React.useState<AdValuesProps>({
    isLive: false,
    isEdit: false,
    isDelete: false,
    isSnackbar: false,
    isaddButton: false,
    isRemoveButton: false,
    buttons: BUTTONS_ARRAY,
  })

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      location: state?.isEdit ? 'Top of social page' : '',
      title: state?.isEdit ? 'title' : '',
      website: state?.isEdit ? 'website url' : '',
    },
  })

  const onPressEdit = (item: any) => {
    console.log(item, 'item')
    setAdValues((prev) => ({
      ...prev,
      isEdit: true,
    }))
    navigate(ROUTES.CREATE_AD, {
      state: { isEdit: true, ...item },
    })
  }

  const onModalToggle = (key: string, val: boolean) => {
    setAdValues((prev) => ({
      ...prev,
      [key]: val,
    }))
  }

  const onDeleteAd = () => {
    console.log(state, 'id')
    onModalToggle('isDelete', false)
  }

  const onGoLive = () => {
    console.log('live')
  }

  const onCloneAd = () => {
    console.log('clone')
  }

  //createdAd
  const { mutate: onCreateAd, isLoading: isAdCreationLoading } = useMutation(
    Api.ads.createAd,
    {
      onSuccess: () => {
        console.log('created')
      },
      onError: () => console.log('error'),
    }
  )

  const onSubmit = (data: any) => {
    onCreateAd(data)
  }

  return {
    methods,
    onSubmit,
    adValues,
    navigate,
    onGoLive,
    onCloneAd,
    onDeleteAd,
    onPressEdit,
    setAdValues,
    onModalToggle,
    isLoading: isAdCreationLoading,
  }
}

export default useAds
