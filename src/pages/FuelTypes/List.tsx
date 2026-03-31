import { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Layout from '@/components/common/Layout'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import FuelTypesTable from '@/components/tables/FuelTypesTable'
import FormDialog from '@/components/dialogs/FormDialog'
import FuelTypeForm from '@/forms/FuelTypeForm'
import { useFuelTypes } from '@/hooks/useFuelTypes'
import { FuelType } from '@/types/api'
import { FuelTypeFormValues } from '@/types/forms'

const FORM_ID = 'fuel-type-form'

export default function FuelTypesList() {
  const { fuelTypes, isLoading, create, update, delete: remove, isCreating, isUpdating, isDeleting } = useFuelTypes()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editItem, setEditItem] = useState<FuelType | undefined>()

  const handleSubmit = (data: FuelTypeFormValues) => {
    if (editItem) {
      update({ id: editItem.id, payload: data })
    } else {
      create(data)
    }
    setDialogOpen(false)
    setEditItem(undefined)
  }

  const handleEdit = (item: FuelType) => {
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
          Tipos de Combustível
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Novo Tipo
        </Button>
      </Box>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <FuelTypesTable
          rows={fuelTypes}
          onEdit={handleEdit}
          onDelete={id => remove(id)}
          isDeleting={isDeleting}
        />
      )}

      <FormDialog
        open={dialogOpen}
        title={editItem ? 'Editar Tipo de Combustível' : 'Novo Tipo de Combustível'}
        onClose={handleClose}
        onSubmit={() => {
          const form = document.getElementById(FORM_ID)
          form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
        }}
        submitLabel={editItem ? 'Atualizar' : 'Criar'}
        loading={isCreating || isUpdating}
      >
        <FuelTypeForm
          formId={FORM_ID}
          onSubmit={handleSubmit}
          defaultValues={editItem}
        />
      </FormDialog>
    </Layout>
  )
}
