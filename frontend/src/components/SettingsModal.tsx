import { Box, Button, Grid, Input, Typography } from "@mui/material"

import { Modal } from "@mui/material"
import { useState } from "react"

const SettingsModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (
    numOfComps: number,
    numOfBiggestFish: number,
    numOfHalfHourComps: number
  ) => Promise<void>
}) => {
  const [numOfComps, setNumOfComps] = useState<number>(0)

  const [numberOfBiggestFishCompetitions, setNumberOfBiggestFishCompetitions] =
    useState<number>(0)

  const [numberOfHalfHourCompetitions, setNumberOfHalfHourCompetitions] =
    useState<number>(0)

  const handleNumOfCompsChange = (value: string): void => {
    if (!value) {
      setNumOfComps(0)
    }

    const parsedValue = parseInt(value)
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setNumOfComps(parsedValue)
    }
  }

  const handleNumberOfBiggestFishCompetitions = (value: string): void => {
    if (!value) {
      setNumberOfBiggestFishCompetitions(0)
    }

    const parsedValue = parseInt(value)
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setNumberOfBiggestFishCompetitions(parsedValue)
    }
  }

  const handleNumberOfHalfHourCompetitions = (value: string): void => {
    if (!value) {
      setNumberOfHalfHourCompetitions(0)
    }

    const parsedValue = parseInt(value)
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setNumberOfHalfHourCompetitions(parsedValue)
    }
  }

  const validateCompetitionNumbers = (
    biggestFish: number,
    halfHour: number,
    numOfComps: number
  ): boolean => {
    if (isNaN(biggestFish) || isNaN(halfHour) || isNaN(numOfComps)) {
      alert("Syötetyt arvot eivät ole kelvollisia numeroita")
      return false
    }

    if (biggestFish < 0 || halfHour < 0 || numOfComps < 0) {
      alert("Kilpailujen määrä ei voi olla negatiivinen")
      return false
    }

    return true
  }

  const handleSubmit = () => {
    if (
      !validateCompetitionNumbers(
        numberOfBiggestFishCompetitions,
        numberOfHalfHourCompetitions,
        numOfComps
      )
    ) {
      return
    }

    onSubmit(numOfComps, numberOfBiggestFishCompetitions, numberOfHalfHourCompetitions)
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
              value={numOfComps}
              onChange={(e) => handleNumOfCompsChange(e.target.value)}
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
              value={numberOfBiggestFishCompetitions}
              onChange={(e) =>
                handleNumberOfBiggestFishCompetitions(e.target.value)
              }
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
              value={numberOfHalfHourCompetitions}
              onChange={(e) =>
                handleNumberOfHalfHourCompetitions(e.target.value)
              }
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
