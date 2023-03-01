import React, { FC } from "react"
import Message from "../features/message/Message/Message"
import Navigator from "./Navigator/Navigator"

const Provider: FC<{ children: any }> = ({ children }) => {
  return (
    <>
      <Navigator />
      <Message />
      {children}
    </>
  )
}

export default Provider
