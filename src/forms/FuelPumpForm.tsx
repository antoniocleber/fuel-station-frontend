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
import { fuelPumpSchema } from '@/utils/validators'
import { FuelPumpFormValues } from '@/types/forms'
import { FuelPump, FuelType } from '@/types/api'

interface FuelPumpFormProps {
  onSubmit: (data: FuelPumpFormValues) => void
  defaultValues?: Partial<FuelPump>
  fuelTypes: FuelType[]
  formId: string
}

export default function FuelPumpForm({
  onSubmit,
  defaultValues,
  fuelTypes,
  formId,
}: FuelPumpFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FuelPumpFormValues>({
    schema: fuelPumpSchema,
    defaultValues: {
      name: defaultValues?.name ?? '',
      fuelTypeIds: defaultValues?.fuelTypeIds ?? [],
    },
  })

  useEffect(() => {
    reset({
      name: defaultValues?.name ?? '',
      fuelTypeIds: defaultValues?.fuelTypeIds ?? [],
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
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nome"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />
      <Controller
        name="fuelTypeIds"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.fuelTypeIds}>
            <InputLabel>Tipos de Combustível</InputLabel>
            <Select
              {...field}
              multiple
              label="Tipos de Combustível"
              value={field.value ?? []}
            >
              {fuelTypes.map(ft => (
                <MenuItem key={ft.id} value={ft.id}>
                  {ft.name}
                </MenuItem>
              ))}
            </Select>
            {errors.fuelTypeIds && (
              <FormHelperText>{errors.fuelTypeIds.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Box>
  )
}
