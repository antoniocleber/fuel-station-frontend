import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { FuelPump, FuelingFilter } from '@/types/api'

interface FiltersProps {
  filters: FuelingFilter
  pumps: FuelPump[]
  onChange: (filters: FuelingFilter) => void
  onClear: () => void
}

export default function Filters({ filters, pumps, onChange, onClear }: FiltersProps) {
  return (
    <Box display="flex" gap={2} flexWrap="wrap" alignItems="flex-end" mb={3}>
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Bomba</InputLabel>
        <Select
          value={filters.pumpId ?? ''}
          label="Bomba"
          onChange={e =>
            onChange({ ...filters, pumpId: e.target.value ? Number(e.target.value) : undefined })
          }
        >
          <MenuItem value="">Todas</MenuItem>
          {pumps.map(p => (
            <MenuItem key={p.id} value={p.id}>
              {p.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        size="small"
        label="Data Inicial"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={filters.startDate ?? ''}
        onChange={e => onChange({ ...filters, startDate: e.target.value || undefined })}
      />
      <TextField
        size="small"
        label="Data Final"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={filters.endDate ?? ''}
        onChange={e => onChange({ ...filters, endDate: e.target.value || undefined })}
      />
      <Button variant="text" startIcon={<ClearIcon />} onClick={onClear}>
        Limpar
      </Button>
    </Box>
  )
}
