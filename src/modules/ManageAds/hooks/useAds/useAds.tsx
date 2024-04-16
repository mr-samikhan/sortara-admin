import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const useAds = () => {
  const navigate = useNavigate()

  const methods = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return { navigate, methods, onSubmit }
}

export default useAds
