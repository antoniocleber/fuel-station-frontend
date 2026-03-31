import { zodResolver } from '@hookform/resolvers/zod'
import { useForm as useRHF, UseFormProps, FieldValues, DefaultValues } from 'react-hook-form'
import { ZodSchema } from 'zod'

interface UseFormOptions<T extends FieldValues> extends Omit<UseFormProps<T>, 'resolver'> {
  schema: ZodSchema<T>
  defaultValues?: DefaultValues<T>
}

export function useForm<T extends FieldValues>({ schema, defaultValues, ...rest }: UseFormOptions<T>) {
  return useRHF<T>({
    resolver: zodResolver(schema),
    defaultValues,
    ...rest,
  })
}
