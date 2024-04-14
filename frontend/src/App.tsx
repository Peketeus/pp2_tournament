import { useState } from 'react'
import axios from 'axios'
import './App.css'
import Lake from './Lake'

export interface ILake {
  name: string
  time: string
  season: string
  length: string
  compType: string
}

function App() {
  const [originalLakes, setOriginalLakes] = useState<ILake[]>([])

  const handleGenerateRequest = async () => {
    try {
      const result = await axios.get('http://localhost:8080/api/pilkki/viewLakes')

      if (result?.data) {
        setOriginalLakes(result.data)
      }

    } catch (error) {
      console.error('Error happened: ', error)
    }
  }

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: '10px',
      }}>
        {
          originalLakes.map(lake => (
            <Lake lakeData={lake} />
          ))
        }
      </div>
      <button onClick={handleGenerateRequest}>Generoi turnausjärvet</button>
    </div>
  )
}

export default App
