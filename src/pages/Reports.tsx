import { Box, Typography, Card, CardContent, Grid } from '@mui/material'
import Layout from '@/components/common/Layout'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { useFuelings } from '@/hooks/useFuelings'
import { useFuelTypes } from '@/hooks/useFuelTypes'
import { formatCurrency, formatLiters } from '@/utils/formatters'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

export default function Reports() {
  const { fuelings, isLoading: loadingFuelings } = useFuelings()
  const { fuelTypes, isLoading: loadingTypes } = useFuelTypes()

  if (loadingFuelings || loadingTypes) {
    return (
      <Layout>
        <LoadingSpinner fullPage />
      </Layout>
    )
  }

  const totalLiters = fuelings.reduce((sum, f) => sum + f.liters, 0)
  const totalRevenue = fuelings.reduce((sum, f) => sum + f.totalValue, 0)
  const avgValuePerFueling = fuelings.length > 0 ? totalRevenue / fuelings.length : 0

  const chartData = fuelTypes.map(ft => ({
    name: ft.name,
    pricePerLiter: ft.pricePerLiter,
  }))

  return (
    <Layout>
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Relatórios
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Análise de dados do posto
        </Typography>
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Total de Litros Abastecidos
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {formatLiters(totalLiters)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Receita Total
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {formatCurrency(totalRevenue)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Ticket Médio
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {formatCurrency(avgValuePerFueling)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Preço por Litro por Tipo de Combustível
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Legend />
              <Bar dataKey="pricePerLiter" name="Preço/Litro" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Layout>
  )
}
