import * as yup from 'yup'
import { Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IForgotForm, ILoginForm, IResetForm } from '@vgl/types'
import { VALIDATION_PATTERNS, VALIDATION_MESSAGES } from '@vgl/constants'

export const LoginFormResolver: Resolver<ILoginForm> = yupResolver(
  yup.object().shape({
    email: yup
      .string()
      .matches(VALIDATION_PATTERNS.EMAIL, VALIDATION_MESSAGES.INVALID_EMAIL)
      .required(VALIDATION_MESSAGES.REQUIRED_FIELD),

    password: yup
      .string()
      .matches(
        VALIDATION_PATTERNS.PASSWORD,
        VALIDATION_MESSAGES.INVALID_PASSWORD
      )
      .required(VALIDATION_MESSAGES.REQUIRED_FIELD),
  })
)

export const ForgotPasswordResolver: Resolver<IForgotForm> = yupResolver(
  yup.object().shape({
    email: yup
      .string()
      .matches(VALIDATION_PATTERNS.EMAIL, VALIDATION_MESSAGES.INVALID_EMAIL)
      .required(VALIDATION_MESSAGES.REQUIRED_FIELD),
  })
)

export const ResetPasswordResolver: Resolver<IResetForm> = yupResolver(
  yup.object().shape({
    password: yup
      .string()
      .matches(
        VALIDATION_PATTERNS.PASSWORD,
        VALIDATION_MESSAGES.INVALID_PASSWORD
      )
      .required(VALIDATION_MESSAGES.REQUIRED_FIELD),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], VALIDATION_MESSAGES.PASSWORD_MISMATCH)
      .required(VALIDATION_MESSAGES.REQUIRED_FIELD),
  })
)
