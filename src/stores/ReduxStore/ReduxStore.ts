import { AuthReducer } from '@vgl/stores'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
