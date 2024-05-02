import { ROUTES } from '@vgl/constants'
import {
  Snackbar,
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
    loginLoading,
    handleClickShowPassword,
  } = useLogin({})
  switch (pathname) {
    case ROUTES.LOGIN:
      return (
        <ParentWrapper methods={methods} onSubmit={onSubmit}>
          <LoginForm
            onForgot={onForgot}
            isLoading={loginLoading}
            loginValues={loginValues}
            handleClickShowPassword={handleClickShowPassword}
          />
          <Snackbar
            open={false}
            onClose={() => console.log('close')}
            message="Your email address and password did not match, Please check your credentials and try again"
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
