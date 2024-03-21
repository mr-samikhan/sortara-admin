import { configureStore } from '@reduxjs/toolkit'
import { AuthReducer, ContextReducer } from '@vgl/stores'

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    context: ContextReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
