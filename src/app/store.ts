import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import auth from "../features/auth/authSlice"
import message from "../features/message/messageSlice"

export const store = configureStore({
  reducer: {
    message,
    auth,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ serializableCheck: false })
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
