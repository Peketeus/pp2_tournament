/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, Snackbar } from "@mui/material"
import { SyntheticEvent } from "react"

interface ToastProps {
  isError: boolean
  errorMessage: string
  handleClose: (event: Event | SyntheticEvent<any, Event>) => void
}

const Toast: React.FC<ToastProps> = ({ errorMessage, isError, handleClose }) => {
  const action = (
    <>
      <IconButton
        onClick={handleClose}
      >
        X
      </IconButton>
    </>
  )
  
  return (
    <Snackbar
      open={isError}
      autoHideDuration={6000}
      onClose={handleClose}
      message={errorMessage}
      action={action}
    />
  )
}

export default Toast