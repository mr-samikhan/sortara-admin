import { auth } from '@vgl/firebase'
import { ICurrentUser } from '@vgl/types'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'stores/ReduxStore/ReduxStore'

export interface IAdmin {
  isError: boolean
  isLoading: boolean
  isAuthenticated: boolean
  user: ICurrentUser | null
}

const initialState: IAdmin = {
  user: null,
  isError: false,
  isLoading: false,
  isAuthenticated: false,
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
      auth.signOut()
      state.user = null
      state.isLoading = false
      state.isAuthenticated = false
    },
    updateUser: (state, action) => {
      console.log('action.payload', action.payload)
      state.user = action.payload
    },
  },
})

export const currentUser = (state: RootState) => state.auth.user
export const selectError = (state: RootState) => state.auth.isError
export const selectLoading = (state: RootState) => state.auth.isLoading

export const { login, loginSuccess, loginFailure, logout, updateUser } =
  authReducer.actions

export default authReducer.reducer
