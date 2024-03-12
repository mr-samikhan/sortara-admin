import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'stores/ReduxStore/ReduxStore'

interface IAdmin {
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
  isAuthenticated: false,
}

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
})

export const currentUser = (state: RootState) => state.auth.user
export const selectLoading = (state: RootState) => state.auth.isLoading

export default authReducer.reducer
