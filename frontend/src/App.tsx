/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import axios from "axios"
import Page from "./components/Page"
import Navbar from "./components/Navbar"
import Toast from "./components/Toast"
import LakeCard from "./components/LakeCard"
import { delay, takeScreenshot } from "./utils/helpers"
import { Button, Grid, Stack } from "@mui/material"
import SettingsModal from "./components/SettingsModal"

export type ILake = {
  name: string
  time: string
  season: string
  length: string
  compType: string
}

export type TournamentSettings = {
  numOfComps: number
  numOfBiggestFish: number
  numOfHalfHourComps: number
}

function App() {
  const [originalLakes, setOriginalLakes] = useState<ILake[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(true)

  const handleScreenshot = async () => {
    setIsButtonVisible(false)
    await delay(100)
    await takeScreenshot()
    setIsButtonVisible(true)
  }

  const handleGenerateRequest = async (tournamentSettings: TournamentSettings) => {
    try {
      setIsLoading(true)
      
      for (const [key, value] of Object.entries(tournamentSettings)) {
        if (!value) {
          tournamentSettings[key as keyof TournamentSettings] = 0
        }
      }

      const { numOfComps, numOfBiggestFish, numOfHalfHourComps } = tournamentSettings

      const result = await axios.get(
        `http://localhost:8080/api/pilkki/viewLakes?kisaCap=${numOfComps}&suurinkalaCap=${numOfBiggestFish}&halfhourCap=${numOfHalfHourComps}`
      )

      if (result?.data) {
        setOriginalLakes(result.data)
        setIsLoading(false)
      }
    } catch (error) {
      setError(
        "Datan haussa tapahtui virhe. Tarkempi virhe on merkitty selaimen konsoliin."
      )
      console.error(error)
      setIsLoading(false)
    }
  }

  const handleErrorClose = () => {
    setError("")
  }

  const handleSettingsForm = () => {
    setIsSettingsModalOpen(true)
  }

  return (
    <>
      <Navbar />
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <Stack direction="row" spacing={2} justifyContent="center" style={{ marginTop: "1rem" }}>
            {isButtonVisible && (
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginTop: "1rem" }}
                onClick={handleScreenshot}
              >
                Take screenshot
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginTop: "1rem" }}
              onClick={handleSettingsForm}
            >
              Open settings form
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onSubmit={handleGenerateRequest}
      />
      <div className="main-container">
        <Page isLoading={isLoading}>
          <div className="lake-container">
            {originalLakes.map((lake) => (
              <LakeCard
                key={lake.name}
                imageUrl={`src/assets/lakes/${lake.name.toLowerCase()}.png`}
                lakeName={lake.name}
                season={lake.season}
                time={lake.time}
                length={lake.length}
                compType={lake.compType}
              />
            ))}
          </div>
        </Page>
      </div>
      {error && (
        <Toast
          isError={error ? true : false}
          errorMessage={error}
          handleClose={handleErrorClose}
        />
      )}
    </>
  )
}

export default App
