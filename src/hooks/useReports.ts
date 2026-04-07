import { useQuery } from '@tanstack/react-query'
import { reportsApi, ReportFilter } from '@/api/reports'

const QUERY_KEY = ['reports', 'fuelings']

export const useReports = (filters?: ReportFilter) => {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [...QUERY_KEY, filters],
    queryFn: () => reportsApi.getFuelingsReport(filters),
  })

  return {
    report: data,
    isLoading,
    error,
    refetch,
  }
}
