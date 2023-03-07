import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import useFetch from "../../hooks/useFetch"

interface AuthState extends TokenDto {
  user: any
  authorizated: boolean
}

const initialState: AuthState = {
  user: null,
  refresh_token: null,
  access_token: null,
  access_token_expired_in: null,
  user_id: null,
  authorizated: false,
}

export const tryNewAccessToken = createAsyncThunk<$object<NewAccessTokenDto>>(
  "auth/update-access-token",
  async () => {
    const [refresh_token, user_id] =
      [localStorage.getItem("token"), localStorage.getItem("user_id")] || []

    if (!refresh_token || !user_id) throw new Error("Token Update Error")

    const fetchServer = useFetch()

    try {
      const prom = await fetchServer.promisify(
        { endpoint: "/api/auth/token" },
        { query: { refresh_token, user_id } }
      )

      return $(prom?.data || {})
    } catch (e) {
      console.log("update-access-token", e)
      throw new Error("Token Update Error")
    }
  }
)

export const fetchCurrentUser = createAsyncThunk<any, string>(
  "auth/current-user",
  async (access_token) => {
    if (!access_token) throw new Error("Error at fetching user")
    const fetchServer = useFetch()

    try {
      const prom = await fetchServer.promisify(
        { endpoint: "/api/auth/profile" },
        { headers: { Authorization: `Bearer ${access_token}` } }
      )

      return $(prom?.data || {})
    } catch (e) {
      console.log("fetch-current-user", e)
      throw new Error("Error at fetching user")
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<$object<TokenDto>>) {
      if (action.payload.$empty()) return
      state.user_id = action.payload.user_id
      state.refresh_token = action.payload.refresh_token
      state.access_token = action.payload.access_token
      state.access_token_expired_in = action.payload.access_token_expired_in
      state.authorizated = true
      localStorage.setItem("token", action.payload.refresh_token)
      localStorage.setItem("user_id", action.payload.user_id)
    },
  },
  extraReducers(builder) {
    builder.addCase(tryNewAccessToken.fulfilled, (state, action) => {
      if (action.payload.$empty()) return
      state.access_token = action.payload.access_token
      state.access_token_expired_in = action.payload.access_token_expired_in
      state.authorizated = true
    })
    builder.addCase(tryNewAccessToken.rejected, (state, action) => {
      state.authorizated = false
      state.access_token = null
      state.refresh_token = null
      state.access_token_expired_in = null
      localStorage.removeItem("token")
    })
    builder.addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
      state.user = payload
    })
  },
})

export const { setTokens } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
