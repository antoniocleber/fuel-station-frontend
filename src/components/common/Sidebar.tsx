import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'
import WaterIcon from '@mui/icons-material/Water'
import ReceiptIcon from '@mui/icons-material/Receipt'
import AssessmentIcon from '@mui/icons-material/Assessment'
import { DRAWER_WIDTH, ROUTES } from '@/utils/constants'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const menuItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: ROUTES.DASHBOARD },
  { label: 'Combustíveis', icon: <LocalGasStationIcon />, path: ROUTES.FUEL_TYPES },
  { label: 'Bombas', icon: <WaterIcon />, path: ROUTES.FUEL_PUMPS },
  { label: 'Abastecimentos', icon: <ReceiptIcon />, path: ROUTES.FUELINGS },
  { label: 'Relatórios', icon: <AssessmentIcon />, path: ROUTES.REPORTS },
]

export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation()

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map(item => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={onClose}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
