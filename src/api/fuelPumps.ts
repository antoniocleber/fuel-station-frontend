import client from './client'
import { FuelPump, FuelPumpRequest } from '@/types/api'

export const fuelPumpsApi = {
  getAll: async (): Promise<FuelPump[]> => {
    const { data } = await client.get<FuelPump[]>('/fuel-pumps')
    return data
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
