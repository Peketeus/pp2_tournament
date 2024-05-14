import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { Box } from "@mui/material"

interface LakeCardProps {
  imageUrl: string
  lakeName: string
  season: string
  time: string
  length: string
  compType: string
}

const LakeCard: React.FC<LakeCardProps> = ({
  imageUrl,
  lakeName,
  season,
  time,
  compType,
  length,
}) => {
  return (
    <Card
      sx={{
        width: 300,
        borderRadius: "11px",
        boxShadow: "10px 10px 10px 0px rgba(0,0,0,0.33)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          paddingTop: "100%",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          alt={lakeName}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5">
          {lakeName}
        </Typography>
        <Typography>{`${season} (${time})`}</Typography>
        <Typography sx={{ fontWeight: "bold" }}>{length}</Typography>
        <Typography>{compType}</Typography>
      </CardContent>
    </Card>
  )
}

export default LakeCard
