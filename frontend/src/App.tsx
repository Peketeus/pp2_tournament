/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import axios from "axios"
import Page from "./components/Page"
import Navbar from "./components/Navbar"
import Toast from "./components/Toast"
import LakeCard from "./components/LakeCard"
import { takeScreenshot } from "./utils/helpers"
import { Button, Grid, Stack } from "@mui/material"
import SettingsModal from "./components/SettingsModal"

export interface ILake {
  name: string
  time: string
  season: string
  length: string
  compType: string
}

function App() {
  const [originalLakes, setOriginalLakes] = useState<ILake[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(true)

  const handleScreenshot = async () => {
    setIsButtonVisible(false)
    await new Promise((resolve) => setTimeout(resolve, 100))
    await takeScreenshot()
    setIsButtonVisible(true)
  }

  const handleGenerateRequest = async (numOfComps: number, numOfBiggestFish: number, numOfHalfHourComps: number) => {
    try {
      setIsLoading(true)

      console.log("Kisojen määrä:", numOfComps)
      console.log("Suurin kala kisoja:", numOfBiggestFish)
      console.log("Puolen tunnin kisoja:", numOfHalfHourComps)

      const result = await axios.get(
        "http://localhost:8080/api/pilkki/viewLakes"
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
