import { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Layout from '@/components/common/Layout'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import FuelPumpsTable from '@/components/tables/FuelPumpsTable'
import FormDialog from '@/components/dialogs/FormDialog'
import FuelPumpForm from '@/forms/FuelPumpForm'
import { useFuelPumps } from '@/hooks/useFuelPumps'
import { useFuelTypes } from '@/hooks/useFuelTypes'
import { FuelPump } from '@/types/api'
import { FuelPumpFormValues } from '@/types/forms'

const FORM_ID = 'fuel-pump-form'

export default function FuelPumpsList() {
  const { fuelPumps, isLoading, create, update, delete: remove, isCreating, isUpdating, isDeleting } = useFuelPumps()
  const { fuelTypes } = useFuelTypes()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editItem, setEditItem] = useState<FuelPump | undefined>()

  const handleSubmit = (data: FuelPumpFormValues) => {
    if (editItem) {
      update({ id: editItem.id, payload: data })
    } else {
      create(data)
    }
    setDialogOpen(false)
    setEditItem(undefined)
  }

  const handleEdit = (item: FuelPump) => {
    setEditItem(item)
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
    setEditItem(undefined)
  }

  return (
    <Layout>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Bombas de Combustível
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Nova Bomba
        </Button>
      </Box>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <FuelPumpsTable
          rows={fuelPumps}
          onEdit={handleEdit}
          onDelete={id => remove(id)}
          isDeleting={isDeleting}
        />
      )}

      <FormDialog
        open={dialogOpen}
        title={editItem ? 'Editar Bomba' : 'Nova Bomba'}
        onClose={handleClose}
        onSubmit={() => {
          const form = document.getElementById(FORM_ID)
          form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
        }}
        submitLabel={editItem ? 'Atualizar' : 'Criar'}
        loading={isCreating || isUpdating}
      >
        <FuelPumpForm
          formId={FORM_ID}
          onSubmit={handleSubmit}
          defaultValues={editItem}
          fuelTypes={fuelTypes}
        />
      </FormDialog>
    </Layout>
  )
}
