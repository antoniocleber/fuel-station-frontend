import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fuelingsApi } from '@/api/fuelings'
import { Fueling, FuelingRequest, FuelingFilter } from '@/types/api'
import { useNotification } from './useNotification'

const QUERY_KEY = ['fuelings']

export const useFuelings = (filters?: FuelingFilter) => {
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [...QUERY_KEY, filters],
    queryFn: () => fuelingsApi.getAll(filters),
  })

  const createMutation = useMutation({
    mutationFn: (payload: FuelingRequest) => fuelingsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      showNotification('Abastecimento registrado com sucesso!', 'success')
    },
    onError: () => {
      showNotification('Erro ao registrar abastecimento', 'error')
    },
  })

  const createAsync = async (payload: FuelingRequest): Promise<Fueling | undefined> => {
    try {
      const result = await createMutation.mutateAsync(payload)
      return result
    } catch {
      return undefined
    }
  }

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: FuelingRequest }) =>
      fuelingsApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      showNotification('Abastecimento atualizado com sucesso!', 'success')
    },
    onError: () => {
      showNotification('Erro ao atualizar abastecimento', 'error')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => fuelingsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      showNotification('Abastecimento removido com sucesso!', 'success')
    },
    onError: () => {
      showNotification('Erro ao remover abastecimento', 'error')
    },
  })

  return {
    fuelings: data?.content ?? [],
    totalElements: data?.totalElements ?? 0,
    totalPages: data?.totalPages ?? 0,
    isLoading,
    error,
    refetch,
    create: createMutation.mutate,
    createAsync,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
