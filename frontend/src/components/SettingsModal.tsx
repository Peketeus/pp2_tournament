import { useState } from "react"
import { Button, Input, List, ListItem, ListItemText } from "@mui/material"

import { TournamentSettings } from "../types/tournamentTypes"
import PilkkiModal from "./PilkkiModal"

const SettingsModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (settings: TournamentSettings) => Promise<void>
}) => {
  const [tournamentSettings, setTournamentSettings] = useState<{
    numOfComps: number
    numOfBiggestFish: number
    numOfHalfHourComps: number
  }>({
    numOfComps: 0,
    numOfBiggestFish: 0,
    numOfHalfHourComps: 0,
  })

  const handleNumChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    event.preventDefault()

    const value = event.target.value
    const name = event.target.name

    if (!value) {
      setTournamentSettings((prevSettings) => ({
        ...prevSettings,
        [name]: 0,
      }))
    }

    const parsedValue = parseInt(value)

    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setTournamentSettings((prevSettings) => ({
        ...prevSettings,
        [name]: parsedValue,
      }))
    }
  }

  const handleSubmit = () => {
    onSubmit(tournamentSettings)
    onClose()
  }

  return (
    <PilkkiModal
      contentDividers
      isOpen={isOpen}
      onClose={onClose}
      title="Tournament Settings"
      actions={
        <Button onClick={handleSubmit} variant="contained">
          Generate tournament
        </Button>
      }
    >
      <List>
        <ListItem>
          <ListItemText primary="Kisojen määrä:" />
          <Input
            type="text"
            inputProps={{ style: { textAlign: "center" } }}
            value={tournamentSettings?.numOfComps}
            name="numOfComps"
            onChange={handleNumChange}
            sx={{ width: "60px" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Suurin kala kisoja:" />
          <Input
            type="text"
            inputProps={{ style: { textAlign: "center" } }}
            value={tournamentSettings?.numOfBiggestFish}
            name="numOfBiggestFish"
            onChange={handleNumChange}
            sx={{ width: "60px" }}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Puolen tunnin kisoja:" />
          <Input
            type="text"
            inputProps={{ style: { textAlign: "center" } }}
            value={tournamentSettings?.numOfHalfHourComps}
            name="numOfHalfHourComps"
            onChange={handleNumChange}
            sx={{ width: "60px" }}
          />
        </ListItem>
      </List>
    </PilkkiModal>
  )
}

export default SettingsModal
