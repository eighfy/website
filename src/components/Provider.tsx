import { createTheme, ThemeProvider } from "@mui/material"
import React, { FC, useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  fetchCurrentUser,
  selectAuth,
  tryNewAccessToken,
} from "../features/auth/authSlice"
import Message from "../features/message/Message/Message"
import Navigator from "./Navigator/Navigator"

const theme = createTheme({
  palette: {
    primary: {
      main: "#252525",
    },
    secondary: {
      main: "#252525",
    },
  },
})

const Provider: FC<{ children: any }> = ({ children }) => {
  const dispatch = useAppDispatch()
  const { access_token_expired_in, access_token, user } =
    useAppSelector(selectAuth)

  useEffect(() => {
    dispatch(tryNewAccessToken())
  }, [])

  useEffect(() => {
    const i = setInterval(() => {
      if (access_token_expired_in - 10000 <= Date.now())
        dispatch(tryNewAccessToken())
      if (!user) dispatch(fetchCurrentUser(access_token))
    }, 5000)

    return () => {
      clearInterval(i)
    }
  }, [access_token_expired_in, user])

  return (
    <ThemeProvider theme={theme}>
      <Navigator />
      <Message />
      {children}
    </ThemeProvider>
  )
}

export default Provider
