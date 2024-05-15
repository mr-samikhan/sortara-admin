import { RootState } from '@vgl/stores'
import { createSlice } from '@reduxjs/toolkit'

export interface IContext {
  rowData: any
  listValue: string
  searchValue: string
  tabValue: 'users' | 'reports' | 'suspended' | 'resolved' | string
}

const initialState: IContext = {
  rowData: null,
  tabValue: 'users',
  listValue: 'all',
  searchValue: '',
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
    ON_SEARCH_CHANGE: (state, action) => {
      state.searchValue = action.payload
    },
  },
})

export const tabValue = (state: RootState) => state.context.tabValue

export const {
  ON_VIEW_ITEM,
  ON_TAB_CHANGE,
  ON_LIST_CHANGE,
  ON_REMOVE_ITEM,
  ON_SEARCH_CHANGE,
} = contextReducer.actions

export default contextReducer.reducer
