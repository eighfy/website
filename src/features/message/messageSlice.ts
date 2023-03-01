import { AlertColor } from "@mui/material"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface Message {
  content: any
  time: number
  id: string
  type?: AlertColor
}

interface MessageState {
  message: Message
}

const initialState: MessageState = {
  message: {} as any,
}

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<Omit<Message, "id">>) {
      const id = Math.random() + ""
      state.message = { ...action.payload, id }
    },
  },
})

export const { addMessage } = messageSlice.actions

export const selectMessages = (state: RootState) => state.message

export default messageSlice.reducer
