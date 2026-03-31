import client from './client'
import { Fueling, FuelingRequest, FuelingFilter, PaginatedResponse } from '@/types/api'

export const fuelingsApi = {
  getAll: async (filters?: FuelingFilter): Promise<PaginatedResponse<Fueling>> => {
    const params = {
      page: filters?.page || 0,
      limit: filters?.limit || 10,
      ...(filters?.pumpId && { pumpId: filters.pumpId }),
      ...(filters?.startDate && { startDate: filters.startDate }),
      ...(filters?.endDate && { endDate: filters.endDate }),
    }
    const { data } = await client.get<PaginatedResponse<Fueling>>('/fuelings', { params })
    return data
  },

  getById: async (id: number): Promise<Fueling> => {
    const { data } = await client.get<Fueling>(`/fuelings/${id}`)
    return data
  },

  create: async (payload: FuelingRequest): Promise<Fueling> => {
    const { data } = await client.post<Fueling>('/fuelings', payload)
    return data
  },

  update: async (id: number, payload: FuelingRequest): Promise<Fueling> => {
    const { data } = await client.put<Fueling>(`/fuelings/${id}`, payload)
    return data
  },

  delete: async (id: number): Promise<void> => {
    await client.delete(`/fuelings/${id}`)
  },
}
