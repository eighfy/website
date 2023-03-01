import { createTheme, ThemeProvider } from "@mui/material"
import React, { FC } from "react"
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
  return (
    <ThemeProvider theme={theme}>
      <Navigator />
      <Message />
      {children}
    </ThemeProvider>
  )
}

export default Provider
