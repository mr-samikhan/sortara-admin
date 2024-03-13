import { ROUTES } from '@vgl/constants'
import {
  useLogin,
  LoginForm,
  ParentWrapper,
  ResetPassword,
  ForgotPassword,
} from '@vgl/modules'

const LoginContainer = () => {
  const {
    pathname,
    methods,
    onSubmit,
    onForgot,
    loginValues,
    handleClickShowPassword,
  } = useLogin()
  switch (pathname) {
    case ROUTES.LOGIN:
      return (
        <ParentWrapper methods={methods} onSubmit={onSubmit}>
          <LoginForm
            onForgot={onForgot}
            loginValues={loginValues}
            handleClickShowPassword={handleClickShowPassword}
          />
        </ParentWrapper>
      )

    case ROUTES.FORGOT_PASSWORD:
      return (
        <ParentWrapper methods={methods} onSubmit={onSubmit}>
          <ForgotPassword />
        </ParentWrapper>
      )
    case ROUTES.RESET_PASSWORD:
      return (
        <ParentWrapper methods={methods} onSubmit={onSubmit}>
          <ResetPassword />
        </ParentWrapper>
      )
  }
}

export default LoginContainer
