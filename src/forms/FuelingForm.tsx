import { useEffect } from 'react'
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { useForm } from '@/hooks/useForm'
import { fuelingSchema } from '@/utils/validators'
import { FuelingFormValues } from '@/types/forms'
import { Fueling, FuelPump } from '@/types/api'

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
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FuelingFormValues>({
    schema: fuelingSchema,
    defaultValues: {
      pumpId: defaultValues?.pumpId ?? 0,
      fuelingDate: defaultValues?.fuelingDate?.substring(0, 10) ?? '',
      liters: defaultValues?.liters ?? 0,
      totalValue: defaultValues?.totalValue ?? 0,
    },
  })

  useEffect(() => {
    reset({
      pumpId: defaultValues?.pumpId ?? 0,
      fuelingDate: defaultValues?.fuelingDate?.substring(0, 10) ?? '',
      liters: defaultValues?.liters ?? 0,
      totalValue: defaultValues?.totalValue ?? 0,
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
            onChange={e => field.onChange(parseFloat(e.target.value))}
          />
        )}
      />
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
            onChange={e => field.onChange(parseFloat(e.target.value))}
          />
        )}
      />
    </Box>
  )
}
