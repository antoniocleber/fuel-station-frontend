import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fuelTypesApi } from '@/api/fuelTypes'
import { FuelTypeRequest } from '@/types/api'
import { useNotification } from './useNotification'

const QUERY_KEY = ['fuelTypes']

export const useFuelTypes = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()

  const {
    data: fuelTypes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: fuelTypesApi.getAll,
  })

  const createMutation = useMutation({
    mutationFn: (payload: FuelTypeRequest) => fuelTypesApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      showNotification('Tipo de combustível criado com sucesso!', 'success')
    },
    onError: () => {
      showNotification('Erro ao criar tipo de combustível', 'error')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: FuelTypeRequest }) =>
      fuelTypesApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      showNotification('Tipo de combustível atualizado com sucesso!', 'success')
    },
    onError: () => {
      showNotification('Erro ao atualizar tipo de combustível', 'error')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => fuelTypesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      showNotification('Tipo de combustível removido com sucesso!', 'success')
    },
    onError: () => {
      showNotification('Erro ao remover tipo de combustível', 'error')
    },
  })

  return {
    fuelTypes,
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
