import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'stores/ReduxStore/ReduxStore'

export interface IAdmin {
  user: {
    email: string
    password: string
  } | null
  isError: boolean
  isLoading: boolean
  isAuthenticated: boolean
}

const initialState: IAdmin = {
  user: null,
  isError: false,
  isLoading: false,
  isAuthenticated: true,
}

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoading = true
    },
    loginSuccess: (state, action) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload
    },
    loginFailure: (state) => {
      state.isLoading = false
      state.isAuthenticated = false
      state.isError = true
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
  },
})

export const currentUser = (state: RootState) => state.auth.user
export const selectError = (state: RootState) => state.auth.isError
export const selectLoading = (state: RootState) => state.auth.isLoading

export const { login, loginSuccess, loginFailure, logout } = authReducer.actions

export default authReducer.reducer
