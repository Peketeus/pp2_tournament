import { Box, Button, Grid, Input, Typography } from "@mui/material"

import { Modal } from "@mui/material"
import { useState } from "react"
import { TournamentSettings } from "../App"

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
      setTournamentSettings(prevSettings => ({
        ...prevSettings,
        [name]: 0
      }))
    }

    const parsedValue = parseInt(value)

    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setTournamentSettings(prevSettings => ({
        ...prevSettings,
        [name]: parsedValue
      }))
    }
  }

  const handleSubmit = () => {
    onSubmit(tournamentSettings)
    onClose()
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: -1,
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "80%", md: "60%", lg: "30%" },
          bgcolor: "#8ED081",
          borderRadius: 2,
          boxShadow: 24,
          p: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          Tournament Settings
        </Typography>

        <Grid container mt={2} spacing={1}>
          <Grid item xs={6} sx={{ textAlign: "start" }}>
            <Typography>Kisojen määrä:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Input
              type="text"
              inputProps={{
                style: { textAlign: "center" },
              }}
              value={tournamentSettings?.numOfComps}
              name="numOfComps"
              onChange={(e) => handleNumChange(e)}
              sx={{ width: "60px" }}
            />
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "start" }}>
            <Typography>Suurin kala kisoja:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Input
              type="text"
              inputProps={{
                style: { textAlign: "center" },
              }}
              value={tournamentSettings?.numOfBiggestFish}
              name="numOfBiggestFish"
              onChange={(e) => handleNumChange(e)}
              sx={{ width: "60px" }}
            />
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "start" }}>
            <Typography>Puolen tunnin kisoja:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Input
              type="text"
              inputProps={{
                style: { textAlign: "center" },
              }}
              value={tournamentSettings?.numOfHalfHourComps}
              name="numOfHalfHourComps"
              onChange={(e) => handleNumChange(e)}
              sx={{ width: "60px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              sx={{
                bgcolor: "black",
                color: "white",
                "&:hover": {
                  bgcolor: "black",
                },
              }}
              onClick={handleSubmit}
            >
              Generate tournament
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default SettingsModal
