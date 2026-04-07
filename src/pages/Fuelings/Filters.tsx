import { useState } from 'react'
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import RefreshIcon from '@mui/icons-material/Refresh'
import ClearIcon from '@mui/icons-material/Clear'
import { FuelPump, FuelingFilter } from '@/types/api'

interface FiltersProps {
  filters: FuelingFilter
  pumps: FuelPump[]
  onSearch: (filters: FuelingFilter) => void
  onReload: () => void
  onClear: () => void
}

export default function Filters({ filters, pumps, onSearch, onReload, onClear }: FiltersProps) {
  const [localFilters, setLocalFilters] = useState<FuelingFilter>(filters)

  const handleClear = () => {
    setLocalFilters({ page: filters.page, size: filters.size })
    onClear()
  }

  const handleSearch = () => {
    onSearch({ ...localFilters, page: 0 })
  }

  return (
    <Box display="flex" gap={2} flexWrap="wrap" alignItems="flex-end" mb={3}>
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Bomba</InputLabel>
        <Select
          value={localFilters.pumpId ?? ''}
          label="Bomba"
          onChange={e =>
            setLocalFilters(f => ({
              ...f,
              pumpId: e.target.value ? Number(e.target.value) : undefined,
            }))
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
        value={localFilters.startDate ?? ''}
        onChange={e =>
          setLocalFilters(f => ({ ...f, startDate: e.target.value || undefined }))
        }
      />
      <TextField
        size="small"
        label="Data Final"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={localFilters.endDate ?? ''}
        onChange={e =>
          setLocalFilters(f => ({ ...f, endDate: e.target.value || undefined }))
        }
      />
      <Button variant="contained" startIcon={<SearchIcon />} onClick={handleSearch}>
        Buscar
      </Button>
      <Button variant="outlined" startIcon={<RefreshIcon />} onClick={onReload}>
        Recarregar
      </Button>
      <Button variant="text" startIcon={<ClearIcon />} onClick={handleClear}>
        Limpar
      </Button>
    </Box>
  )
}
