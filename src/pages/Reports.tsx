import { useMemo } from 'react'
import { Box, Typography, Card, CardContent, Grid } from '@mui/material'
import Layout from '@/components/common/Layout'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { useReports } from '@/hooks/useReports'
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
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const COLORS = ['#1976d2', '#388e3c', '#f57c00', '#d32f2f', '#7b1fa2', '#0097a7', '#689f38', '#e64a19']

export default function Reports() {
  const { report, isLoading } = useReports()

  const pumpChartData = useMemo(() => {
    if (!report) return []
    return report.pumps.map(p => ({
      name: p.pumpName,
      liters: p.totalLiters,
      revenue: p.totalValue,
      count: p.fuelingsCount,
    }))
  }, [report])

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner fullPage />
      </Layout>
    )
  }

  const totalLiters = report?.totalLiters ?? 0
  const totalRevenue = report?.totalValue ?? 0
  const totalFuelings = report?.totalFuelings ?? 0
  const avgValuePerFueling = totalFuelings > 0 ? totalRevenue / totalFuelings : 0

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

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Litros Abastecidos por Bomba
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={pumpChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(v: number) => `${v.toFixed(2)} L`} />
                  <Legend />
                  <Bar dataKey="liters" name="Litros" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Receita por Bomba
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={pumpChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(v: number) => formatCurrency(v)} />
                  <Legend />
                  <Bar dataKey="revenue" name="Receita (R$)" fill="#388e3c" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quantidade de Abastecimentos por Bomba
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={pumpChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Abastecimentos" fill="#f57c00" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Distribuição de Receita por Bomba
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pumpChartData.filter(d => d.revenue > 0)}
                    dataKey="revenue"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pumpChartData.filter(d => d.revenue > 0).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => formatCurrency(v)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}
