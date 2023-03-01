import { Alert, Snackbar } from "@mui/material"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../../app/hooks"
import { selectMessages } from "../messageSlice"

const Message = () => {
  const messageState = useAppSelector(selectMessages)
  const [isOpen, setIsOpen] = useState<boolean>(true)

  function handleClose() {
    setIsOpen(false)
  }

  useEffect(() => {
    setIsOpen(true)
  }, [messageState.message])

  const message = messageState.message
  return (
    <Snackbar
      open={!!(isOpen && message.id)}
      onClose={(_, reason) => reason !== "clickaway" && handleClose()}
      autoHideDuration={message.time}
    >
      <Alert sx={{ width: "100%" }} severity={message.type}>
        {message.content}
      </Alert>
    </Snackbar>
  )
}

export default Message
