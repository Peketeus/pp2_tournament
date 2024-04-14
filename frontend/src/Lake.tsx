import { ILake } from "./App"

interface LakeProps {
  lakeData: ILake
}

const Lake: React.FC<LakeProps> = ({ lakeData }) => {
  return (
    <div style={{
      border: '2px solid',
      borderRadius: '10px',
      borderColor: "lime",
      padding: '15px'
    }}>
      <h2>{lakeData.name}</h2>
      <p>{lakeData.time}</p>
      <p>{lakeData.season}</p>
      <p>{lakeData.length}</p>
      <p>{lakeData.compType}</p>
    </div>
  )
}

export default Lake