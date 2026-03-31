import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fuelPumpsApi } from '@/api/fuelPumps'
import { FuelPumpRequest } from '@/types/api'
import { useNotification } from './useNotification'

const QUERY_KEY = ['fuelPumps']

export const useFuelPumps = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()

  const {
    data: fuelPumps = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: fuelPumpsApi.getAll,
  })

  const createMutation = useMutation({
    mutationFn: (payload: FuelPumpRequest) => fuelPumpsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      showNotification('Bomba criada com sucesso!', 'success')
    },
    onError: () => {
      showNotification('Erro ao criar bomba', 'error')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: FuelPumpRequest }) =>
      fuelPumpsApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      showNotification('Bomba atualizada com sucesso!', 'success')
    },
    onError: () => {
      showNotification('Erro ao atualizar bomba', 'error')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => fuelPumpsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      showNotification('Bomba removida com sucesso!', 'success')
    },
    onError: () => {
      showNotification('Erro ao remover bomba', 'error')
    },
  })

  return {
    fuelPumps,
    isLoading,
    error,
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
