import { Card, CardContent, Typography } from "@mui/material"
import { ILake } from "./App"

interface LakeProps {
  lakeData: ILake
}

const Lake: React.FC<LakeProps> = ({ lakeData }) => {
  return (
    <Card variant="outlined" sx={{ color: 'white', flexGrow: 1, textAlign: "left", backgroundColor: "#087CA7" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} component='address' gutterBottom>
          Järven tiedot
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          {lakeData.name}
        </Typography>
        <Typography>
          {`${lakeData.season} (${lakeData.time})`}
        </Typography>
        <Typography>
          {lakeData.length}
        </Typography>
        <Typography>
          {lakeData.compType}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Lake