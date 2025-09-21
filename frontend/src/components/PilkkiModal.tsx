import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

type PilkkiModalProps = {
  actions?: React.ReactNode
  children: React.ReactNode
  contentDividers?: boolean
  isOpen: boolean
  onClose: () => void
  title?: string
}

const PilkkiModal = ({
  actions,
  children,
  contentDividers = false,
  isOpen,
  onClose,
  title,
}: PilkkiModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      {title ? (
        <DialogTitle sx={{ backgroundColor: "#33312e", color: "white" }}>{title}</DialogTitle>
      ) : null}
      <DialogContent dividers={contentDividers} sx={{ backgroundColor: "#33312e", color: "white" }}>
        {children}
      </DialogContent>
      {actions ? (
        <DialogActions sx={{ backgroundColor: "#33312e" }}>{actions}</DialogActions>
      ) : null}
    </Dialog>
  )
}

export default PilkkiModal
