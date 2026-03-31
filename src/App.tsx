import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from '@/styles/theme'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import NotificationSnackbar from '@/components/common/NotificationSnackbar'
import Dashboard from '@/pages/Dashboard'
import FuelTypesPage from '@/pages/FuelTypes'
import FuelPumpsPage from '@/pages/FuelPumps'
import FuelingsPage from '@/pages/Fuelings'
import ReportsPage from '@/pages/Reports'
import NotFoundPage from '@/pages/NotFound'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
})

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/fuel-types" element={<FuelTypesPage />} />
              <Route path="/fuel-pumps" element={<FuelPumpsPage />} />
              <Route path="/fuelings" element={<FuelingsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
          <NotificationSnackbar />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
