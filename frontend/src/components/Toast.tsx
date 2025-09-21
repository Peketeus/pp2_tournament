/* eslint-disable @typescript-eslint/no-explicit-any */
import { Snackbar } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { SyntheticEvent } from "react"

interface ToastProps {
  isError: boolean
  errorMessage: string
  handleClose: (event: Event | SyntheticEvent<any, Event>) => void
}

const Toast: React.FC<ToastProps> = ({ errorMessage, isError, handleClose }) => {
  const action = <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />

  return (
    <Snackbar
      open={isError}
      autoHideDuration={5000}
      onClose={handleClose}
      message={errorMessage}
      action={action}
    />
  )
}

export default Toast
