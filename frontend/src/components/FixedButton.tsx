import Button from "@mui/material/Button"

interface FixedButtonProps {
  buttonTitle: string
  isDisabled: boolean
  onClick: () => void
  visible: boolean
}

const FixedButton: React.FC<FixedButtonProps> = ({ buttonTitle, isDisabled, onClick, visible }) => {
  if (!visible) {
    return null
  }
  
  return (
    <Button
      disabled={isDisabled}
      variant="contained"
      onClick={onClick}
      sx={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        backgroundColor: "green",
        color: "white",
        "&:hover": {
          backgroundColor: "darkgreen",
        },
      }}
    >
      {buttonTitle}
    </Button>
  )
}

export default FixedButton
