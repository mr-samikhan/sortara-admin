import { RootState } from '@vgl/stores'
import { createSlice } from '@reduxjs/toolkit'

export interface IContext {
  rowData: any
  listValue: string
  tabValue: 'users' | 'reports' | 'suspended' | 'resolved'
}

const initialState: IContext = {
  rowData: null,
  tabValue: 'users',
  listValue: 'all',
}

export const contextReducer = createSlice({
  name: 'context',
  initialState,
  reducers: {
    ON_TAB_CHANGE: (state, action) => {
      state.tabValue = action.payload
    },
    ON_LIST_CHANGE: (state, action) => {
      state.listValue = action.payload
    },
    ON_VIEW_ITEM: (state, action) => {
      state.rowData = action.payload
    },
    ON_REMOVE_ITEM: (state, action) => {
      state.rowData = action.payload
    },
  },
})

export const tabValue = (state: RootState) => state.context.tabValue
export const { ON_TAB_CHANGE, ON_LIST_CHANGE, ON_VIEW_ITEM, ON_REMOVE_ITEM } =
  contextReducer.actions

export default contextReducer.reducer
