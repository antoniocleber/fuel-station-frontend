import client from './client'
import { FuelPump, FuelPumpRequest, PaginatedResponse } from '@/types/api'

export const fuelPumpsApi = {
  getAll: async (): Promise<FuelPump[]> => {
    const { data } = await client.get<PaginatedResponse<FuelPump>>('/fuel-pumps', {
      params: { size: 1000 },
    })
    return data.content
  },

  getById: async (id: number): Promise<FuelPump> => {
    const { data } = await client.get<FuelPump>(`/fuel-pumps/${id}`)
    return data
  },

  create: async (payload: FuelPumpRequest): Promise<FuelPump> => {
    const { data } = await client.post<FuelPump>('/fuel-pumps', payload)
    return data
  },

  update: async (id: number, payload: FuelPumpRequest): Promise<FuelPump> => {
    const { data } = await client.put<FuelPump>(`/fuel-pumps/${id}`, payload)
    return data
  },

  delete: async (id: number): Promise<void> => {
    await client.delete(`/fuel-pumps/${id}`)
  },
}
