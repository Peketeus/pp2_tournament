import { CircularProgress, Grid } from "@mui/material"

const Loading = () => {
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <CircularProgress size={80} sx={{ color: "#8ED081" }} />
    </Grid>
  )
}

export default Loading
