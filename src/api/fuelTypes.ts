import client from './client'
import { FuelType, FuelTypeRequest, PaginatedResponse } from '@/types/api'

export const fuelTypesApi = {
  getAll: async (): Promise<FuelType[]> => {
    const { data } = await client.get<PaginatedResponse<FuelType>>('/fuel-types', {
      params: { size: 1000 },
    })
    return data.content
  },

  getById: async (id: number): Promise<FuelType> => {
    const { data } = await client.get<FuelType>(`/fuel-types/${id}`)
    return data
  },

  create: async (payload: FuelTypeRequest): Promise<FuelType> => {
    const { data } = await client.post<FuelType>('/fuel-types', payload)
    return data
  },

  update: async (id: number, payload: FuelTypeRequest): Promise<FuelType> => {
    const { data } = await client.put<FuelType>(`/fuel-types/${id}`, payload)
    return data
  },

  delete: async (id: number): Promise<void> => {
    await client.delete(`/fuel-types/${id}`)
  },
}
