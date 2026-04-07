import { z } from 'zod'

export const fuelTypeSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  pricePerLiter: z
    .number({ invalid_type_error: 'Preço deve ser um número' })
    .positive('Preço deve ser positivo')
    .max(999.99, 'Preço máximo é R$ 999,99'),
})

export const fuelPumpSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  fuelTypeIds: z.array(z.number()).min(1, 'Selecione pelo menos um tipo de combustível'),
})

export const fuelingSchema = z.object({
  pumpId: z.number({ invalid_type_error: 'Selecione uma bomba' }).positive('Bomba inválida'),
  fuelTypeId: z
    .number({ invalid_type_error: 'Selecione um tipo de combustível' })
    .positive('Tipo de combustível inválido'),
  fuelingDate: z.string().min(1, 'Data é obrigatória'),
  liters: z
    .number({ invalid_type_error: 'Litros deve ser um número' })
    .positive('Litros deve ser positivo'),
  totalValue: z
    .number({ invalid_type_error: 'Valor deve ser um número' })
    .positive('Valor deve ser positivo'),
  inputMode: z.enum(['totalValue', 'liters']).default('totalValue'),
})
