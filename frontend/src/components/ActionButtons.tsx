import { useState } from "react"
import { delay, takeScreenshot } from "../utils/helpers"
import { Button, Grid } from "@mui/material"

type ActionButtonsProps = {
  handleSettingsForm: () => void
}

const ActionButtons = ({ handleSettingsForm }: ActionButtonsProps) => {
  const [areButtonsVisible, setAreButtonsVisible] = useState<boolean>(true)

  const handleScreenshot = async () => {
    setAreButtonsVisible(false)
    await delay(200)
    await takeScreenshot()
    setAreButtonsVisible(true)
  }

  return (
    <Grid container spacing={2} my={2} mx={1} justifyContent={"center"}>
      {areButtonsVisible && (
        <>
          <Grid>
            <Button variant="contained" color="secondary" onClick={handleScreenshot}>
              Take screenshot
            </Button>
          </Grid>
          <Grid>
            <Button variant="contained" color="secondary" onClick={handleSettingsForm}>
              Open settings form
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default ActionButtons
