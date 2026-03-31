import { Box, Typography } from '@mui/material'
import { APP_NAME, APP_VERSION } from '@/utils/constants'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        mt: 'auto',
        backgroundColor: theme => theme.palette.grey[100],
        borderTop: '1px solid',
        borderColor: 'divider',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {APP_NAME} v{APP_VERSION} — Desenvolvido com ❤️ usando GitHub Copilot
      </Typography>
    </Box>
  )
}
