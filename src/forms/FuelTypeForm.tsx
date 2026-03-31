import { useEffect } from 'react'
import { TextField, Box } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useForm } from '@/hooks/useForm'
import { fuelTypeSchema } from '@/utils/validators'
import { FuelTypeFormValues } from '@/types/forms'
import { FuelType } from '@/types/api'

interface FuelTypeFormProps {
  onSubmit: (data: FuelTypeFormValues) => void
  defaultValues?: Partial<FuelType>
  formId: string
}

export default function FuelTypeForm({ onSubmit, defaultValues, formId }: FuelTypeFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FuelTypeFormValues>({
    schema: fuelTypeSchema,
    defaultValues: {
      name: defaultValues?.name ?? '',
      pricePerLiter: defaultValues?.pricePerLiter ?? 0,
    },
  })

  useEffect(() => {
    reset({
      name: defaultValues?.name ?? '',
      pricePerLiter: defaultValues?.pricePerLiter ?? 0,
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
        name="pricePerLiter"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Preço por Litro (R$)"
            type="number"
            fullWidth
            inputProps={{ step: '0.01', min: '0' }}
            error={!!errors.pricePerLiter}
            helperText={errors.pricePerLiter?.message}
            onChange={e => field.onChange(parseFloat(e.target.value))}
          />
        )}
      />
    </Box>
  )
}
