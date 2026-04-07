import { useEffect, useMemo } from 'react'
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Chip,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { useForm } from '@/hooks/useForm'
import { fuelingSchema } from '@/utils/validators'
import { FuelingFormValues } from '@/types/forms'
import { Fueling, FuelPump } from '@/types/api'
import { formatCurrency } from '@/utils/formatters'

const parseNumericInput = (value: string): number => parseFloat(value) || 0

interface FuelingFormProps {
  onSubmit: (data: FuelingFormValues) => void
  defaultValues?: Partial<Fueling>
  pumps: FuelPump[]
  formId: string
}

export default function FuelingForm({
  onSubmit,
  defaultValues,
  pumps,
  formId,
}: FuelingFormProps) {
  const isEditing = !!defaultValues?.id

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FuelingFormValues>({
    schema: fuelingSchema,
    defaultValues: {
      pumpId: defaultValues?.pump?.id ?? 0,
      fuelTypeId: defaultValues?.fuelType?.id ?? 0,
      fuelingDate: defaultValues?.fuelingDate?.substring(0, 10) ?? '',
      liters: defaultValues?.liters ?? 0,
      totalValue: defaultValues?.totalValue ?? 0,
      inputMode: 'totalValue',
    },
  })

  const selectedPumpId = watch('pumpId')
  const selectedFuelTypeId = watch('fuelTypeId')
  const inputMode = watch('inputMode')
  const liters = watch('liters')
  const totalValue = watch('totalValue')

  const selectedPump = useMemo(
    () => pumps.find(p => p.id === selectedPumpId),
    [pumps, selectedPumpId],
  )

  const availableFuelTypes = useMemo(
    () => selectedPump?.fuelTypes ?? [],
    [selectedPump],
  )

  const selectedFuelType = useMemo(
    () => availableFuelTypes.find(ft => ft.id === selectedFuelTypeId),
    [availableFuelTypes, selectedFuelTypeId],
  )

  // Reset fuel type when pump changes (only when creating new)
  useEffect(() => {
    if (!isEditing && selectedPumpId) {
      setValue('fuelTypeId', 0)
      setValue('liters', 0)
      setValue('totalValue', 0)
    }
  }, [selectedPumpId, isEditing, setValue])

  // Auto-calculate based on input mode
  useEffect(() => {
    if (!selectedFuelType || isEditing) return
    const price = selectedFuelType.pricePerLiter
    if (inputMode === 'totalValue' && totalValue > 0 && price > 0) {
      const calculated = totalValue / price
      setValue('liters', Math.round(calculated * 100) / 100)
    }
  }, [totalValue, inputMode, selectedFuelType, isEditing, setValue])

  useEffect(() => {
    if (!selectedFuelType || isEditing) return
    const price = selectedFuelType.pricePerLiter
    if (inputMode === 'liters' && liters > 0 && price > 0) {
      const calculated = liters * price
      setValue('totalValue', Math.round(calculated * 100) / 100)
    }
  }, [liters, inputMode, selectedFuelType, isEditing, setValue])

  useEffect(() => {
    reset({
      pumpId: defaultValues?.pump?.id ?? 0,
      fuelTypeId: defaultValues?.fuelType?.id ?? 0,
      fuelingDate: defaultValues?.fuelingDate?.substring(0, 10) ?? '',
      liters: defaultValues?.liters ?? 0,
      totalValue: defaultValues?.totalValue ?? 0,
      inputMode: 'totalValue',
    })
  }, [defaultValues, reset])

  return (
    <Box
      component="form"
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      gap={2}
      pt={1}
    >
      {/* Step 1: Select Pump */}
      <Controller
        name="pumpId"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.pumpId}>
            <InputLabel>Bomba</InputLabel>
            <Select
              {...field}
              label="Bomba"
              onChange={e => field.onChange(Number(e.target.value))}
            >
              {pumps.map(p => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
            {errors.pumpId && <FormHelperText>{errors.pumpId.message}</FormHelperText>}
          </FormControl>
        )}
      />

      {/* Step 2: Select Fuel Type (shown after pump is selected) */}
      {selectedPumpId > 0 && (
        <Controller
          name="fuelTypeId"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.fuelTypeId}>
              <InputLabel>Tipo de Combustível</InputLabel>
              <Select
                {...field}
                label="Tipo de Combustível"
                onChange={e => field.onChange(Number(e.target.value))}
              >
                {availableFuelTypes.map(ft => (
                  <MenuItem key={ft.id} value={ft.id}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                      <span>{ft.name}</span>
                      <Chip
                        label={`${formatCurrency(ft.pricePerLiter)}/L`}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ ml: 2 }}
                      />
                    </Box>
                  </MenuItem>
                ))}
                {availableFuelTypes.length === 0 && (
                  <MenuItem disabled value={0}>
                    Nenhum combustível associado a esta bomba
                  </MenuItem>
                )}
              </Select>
              {errors.fuelTypeId && (
                <FormHelperText>{errors.fuelTypeId.message}</FormHelperText>
              )}
              {selectedFuelType && (
                <Typography variant="caption" color="primary" sx={{ mt: 0.5 }}>
                  Preço unitário: {formatCurrency(selectedFuelType.pricePerLiter)} por litro
                </Typography>
              )}
            </FormControl>
          )}
        />
      )}

      {/* Step 3: Date */}
      {(selectedFuelTypeId > 0 || isEditing) && (
        <Controller
          name="fuelingDate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Data do Abastecimento"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.fuelingDate}
              helperText={errors.fuelingDate?.message}
            />
          )}
        />
      )}

      {/* Step 4: Input mode selection + value inputs (only for new, shown after fuel type) */}
      {selectedFuelTypeId > 0 && !isEditing && (
        <FormControl>
          <FormLabel>Como deseja abastecer?</FormLabel>
          <Controller
            name="inputMode"
            control={control}
            render={({ field }) => (
              <RadioGroup
                row
                value={field.value}
                onChange={e => {
                  field.onChange(e.target.value)
                  setValue('liters', 0)
                  setValue('totalValue', 0)
                }}
              >
                <FormControlLabel
                  value="totalValue"
                  control={<Radio />}
                  label="Informar valor total (R$)"
                />
                <FormControlLabel
                  value="liters"
                  control={<Radio />}
                  label="Informar litros"
                />
              </RadioGroup>
            )}
          />
        </FormControl>
      )}

      {(selectedFuelTypeId > 0 || isEditing) && (
        <>
          {(inputMode === 'totalValue' || isEditing) && (
            <Controller
              name="totalValue"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Valor Total (R$)"
                  type="number"
                  fullWidth
                  inputProps={{ step: '0.01', min: '0' }}
                  error={!!errors.totalValue}
                  helperText={errors.totalValue?.message}
                  onChange={e => field.onChange(parseNumericInput(e.target.value))}
                  disabled={inputMode === 'liters' && !isEditing}
                />
              )}
            />
          )}

          {(inputMode === 'liters' || isEditing) && (
            <Controller
              name="liters"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Litros"
                  type="number"
                  fullWidth
                  inputProps={{ step: '0.01', min: '0' }}
                  error={!!errors.liters}
                  helperText={errors.liters?.message}
                  onChange={e => field.onChange(parseNumericInput(e.target.value))}
                  disabled={inputMode === 'totalValue' && !isEditing}
                />
              )}
            />
          )}

          {/* Show calculated summary */}
          {!isEditing && selectedFuelType && (liters > 0 || totalValue > 0) && (
            <Box
              sx={{
                p: 2,
                bgcolor: 'action.hover',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                Resumo do abastecimento:
              </Typography>
              <Typography variant="body2">
                Combustível: {selectedFuelType.name}
              </Typography>
              <Typography variant="body2">
                Preço por litro: {formatCurrency(selectedFuelType.pricePerLiter)}
              </Typography>
              <Typography variant="body2">
                Litros: {liters > 0 ? `${liters.toFixed(2)} L` : '-'}
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                Valor total: {totalValue > 0 ? formatCurrency(totalValue) : '-'}
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  )
}
