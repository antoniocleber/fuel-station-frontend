import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Fueling } from '@/types/api'
import { formatCurrency, formatDate, formatLiters } from '@/utils/formatters'
import ConfirmDialog from '@/components/dialogs/ConfirmDialog'

interface FuelingsTableProps {
  rows: Fueling[]
  onEdit: (item: Fueling) => void
  onDelete: (id: number) => void
  isDeleting?: boolean
}

export default function FuelingsTable({
  rows,
  onEdit,
  onDelete,
  isDeleting = false,
}: FuelingsTableProps) {
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const handleDeleteConfirm = () => {
    if (deleteId !== null) {
      onDelete(deleteId)
      setDeleteId(null)
    }
  }

  if (rows.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
        Nenhum abastecimento registrado.
      </Typography>
    )
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Bomba</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Litros</TableCell>
              <TableCell>Valor Total</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.pump.name}</TableCell>
                <TableCell>{formatDate(row.fuelingDate)}</TableCell>
                <TableCell>{formatLiters(row.liters)}</TableCell>
                <TableCell>{formatCurrency(row.totalValue)}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Editar">
                    <IconButton size="small" onClick={() => onEdit(row)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton size="small" color="error" onClick={() => setDeleteId(row.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmDialog
        open={deleteId !== null}
        title="Confirmar exclusão"
        message="Tem certeza que deseja excluir este abastecimento?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
        loading={isDeleting}
      />
    </>
  )
}
