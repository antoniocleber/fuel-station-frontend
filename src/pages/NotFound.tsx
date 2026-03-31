import { Box, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'

export default function NotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={2}
      textAlign="center"
    >
      <SentimentDissatisfiedIcon sx={{ fontSize: 80, color: 'text.secondary' }} />
      <Typography variant="h3" fontWeight="bold">
        404
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Página não encontrada
      </Typography>
      <Typography variant="body1" color="text.secondary" maxWidth={400}>
        A página que você está procurando não existe ou foi removida.
      </Typography>
      <Button variant="contained" component={RouterLink} to="/" sx={{ mt: 2 }}>
        Voltar ao Dashboard
      </Button>
    </Box>
  )
}
