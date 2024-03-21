import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'stores/ReduxStore/ReduxStore'

interface IContext {
  tabValue: 'users' | 'reports' | 'suspended' | 'resolved'
}

const initialState: IContext = {
  tabValue: 'users',
}

export const contextReducer = createSlice({
  name: 'context',
  initialState,
  reducers: {
    ON_TAB_CHANGE: (state, action) => {
      state.tabValue = action.payload
    },
  },
})

export const tabValue = (state: RootState) => state.context.tabValue
export const { ON_TAB_CHANGE } = contextReducer.actions

export default contextReducer.reducer
