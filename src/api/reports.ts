import client from './client'
import { ReportResponse } from '@/types/api'

export interface ReportFilter {
  pumpId?: number
  startDate?: string
  endDate?: string
}

export const reportsApi = {
  getFuelingsReport: async (filters?: ReportFilter): Promise<ReportResponse> => {
    const params = {
      ...(filters?.pumpId && { pumpId: filters.pumpId }),
      ...(filters?.startDate && { startDate: filters.startDate }),
      ...(filters?.endDate && { endDate: filters.endDate }),
    }
    const { data } = await client.get<ReportResponse>('/reports/fuelings', { params })
    return data
  },
}
