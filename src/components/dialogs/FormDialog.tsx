import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface FormDialogProps {
  open: boolean
  title: string
  onClose: () => void
  onSubmit: () => void
  children: React.ReactNode
  submitLabel?: string
  loading?: boolean
}

export default function FormDialog({
  open,
  title,
  onClose,
  onSubmit,
  children,
  submitLabel = 'Salvar',
  loading = false,
}: FormDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        {title}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={onSubmit} variant="contained" disabled={loading}>
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
