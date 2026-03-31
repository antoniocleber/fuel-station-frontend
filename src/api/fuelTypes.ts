import client from './client'
import { FuelType, FuelTypeRequest } from '@/types/api'

export const fuelTypesApi = {
  getAll: async (): Promise<FuelType[]> => {
    const { data } = await client.get<FuelType[]>('/fuel-types')
    return data
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
