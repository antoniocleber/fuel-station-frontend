import { useState } from 'react'
import { Box, Typography, Button, TablePagination } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
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

const FORM_ID = 'fueling-form'
const EMPTY_FILTERS: FuelingFilter = { page: 0, limit: DEFAULT_PAGE_SIZE }

export default function FuelingsList() {
  const [filters, setFilters] = useState<FuelingFilter>(EMPTY_FILTERS)
  const { fuelings, totalElements, isLoading, create, update, delete: remove, isCreating, isUpdating, isDeleting } = useFuelings(filters)
  const { fuelPumps } = useFuelPumps()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editItem, setEditItem] = useState<Fueling | undefined>()

  const handleSubmit = (data: FuelingFormValues) => {
    if (editItem) {
      update({ id: editItem.id, payload: data })
    } else {
      create(data)
    }
    setDialogOpen(false)
    setEditItem(undefined)
  }

  const handleEdit = (item: Fueling) => {
    setEditItem(item)
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
    setEditItem(undefined)
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
        onChange={f => setFilters({ ...f, page: 0 })}
        onClear={() => setFilters(EMPTY_FILTERS)}
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
            rowsPerPage={filters.limit ?? DEFAULT_PAGE_SIZE}
            onPageChange={(_, page) => setFilters(f => ({ ...f, page }))}
            onRowsPerPageChange={e =>
              setFilters(f => ({ ...f, limit: parseInt(e.target.value, 10), page: 0 }))
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
    </Layout>
  )
}
