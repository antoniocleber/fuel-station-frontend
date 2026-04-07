import { useMemo } from 'react'
import { Grid, Card, CardContent, Typography, Box } from '@mui/material'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'
import WaterIcon from '@mui/icons-material/Water'
import ReceiptIcon from '@mui/icons-material/Receipt'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import Layout from '@/components/common/Layout'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { useFuelTypes } from '@/hooks/useFuelTypes'
import { useFuelPumps } from '@/hooks/useFuelPumps'
import { useFuelings } from '@/hooks/useFuelings'
import { formatCurrency, formatDate } from '@/utils/formatters'

const DASHBOARD_FILTERS = { page: 0, size: 9999 }

interface KpiCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
}

function KpiCard({ title, value, icon, color }: KpiCardProps) {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: '50%',
              p: 1.5,
              display: 'flex',
              color: 'white',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  const { fuelTypes, isLoading: loadingTypes } = useFuelTypes()
  const { fuelPumps, isLoading: loadingPumps } = useFuelPumps()
  const { fuelings, totalElements, isLoading: loadingFuelings } = useFuelings(DASHBOARD_FILTERS)

  const totalRevenue = useMemo(
    () => fuelings.reduce((sum, f) => sum + (f.totalValue ?? 0), 0),
    [fuelings],
  )

  const latestFuelings = useMemo(
    () =>
      [...fuelings]
        .sort((a, b) => new Date(b.fuelingDate).getTime() - new Date(a.fuelingDate).getTime())
        .slice(0, 5),
    [fuelings],
  )

  if (loadingTypes || loadingPumps || loadingFuelings) {
    return (
      <Layout>
        <LoadingSpinner fullPage />
      </Layout>
    )
  }

  return (
    <Layout>
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Visão geral do posto de combustível
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard
            title="Tipos de Combustível"
            value={fuelTypes.length}
            icon={<LocalGasStationIcon />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard
            title="Bombas"
            value={fuelPumps.length}
            icon={<WaterIcon />}
            color="#388e3c"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard
            title="Abastecimentos"
            value={totalElements}
            icon={<ReceiptIcon />}
            color="#f57c00"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard
            title="Faturamento"
            value={formatCurrency(totalRevenue)}
            icon={<TrendingUpIcon />}
            color="#7b1fa2"
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Últimos Abastecimentos
        </Typography>
        {latestFuelings.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            Nenhum abastecimento registrado.
          </Typography>
        )}
        {latestFuelings.map(f => (
          <Card key={f.id} sx={{ mb: 1 }}>
            <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2">
                    Bomba {f.pump.name} — {f.liters} L
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(f.fuelingDate)}
                    {f.fuelType.name ? ` • ${f.fuelType.name}` : ''}
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight="bold" color="primary">
                  {formatCurrency(f.totalValue)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Layout>
  )
}
