export interface FuelTypeFormValues {
  name: string
  pricePerLiter: number
}

export interface FuelPumpFormValues {
  name: string
  fuelTypeIds: number[]
}

export interface FuelingFormValues {
  pumpId: number
  fuelingDate: string
  liters: number
  totalValue: number
}
