import { ILoginForm } from '@vgl/types'
import { useForm } from 'react-hook-form'
import { LoginFormResolver } from '@vgl/utils'

const useLogin = () => {
  const methods = useForm({
    resolver: LoginFormResolver,
  })

  const onSubmit = (data: ILoginForm) => {
    console.log(data)
  }

  return { methods, onSubmit }
}

export default useLogin
