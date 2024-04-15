import { CircularProgress } from "@mui/material"
import { ReactNode } from "react"

interface PageProps {
  isLoading: boolean
  children: ReactNode
}

const Page: React.FC<PageProps> = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <div className="loading-container">
        <CircularProgress sx={{ color: "#8ED081" }} />
      </div>
    )
  }

  return (
    <div>
      {children}
    </div>
  )
}

export default Page