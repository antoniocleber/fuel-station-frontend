import { AppBar as MuiAppBar, Toolbar, Typography, IconButton, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'
import { APP_NAME } from '@/utils/constants'

interface AppBarProps {
  onMenuClick: () => void
}

export default function AppBar({ onMenuClick }: AppBarProps) {
  return (
    <MuiAppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Box display="flex" alignItems="center" gap={1}>
          <LocalGasStationIcon />
          <Typography variant="h6" noWrap component="div">
            {APP_NAME}
          </Typography>
        </Box>
      </Toolbar>
    </MuiAppBar>
  )
}
