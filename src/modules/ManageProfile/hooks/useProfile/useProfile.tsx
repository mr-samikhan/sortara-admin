import { useNavigate } from 'react-router-dom'

const useProfile = () => {
  const navigate = useNavigate()

  const onGoBack = () => {
    navigate(-1)
  }
  return { onGoBack }
}

export default useProfile
