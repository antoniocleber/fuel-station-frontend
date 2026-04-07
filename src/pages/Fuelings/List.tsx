import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Layout from '@/components/common/Layout'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import FuelingsTable from '@/components/tables/FuelingsTable'
import FormDialog from '@/components/dialogs/FormDialog'
import FuelingForm from '@/forms/FuelingForm'
import Filters from './Filters'
import { useFuelings } from '@/hooks/useFuelings'
import { useFuelPumps } from '@/hooks/useFuelPumps'
import { Fueling, FuelingFilter } from '@/types/api'
import { FuelingFormValues } from '@/types/forms'
import { DEFAULT_PAGE_SIZE } from '@/utils/constants'
import { formatCurrency, formatLiters } from '@/utils/formatters'

const FORM_ID = 'fueling-form'
const EMPTY_FILTERS: FuelingFilter = { page: 0, size: DEFAULT_PAGE_SIZE }

export default function FuelingsList() {
  const [filters, setFilters] = useState<FuelingFilter>(EMPTY_FILTERS)
  const {
    fuelings,
    totalElements,
    isLoading,
    createAsync,
    update,
    delete: remove,
    refetch,
    isCreating,
    isUpdating,
    isDeleting,
  } = useFuelings(filters)
  const { fuelPumps } = useFuelPumps()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editItem, setEditItem] = useState<Fueling | undefined>()
  const [successData, setSuccessData] = useState<Fueling | null>(null)

  const handleSubmit = async (data: FuelingFormValues) => {
    if (editItem) {
      update({ id: editItem.id, payload: data })
      setDialogOpen(false)
      setEditItem(undefined)
    } else {
      const result = await createAsync(data)
      setDialogOpen(false)
      setEditItem(undefined)
      if (result) {
        setSuccessData(result)
      }
    }
  }

  const handleEdit = (item: Fueling) => {
    setEditItem(item)
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
    setEditItem(undefined)
  }

  const handleSearch = (newFilters: FuelingFilter) => {
    setFilters(f => ({ ...newFilters, size: f.size }))
  }

  const handleReload = () => {
    refetch()
  }

  const handleClear = () => {
    setFilters(EMPTY_FILTERS)
  }

  return (
    <Layout>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" fontWeight="bold">
          Abastecimentos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Novo Abastecimento
        </Button>
      </Box>

      <Filters
        filters={filters}
        pumps={fuelPumps}
        onSearch={handleSearch}
        onReload={handleReload}
        onClear={handleClear}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <FuelingsTable
            rows={fuelings}
            onEdit={handleEdit}
            onDelete={id => remove(id)}
            isDeleting={isDeleting}
          />
          <TablePagination
            component="div"
            count={totalElements}
            page={filters.page ?? 0}
            rowsPerPage={filters.size ?? DEFAULT_PAGE_SIZE}
            onPageChange={(_, page) => setFilters(f => ({ ...f, page }))}
            onRowsPerPageChange={e =>
              setFilters(f => ({ ...f, size: parseInt(e.target.value, 10), page: 0 }))
            }
            labelRowsPerPage="Linhas por página"
          />
        </>
      )}

      <FormDialog
        open={dialogOpen}
        title={editItem ? 'Editar Abastecimento' : 'Novo Abastecimento'}
        onClose={handleClose}
        onSubmit={() => {
          const form = document.getElementById(FORM_ID)
          form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
        }}
        submitLabel={editItem ? 'Atualizar' : 'Registrar'}
        loading={isCreating || isUpdating}
      >
        <FuelingForm
          formId={FORM_ID}
          onSubmit={handleSubmit}
          defaultValues={editItem}
          pumps={fuelPumps}
        />
      </FormDialog>

      <Dialog open={!!successData} onClose={() => setSuccessData(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckCircleIcon color="success" />
          Abastecimento Registrado
        </DialogTitle>
        <DialogContent>
          {successData && (
            <Box display="flex" flexDirection="column" gap={1} pt={1}>
              <Typography variant="body1">
                <strong>Litros abastecidos:</strong> {formatLiters(successData.liters)}
              </Typography>
              <Typography variant="body1">
                <strong>Valor a pagar:</strong> {formatCurrency(successData.totalValue)}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setSuccessData(null)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  )
}
