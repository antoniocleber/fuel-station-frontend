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

export interface FuelPump {
  id: number
  name: string
  fuelTypeIds?: number[]
  fuelTypes?: FuelType[]
  createdAt?: string
  updatedAt?: string
}

export interface FuelPumpRequest {
  name: string
  fuelTypeIds: number[]
}

export interface Fueling {
  id: number
  pumpId: number
  fuelingDate: string
  liters: number
  totalValue: number
  fuelType?: FuelType
  pump?: FuelPump
  createdAt?: string
}

export interface FuelingRequest {
  pumpId: number
  fuelingDate: string
  liters: number
  totalValue: number
}

export interface FuelingFilter {
  pumpId?: number
  startDate?: string
  endDate?: string
  page?: number
  limit?: number
}

export interface ApiError {
  statusCode: number
  message: string
  timestamp: string
}

export interface PaginatedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  currentPage: number
}
