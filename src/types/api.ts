export interface FuelType {
  id: number
  name: string
  pricePerLiter: number
  createdAt?: string
  updatedAt?: string
}

export interface FuelTypeRequest {
  name: string
  pricePerLiter: number
}

export interface FuelTypeSummary {
  id: number
  name: string
  pricePerLiter: number
}

export interface FuelPumpSummary {
  id: number
  name: string
  fuelTypes: FuelTypeSummary[]
}

export interface FuelPump {
  id: number
  name: string
  fuelTypeIds?: number[]
  fuelTypes?: FuelTypeSummary[]
  createdAt?: string
  updatedAt?: string
}

export interface FuelPumpRequest {
  name: string
  fuelTypeIds: number[]
}

export interface Fueling {
  id: number
  fuelingDate: string
  liters: number
  totalValue: number
  pump: FuelPumpSummary
  fuelType: FuelTypeSummary
  createdAt?: string
  updatedAt?: string
}

export interface FuelingRequest {
  pumpId: number
  fuelTypeId: number
  fuelingDate: string
  liters?: number
  totalValue?: number
}

export interface FuelingFilter {
  pumpId?: number
  startDate?: string
  endDate?: string
  page?: number
  size?: number
}

export interface ApiError {
  statusCode: number
  message: string
  timestamp: string
}

export interface PaginatedResponse<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
}

export interface ReportResponse {
  pumps: PumpReport[]
  totalLiters: number
  totalValue: number
  totalFuelings: number
}

export interface PumpReport {
  pumpId: number
  pumpName: string
  fuelTypes: FuelTypeSummary[]
  fuelings: ReportFuelingDetail[]
  totalLiters: number
  totalValue: number
  fuelingsCount: number
}

export interface ReportFuelingDetail {
  id: number
  fuelingDate: string
  liters: number
  totalValue: number
  fuelType: FuelTypeSummary
  createdAt?: string
}
