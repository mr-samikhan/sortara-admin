import React from 'react'
import { useForm } from 'react-hook-form'
import { BUTTONS_ARRAY } from '@vgl/constants'
import { useNavigate } from 'react-router-dom'

export interface AdValuesProps {
  buttons: any[]
  isaddButton: boolean
  isRemoveButton: boolean
}

const useAds = () => {
  const navigate = useNavigate()

  const [adValues, setAdValues] = React.useState<AdValuesProps>({
    buttons: BUTTONS_ARRAY,
    isaddButton: false,
    isRemoveButton: false,
  })

  const methods = useForm({
    mode: 'onChange',
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return { navigate, methods, onSubmit, adValues, setAdValues }
}

export default useAds
