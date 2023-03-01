import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

interface AuthState {
  token: string
  user: any
}

const initialState: AuthState = {
  token: null,
  user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
})

export const {} = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
