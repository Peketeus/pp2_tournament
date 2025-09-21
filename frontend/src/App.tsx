import { useState } from "react"
import axios from "axios"

import ActionButtons from "./components/ActionButtons"
import LakeContainer from "./components/LakeContainer"
import Navbar from "./components/Navbar"
import SettingsModal from "./components/SettingsModal"
import Toast from "./components/Toast"

import { ILake } from "./types/lakeTypes"
import { TournamentSettings } from "./types/tournamentTypes"

function App() {
  const [originalLakes, setOriginalLakes] = useState<ILake[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

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
      setError("Datan haussa tapahtui virhe. Tarkempi virhe on merkitty selaimen konsoliin.")
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
      <ActionButtons handleSettingsForm={handleSettingsForm} />
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onSubmit={handleGenerateRequest}
      />
      <LakeContainer isLoading={isLoading} lakes={originalLakes} />
      {error && (
        <Toast isError={error ? true : false} errorMessage={error} handleClose={handleErrorClose} />
      )}
    </>
  )
}

export default App
