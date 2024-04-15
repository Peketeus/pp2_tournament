import { AppBar, Toolbar, Typography } from "@mui/material"

const Navbar = () => {
  return (
    <AppBar position='static'>
      <Toolbar sx={{ justifyContent: 'center', backgroundColor: '#8ED081', color: 'black' }}>
        <Typography component='h1'>
          Pro Pilkki 2 Tournament Generator
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar