import React from 'react'
import { Box } from '@mui/material'
import { Form } from '@vgl/components'
import { COLORS, ROUTES } from '@vgl/constants'
import { FormProvider } from 'react-hook-form'
import { BrandImage, LoginForm, useLogin } from '@vgl/modules'

const LoginContainer = () => {
  const {
    methods,
    onSubmit,
    onForgot,
    pathname,
    loginValues,
    handleClickShowPassword,
  } = useLogin()

  const RenderSteps = () => {
    switch (pathname) {
      case ROUTES.LOGIN:
        return (
          <LoginForm
            onForgot={onForgot}
            loginValues={loginValues}
            handleClickShowPassword={handleClickShowPassword}
          />
        )

      case ROUTES.FORGOT_PASSWORD:
        return <h1>Forgot</h1>

      default:
        throw new Error('Invalid Route')
    }
  }

  return (
    <React.Fragment>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box p={5} bgcolor={COLORS.background}>
            <BrandImage />
            <Box
              height="80vh"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {RenderSteps()}
            </Box>
          </Box>
        </Form>
      </FormProvider>
    </React.Fragment>
  )
}

export default LoginContainer
