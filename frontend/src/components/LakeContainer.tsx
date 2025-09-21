import { Grid } from "@mui/material"
import { ILake } from "../types/lakeTypes"
import LakeCard from "./LakeCard"
import Loading from "./Loading"

type LakeContainerProps = {
  isLoading: boolean
  lakes: ILake[]
}

const LakeContainer = ({ isLoading, lakes }: LakeContainerProps) => {
  if (!lakes.length) {
    return null
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Grid container spacing={2} justifyContent={"space-evenly"}>
      {lakes.map((lake) => (
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
    </Grid>
  )
}

export default LakeContainer
